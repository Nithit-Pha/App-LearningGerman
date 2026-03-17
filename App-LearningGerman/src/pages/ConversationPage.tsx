import React, { useState, useRef, useEffect } from 'react';
import { getScenarios, ScenarioVocab } from '../data/scenarios';
import { sendChat, OllamaMessage } from '../services/ollamaService';
import { ChatMessage, Language } from '../types';

interface ConversationPageProps {
  language: Language;
  scenarioId: string;
  onBack: () => void;
}

const GOAL_TOKENS = ['[GOAL_1]', '[GOAL_2]', '[GOAL_3]'] as const;

interface Review {
  grammar: number;
  naturalness: number;
  grammarNote: string;
  naturalnessNote: string;
}


/** Ask Llama to review the full conversation and return structured scores */
async function requestReview(
  msgs: ChatMessage[],
  language: Language,
  vocabWord: string
): Promise<Review> {
  const transcript = msgs
    .filter((m) => m.role === 'user')
    .map((m) => m.content)
    .join('\n');

  const lang = language === 'de' ? 'German' : 'English';
  const systemPrompt = `You are a strict but encouraging ${lang} language teacher.
Evaluate only the STUDENT messages below. Give two integer scores from 1–10.
Return EXACTLY this JSON and nothing else:
{"grammar":N,"naturalness":N,"grammarNote":"short note","naturalnessNote":"short note"}
The vocabWord "${vocabWord}" was the special bonus word the student was asked to use.`;

  const messages: OllamaMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Student messages:\n${transcript}` },
  ];

  const raw = await sendChat(messages);

  // Try to extract JSON from the raw response
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON');
  const parsed = JSON.parse(match[0]);
  return {
    grammar: Math.min(10, Math.max(1, Number(parsed.grammar))),
    naturalness: Math.min(10, Math.max(1, Number(parsed.naturalness))),
    grammarNote: parsed.grammarNote ?? '',
    naturalnessNote: parsed.naturalnessNote ?? '',
  };
}

/** Render a score bar */
const ScoreBar: React.FC<{ score: number; color: string }> = ({ score, color }) => (
  <div className="review-bar-track">
    <div
      className="review-bar-fill"
      style={{ width: `${score * 10}%`, background: color }}
    />
    <span className="review-bar-label">{score}/10</span>
  </div>
);

const ConversationPage: React.FC<ConversationPageProps> = ({ language, scenarioId, onBack }) => {
  const scenario = getScenarios(language).find((s) => s.id === scenarioId)!;

  // Pick one random word from the scenario's vocab pool for this session
  const [vocabTask] = useState<ScenarioVocab>(() => {
    const pool = getScenarios(language).find((s) => s.id === scenarioId)!.vocabPool;
    return pool[Math.floor(Math.random() * pool.length)];
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [goalReached, setGoalReached] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [completedGoals, setCompletedGoals] = useState<boolean[]>(() =>
    scenario.subGoals.map(() => false)
  );

  // Vocab task tracking - did the user ever type the word?
  const [vocabUsed, setVocabUsed] = useState(false);

  // Situation panel collapsed state (starts expanded)
  const [situationOpen, setSituationOpen] = useState(true);

  // Review state
  const [review, setReview] = useState<Review | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const buildHistory = (msgs: ChatMessage[]): OllamaMessage[] => [
    { role: 'system', content: scenario.systemPrompt },
    ...msgs.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
  ];

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

  // Trigger review when goal is reached
  useEffect(() => {
    if (!goalReached || messages.length === 0) return;
    setIsReviewing(true);
    requestReview(messages, language, vocabTask.word)
      .then(setReview)
      .catch(() => setReview(null))
      .finally(() => setIsReviewing(false));
  }, [goalReached]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // Check if vocab word is used (case-insensitive)
    if (text.toLowerCase().includes(vocabTask.word.toLowerCase())) {
      setVocabUsed(true);
    }

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
    setVocabUsed(false);
    setReview(null);
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

      {/* Situation description panel */}
      <div className={`situation-panel${situationOpen ? ' open' : ''}`}>
        <button
          className="situation-toggle"
          onClick={() => setSituationOpen((v) => !v)}
          aria-expanded={situationOpen}
        >
          <span className="situation-toggle-icon">🎬</span>
          <span className="situation-toggle-label">
            {language === 'de' ? 'Situation' : 'Situation'}
          </span>
          <span className="situation-toggle-arrow">{situationOpen ? '▲' : '▼'}</span>
        </button>
        {situationOpen && (
          <div className="situation-body">
            <p className="situation-text">{scenario.situation}</p>
          </div>
        )}
      </div>
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

      {/* Vocab task banner */}
      <div className={`vocab-task-banner${vocabUsed ? ' vocab-used' : ''}`}>
        <div className="vocab-task-left">
          <span className="vocab-task-icon">📚</span>
          <div className="vocab-task-info">
            <span className="vocab-task-label">Word Challenge</span>
            <span className="vocab-task-word">
              {vocabTask.word}
            </span>
            <span className="vocab-task-translation">{vocabTask.translation}</span>
          </div>
        </div>
        <div className="vocab-task-right">
          <span className="vocab-situational-badge">📍 Situational</span>
          {vocabUsed
            ? <span className="vocab-used-tick">✓ Used!</span>
            : <span className="vocab-hint">Use it in conversation</span>
          }
        </div>
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
              {/* Vocab task result */}
              <div className={`goal-overlay-check-row vocab-check-row${vocabUsed ? ' done' : ' missed'}`}>
                <span className="goal-overlay-tick">{vocabUsed ? '✓' : '✗'}</span>
                <span>
                  Word: <strong>{vocabTask.word}</strong>{' '}
                  {vocabUsed ? '— used! 🌟' : '— not used this time'}
                </span>
              </div>

            </div>

            {/* AI Review section */}
            <div className="review-section">
              <h3 className="review-title">🤖 AI Review</h3>

              {isReviewing && (
                <div className="review-loading">
                  <span className="review-spinner" />
                  <span>Analysing your conversation…</span>
                </div>
              )}

              {!isReviewing && review && (
                <div className="review-cards">
                  {/* Grammar */}
                  <div className="review-card">
                    <div className="review-card-header">
                      <span className="review-card-icon">📝</span>
                      <span className="review-card-name">Grammar</span>
                      <span className="review-card-score" style={{ color: '#34d399' }}>
                        {review.grammar}/10
                      </span>
                    </div>
                    <ScoreBar score={review.grammar} color="#34d399" />
                    {review.grammarNote && (
                      <p className="review-note">{review.grammarNote}</p>
                    )}
                  </div>

                  {/* Naturalness */}
                  <div className="review-card">
                    <div className="review-card-header">
                      <span className="review-card-icon">💬</span>
                      <span className="review-card-name">How Naturally</span>
                      <span className="review-card-score" style={{ color: '#f59e0b' }}>
                        {review.naturalness}/10
                      </span>
                    </div>
                    <ScoreBar score={review.naturalness} color="#f59e0b" />
                    {review.naturalnessNote && (
                      <p className="review-note">{review.naturalnessNote}</p>
                    )}
                  </div>
                </div>
              )}

              {!isReviewing && !review && goalReached && (
                <p className="review-error">Could not load review. Make sure Ollama is running.</p>
              )}
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
