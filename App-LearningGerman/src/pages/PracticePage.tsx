import React, { useState, useMemo } from 'react';
import { vocabs } from '../data/vocabs';
import { QuizQuestion } from '../types';

interface PracticePageProps {
  onBack: () => void;
}

function buildQuestions(): QuizQuestion[] {
  const shuffled = [...vocabs].sort(() => Math.random() - 0.5);
  return shuffled.map(vocab => {
    const others = vocabs
      .filter(v => v.id !== vocab.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(v => v.translation);
    const correctIndex = Math.floor(Math.random() * 4);
    const options = [...others];
    options.splice(correctIndex, 0, vocab.translation);
    return { vocab, options, correctIndex };
  });
}

const PracticePage: React.FC<PracticePageProps> = ({ onBack }) => {
  const questions = useMemo(buildQuestions, []);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = questions[current];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === q.correctIndex;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, correct]);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setAnswers([]);
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="page practice-page">
        <header className="page-header">
          <button className="back-btn" onClick={onBack}>← Back</button>
          <h1 className="page-title">Results</h1>
          <span className="page-badge">Quiz</span>
        </header>
        <div className="results-card">
          <div className="results-score">{pct}%</div>
          <div className="results-label">
            {pct >= 80 ? '🎉 Excellent!' : pct >= 50 ? '👍 Good effort' : '📚 Keep practicing'}
          </div>
          <div className="results-detail">{score} / {questions.length} correct</div>
          <div className="answers-grid">
            {answers.map((a, i) => (
              <div key={i} className={`answer-dot ${a ? 'correct' : 'wrong'}`} title={questions[i].vocab.word} />
            ))}
          </div>
          <div className="results-actions">
            <button className="restart-btn" onClick={handleRestart}>Try Again</button>
            <button className="back-home-btn" onClick={onBack}>Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page practice-page">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1 className="page-title">Quiz</h1>
        <span className="page-badge quiz-badge">Quiz</span>
      </header>

      <div className="quiz-progress-track">
        <div className="quiz-progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="quiz-counter">{current + 1} / {questions.length}  ·  Score: {score}</div>

      <div className="quiz-card">
        <p className="quiz-prompt">What is the meaning of</p>
        <h2 className="quiz-word">{q.vocab.word}</h2>
        <span className="quiz-category">{q.vocab.category}</span>
      </div>

      <div className="options-grid">
        {q.options.map((opt, i) => {
          let cls = 'option-btn';
          if (selected !== null) {
            if (i === q.correctIndex) cls += ' correct';
            else if (i === selected) cls += ' wrong';
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)}>
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="feedback-bar">
          <span className={selected === q.correctIndex ? 'feedback-correct' : 'feedback-wrong'}>
            {selected === q.correctIndex ? '✓ Correct!' : `✗ The answer is: ${q.options[q.correctIndex]}`}
          </span>
          <button className="next-btn" onClick={handleNext}>
            {current + 1 >= questions.length ? 'Finish' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PracticePage;
