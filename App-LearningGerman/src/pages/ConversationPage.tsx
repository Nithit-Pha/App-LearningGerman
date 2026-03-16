import React, { useState, useRef, useEffect } from 'react';
import { getScenarios } from '../data/scenarios';
import { sendChat, OllamaMessage } from '../services/ollamaService';
import { ChatMessage, Language } from '../types';

interface ConversationPageProps {
  language: Language;
  scenarioId: string;
  onBack: () => void;
}

const GOAL_TOKENS = ['[GOAL_1]', '[GOAL_2]', '[GOAL_3]'] as const;

const ConversationPage: React.FC<ConversationPageProps> = ({ language, scenarioId, onBack }) => {
  const scenario = getScenarios(language).find((s) => s.id === scenarioId)!;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [goalReached, setGoalReached] = useState(false);
  const [initialized, setInitialized] = useState(false);
  /** Tracks which sub-goals (by index) have been completed */
  const [completedGoals, setCompletedGoals] = useState<boolean[]>(() =>
    scenario.subGoals.map(() => false)
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  const buildHistory = (msgs: ChatMessage[]): OllamaMessage[] => [
    { role: 'system', content: scenario.systemPrompt },
    ...msgs.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
  ];

  /** Parse AI reply: strip GOAL tokens, update completed state, return clean text */
  const parseReply = (raw: string) => {
    let text = raw;
    const newCompleted = [...completedGoals];

    GOAL_TOKENS.forEach((token, i) => {
      if (text.includes(token)) {
        newCompleted[i] = true;
        text = text.replace(new RegExp(token.replace(/\[/g, '\\[').replace(/\]/g, '\\]'), 'g'), '');
      }
    });

    const reached = text.includes('[GOAL_REACHED]');
    text = text.replace('[GOAL_REACHED]', '').trim();

    return { clean: text, newCompleted, reached };
  };

  // Initial AI greeting
  useEffect(() => {
    if (initialized) return;
    setInitialized(true);
    setIsLoading(true);
    sendChat([{ role: 'system', content: scenario.systemPrompt }])
      .then((reply) => {
        const { clean, newCompleted } = parseReply(reply);
        setMessages([{ role: 'assistant', content: clean }]);
        setCompletedGoals(newCompleted);
      })
      .catch(() => setError('Could not connect to Ollama. Make sure it is running: ollama serve'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

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
      const { clean, newCompleted, reached } = parseReply(reply);
      setCompletedGoals(newCompleted);
      setMessages((prev) => [...prev, { role: 'assistant', content: clean }]);
      if (reached) setGoalReached(true);
    } catch {
      setError('Ollama is not responding. Make sure it is running: ollama serve');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setGoalReached(false);
    setError(null);
    setInitialized(false);
    setCompletedGoals(scenario.subGoals.map(() => false));
  };

  const allDone = completedGoals.every(Boolean);

  return (
    <div className="page convo-page">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="convo-header-center">
          <span className="convo-scene-icon">{scenario.icon}</span>
          <h1 className="page-title">{scenario.title}</h1>
        </div>
        <span className="page-badge convo-badge">Chat</span>
      </header>

      {/* Sub-goal checklist */}
      <div className="subgoal-panel">
        {scenario.subGoals.map((g, i) => {
          const done = completedGoals[i];
          const isSpecial = i === scenario.subGoals.length - 1;
          return (
            <div key={i} className={`subgoal-item${done ? ' done' : ''}${isSpecial ? ' special' : ''}`}>
              <span className="subgoal-check">{done ? '✓' : (i + 1)}</span>
              <span className="subgoal-text">{g}</span>
            </div>
          );
        })}
      </div>

      {/* Error banner */}
      {error && (
        <div className="convo-error-bar">
          <span>⚠️ {error}</span>
          <button className="retry-btn" onClick={() => { setError(null); setInitialized(false); }}>Retry</button>
        </div>
      )}

      {/* Messages */}
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble-row ${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="bubble-avatar">{scenario.icon}</div>
            )}
            <div className={`chat-bubble ${msg.role}`}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="bubble-avatar user-avatar">{language === 'de' ? 'Du' : 'You'}</div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="chat-bubble-row assistant">
            <div className="bubble-avatar">{scenario.icon}</div>
            <div className="chat-bubble assistant typing-indicator">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-row">
        <input
          className="chat-input"
          type="text"
          placeholder={language === 'de' ? 'Schreib auf Deutsch...' : 'Type in English...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading || goalReached}
        />
        <button
          className="send-btn"
          onClick={handleSend}
          disabled={isLoading || goalReached || !input.trim()}
        >
          {isLoading ? '...' : '→'}
        </button>
      </div>

      {/* Goal reached overlay */}
      {(goalReached || allDone) && (
        <div className="goal-overlay">
          <div className="goal-overlay-card">
            <div className="goal-celebration">🎉</div>
            <h2>{language === 'de' ? 'Ziel erreicht!' : 'Goal Reached!'}</h2>
            <div className="goal-overlay-checklist">
              {scenario.subGoals.map((g, i) => (
                <div key={i} className="goal-overlay-check-row">
                  <span className="goal-overlay-tick">✓</span>
                  <span>{g}</span>
                </div>
              ))}
            </div>
            <div className="goal-overlay-actions">
              <button className="restart-btn" onClick={handleRestart}>Try Again</button>
              <button className="back-home-btn" onClick={onBack}>Home</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationPage;
