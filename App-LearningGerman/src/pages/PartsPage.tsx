import React from 'react';
import { Language } from '../types';
import { getVocabs } from '../data/vocabs';

interface PartsPageProps {
  language: Language;
  onBack: () => void;
  onSelectPart: (index: number) => void;
  activityName: string;
}

const PartsPage: React.FC<PartsPageProps> = ({ language, onBack, onSelectPart, activityName }) => {
  const CHUNK_SIZE = 15;
  const vocabs = getVocabs(language);
  const totalParts = Math.ceil(vocabs.length / CHUNK_SIZE);
  const parts = Array.from({ length: totalParts }, (_, i) => i);

  return (
    <div className="page parts-page">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1 className="page-title">Select Part</h1>
        <span className="page-badge">{activityName}</span>
      </header>

      <div className="parts-container" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '1rem' }}>
          Choose a section of 15 words to practice.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {parts.map((pIndex) => {
            const start = pIndex * CHUNK_SIZE + 1;
            const end = Math.min((pIndex + 1) * CHUNK_SIZE, vocabs.length);
            return (
              <button
                key={pIndex}
                onClick={() => onSelectPart(pIndex)}
                className="mode-card"
                style={{ padding: '1.5rem', textAlign: 'left', minHeight: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Part {pIndex + 1}</h3>
                <span style={{ opacity: 0.7, fontSize: '0.9rem' }}>Words {start} - {end}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PartsPage;
