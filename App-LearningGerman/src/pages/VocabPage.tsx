import React, { useState, useEffect } from 'react';
import { Vocab } from '../types';
import FlashCard from '../components/FlashCard';

interface VocabPageProps {
  vocabs: Vocab[];
  onBack: () => void;
}

const VocabPage: React.FC<VocabPageProps> = ({ vocabs, onBack }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [vocabs]);

  if (!vocabs || vocabs.length === 0) return null;

  return (
    <div className="page vocab-page">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1 className="page-title">Flashcards</h1>
        <span className="page-badge">Vocab</span>
      </header>

      <FlashCard
        vocab={vocabs[index]}
        index={index}
        total={vocabs.length}
        onNext={() => setIndex(i => Math.min(i + 1, vocabs.length - 1))}
        onPrev={() => setIndex(i => Math.max(i - 1, 0))}
      />
    </div>
  );
};

export default VocabPage;
