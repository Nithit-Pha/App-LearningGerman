import React from 'react';
import { Language } from '../types';
import { getVocabs } from '../data/vocabs';

interface PartsPageProps {
  language: Language;
  onBack: () => void;
  onSelectPart: (index: number) => void;
  activityName: string;
}

/** Map a vocab category string to a high-level topic label shown on Parts page. */
function topicForCategory(category: string): string {
  if (category === 'Nomen-Verb-Verbindung') return 'Nomen-Verb';
  return 'Vocab';
}

const PartsPage: React.FC<PartsPageProps> = ({ language, onBack, onSelectPart, activityName }) => {
  const CHUNK_SIZE = 15;
  const vocabs = getVocabs(language);
  const totalParts = Math.ceil(vocabs.length / CHUNK_SIZE);

  // Build per-part metadata: topic label + per-topic part number
  const topicCounters: Record<string, number> = {};
  const partsMeta = Array.from({ length: totalParts }, (_, pIndex) => {
    const start = pIndex * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, vocabs.length);
    const chunk = vocabs.slice(start, end);
    // Determine topic from the first item in the chunk
    const topic = chunk.length > 0 ? topicForCategory(chunk[0].category) : 'Vocab';
    topicCounters[topic] = (topicCounters[topic] ?? 0) + 1;
    return {
      pIndex,
      start: start + 1,
      end,
      topic,
      topicPartNumber: topicCounters[topic],
    };
  });

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
          {partsMeta.map(({ pIndex, start, end, topic, topicPartNumber }) => (
            <button
              key={pIndex}
              onClick={() => onSelectPart(pIndex)}
              className="mode-card"
              style={{ padding: '1.5rem', textAlign: 'left', minHeight: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{topic} Part {topicPartNumber}</h3>
              <span style={{ opacity: 0.7, fontSize: '0.9rem' }}>Words {start} - {end}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartsPage;
