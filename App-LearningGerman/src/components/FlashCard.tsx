import React, { useState } from 'react';
import { Vocab } from '../types';

interface FlashCardProps {
  vocab: Vocab;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

const FlashCard: React.FC<FlashCardProps> = ({ vocab, index, total, onNext, onPrev }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(f => !f);

  // Reset flip when vocab changes
  React.useEffect(() => {
    setFlipped(false);
  }, [vocab.id]);

  return (
    <div className="flashcard-wrapper">
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
      <div className="progress-label">{index + 1} / {total}</div>

      <div className={`card-flip-container ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="card-face card-front">
          <span className="card-category">{vocab.category}</span>
          <h2 className="card-word">{vocab.word}</h2>
          <p className="card-hint">Tap to reveal</p>
        </div>
        <div className="card-face card-back">
          <span className="card-category">{vocab.category}</span>
          <h2 className="card-translation">{vocab.translation}</h2>
          <p className="card-example">"{vocab.example}"</p>
        </div>
      </div>

      <div className="card-controls">
        <button className="ctrl-btn" onClick={onPrev} disabled={index === 0}>
          ←  Prev
        </button>
        <button className="flip-btn" onClick={handleFlip}>
          {flipped ? 'See Word' : 'See Answer'}
        </button>
        <button className="ctrl-btn" onClick={onNext} disabled={index === total - 1}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default FlashCard;
