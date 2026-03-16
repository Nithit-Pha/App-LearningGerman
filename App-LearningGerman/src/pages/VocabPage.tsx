import React, { useState } from 'react';
import { AppMode } from '../types';
import { vocabs } from '../data/vocabs';
import FlashCard from '../components/FlashCard';

interface VocabPageProps {
  onBack: () => void;
}

const VocabPage: React.FC<VocabPageProps> = ({ onBack }) => {
  const [index, setIndex] = useState(0);

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
