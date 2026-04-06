import React, { useState, useRef, useEffect } from 'react';
import { getStories } from '../data/stories';
import { sendChat, OllamaMessage } from '../services/ollamaService';
import { ChatMessage, Language } from '../types';

interface StoryPageProps {
  language: Language;
  themeId: string;
  onBack: () => void;
}

const StoryPage: React.FC<StoryPageProps> = ({ language, themeId, onBack }) => {
  const story = getStories(language).find((s) => s.id === themeId)!;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [actionType, setActionType] = useState<'say' | 'do' | 'story'>('say');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [situationOpen, setSituationOpen] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);

  const buildHistory = (msgs: ChatMessage[]): OllamaMessage[] => [
    { role: 'system', content: story.systemPrompt },
    ...msgs.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
  ];

  // Initial AI greeting
  useEffect(() => {
    if (initialized) return;
    setInitialized(true);
    setIsLoading(true);
    sendChat([{ role: 'system', content: story.systemPrompt }])
      .then((reply) => {
        setMessages([{ role: 'assistant', content: reply }]);
      })
      .catch((err) => {
        console.error(err);
        setError(err instanceof Error && err.message.includes('not found') ? err.message : 'Could not connect to Ollama. Make sure your Docker container is running and OLLAMA_ORIGINS is set.');
      })
      .finally(() => setIsLoading(false));
  }, [initialized, story.systemPrompt]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, situationOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    let formattedText = text;
    if (language === 'de') {
      if (actionType === 'say') formattedText = `Du sagst: "${text}"`;
      if (actionType === 'do') formattedText = `Du ${text}`;
    } else {
      if (actionType === 'say') formattedText = `You say: "${text}"`;
      if (actionType === 'do') formattedText = `You ${text}`;
    }

    const userMsg: ChatMessage = { role: 'user', content: formattedText };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const reply = await sendChat(buildHistory(newMessages));
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error && err.message.includes('not found') ? err.message : 'Ollama is not responding. Make sure your Docker container is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page convo-page" style={{ position: 'relative' }}>
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="convo-header-center">
          <span className="convo-scene-icon">{story.icon}</span>
          <h1 className="page-title">{story.title}</h1>
        </div>
        <button 
          className="exit-story-btn" 
          onClick={onBack}
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.4)',
          }}
        >
          {language === 'de' ? 'Exit' : 'Exit'}
        </button>
      </header>

      {/* Situation description panel */}
      <div className={`situation-panel${situationOpen ? ' open' : ''}`} style={{ borderColor: '#8b5cf6', background: 'rgba(139, 92, 246, 0.05)' }}>
        <button
          className="situation-toggle"
          onClick={() => setSituationOpen((v) => !v)}
          aria-expanded={situationOpen}
        >
          <span className="situation-toggle-icon">📜</span>
          <span className="situation-toggle-label" style={{ color: '#8b5cf6' }}>
            {language === 'de' ? 'Kontext' : 'Context'}
          </span>
          <span className="situation-toggle-arrow" style={{ color: '#8b5cf6' }}>{situationOpen ? '▲' : '▼'}</span>
        </button>
        {situationOpen && (
          <div className="situation-body">
            <p className="situation-text">{story.context}</p>
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="convo-error-bar">
          <span>⚠️ {error}</span>
          <button className="retry-btn" onClick={() => { setError(null); setInitialized(false); }}>Retry</button>
        </div>
      )}

      {/* Novel Messages */}
      <div className="novel-window" style={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        padding: '2rem 10%', 
        margin: '0',
        fontFamily: 'Georgia, "Times New Roman", serif',
        lineHeight: '1.8',
        fontSize: '1.15rem',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '1.2rem' }}>
            {msg.role === 'user' ? (
              <p style={{ 
                fontStyle: 'italic', 
                color: '#5b21b6', 
                margin: '1rem 0',
                paddingLeft: '1.5rem',
                borderLeft: '3px solid #8b5cf6',
                opacity: 0.9
              }}>
                {msg.content}
              </p>
            ) : (
              <p style={{ margin: 0, textIndent: '2rem' }}>
                {msg.content}
              </p>
            )}
          </div>
        ))}

        {isLoading && (
          <div style={{ fontStyle: 'italic', color: '#a0aec0', marginBottom: '1.2rem', textIndent: '2rem' }}>
            ...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-row" style={{ marginTop: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <select
          value={actionType}
          onChange={(e) => setActionType(e.target.value as any)}
          disabled={isLoading}
          style={{
            padding: '12px 14px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            backgroundColor: '#ffffff',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            color: '#4b5563',
            outline: 'none'
          }}
        >
          <option value="say">🗣️ {language === 'de' ? 'Sagen' : 'Say'}</option>
          <option value="do">🏃 {language === 'de' ? 'Tun' : 'Do'}</option>
          <option value="story">📖 {language === 'de' ? 'Story' : 'Story'}</option>
        </select>
        <input
          className="chat-input"
          type="text"
          style={{ flexGrow: 1 }}
          placeholder={actionType === 'say' ? (language === 'de' ? '"Guten Tag!"' : '"Hello there!"') : actionType === 'do' ? (language === 'de' ? 'gehst zur Tür...' : 'walk to the door...') : (language === 'de' ? 'Plötzlich passierte...' : 'Suddenly, a loud noise...')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          style={{ backgroundColor: '#8b5cf6', flexShrink: 0 }}
        >
          {isLoading ? '...' : '→'}
        </button>
      </div>
    </div>
  );
};

export default StoryPage;
