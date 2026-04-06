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
      .catch(() => setError('Could not connect to Ollama. Make sure it is running: ollama serve'))
      .finally(() => setIsLoading(false));
  }, [initialized, story.systemPrompt]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, situationOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const reply = await sendChat(buildHistory(newMessages));
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setError('Ollama is not responding. Make sure it is running: ollama serve');
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

      {/* Messages */}
      <div className="chat-window" style={{ flexGrow: 1, overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble-row ${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="bubble-avatar" style={{ backgroundColor: '#8b5cf6' }}>{story.icon}</div>
            )}
            <div className={`chat-bubble ${msg.role}`} style={msg.role === 'assistant' ? { borderLeftColor: '#8b5cf6' } : {}}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="bubble-avatar user-avatar">{language === 'de' ? 'Du' : 'You'}</div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="chat-bubble-row assistant">
            <div className="bubble-avatar" style={{ backgroundColor: '#8b5cf6' }}>{story.icon}</div>
            <div className="chat-bubble assistant typing-indicator">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-row" style={{ marginTop: 'auto' }}>
        <input
          className="chat-input"
          type="text"
          placeholder={language === 'de' ? 'Schreib auf Deutsch...' : 'Type in English...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          style={{ backgroundColor: '#8b5cf6' }}
        >
          {isLoading ? '...' : '→'}
        </button>
      </div>
    </div>
  );
};

export default StoryPage;
