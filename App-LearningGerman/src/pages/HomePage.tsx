import React from 'react';
import { AppMode } from '../types';

interface HomePageProps {
  onSelectMode: (mode: AppMode) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectMode }) => {
  return (
    <div className="home-page">
      <div className="home-header">
        <div className="logo-mark">V</div>
        <h1 className="home-title">VocabLab</h1>
        <p className="home-subtitle">Master words. Build fluency.</p>
      </div>

      <div className="mode-grid">
        <button className="mode-card card-vocab" onClick={() => onSelectMode('vocab')}>
          <div className="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
              <path d="M7 8h2m4 0h4M7 12h4" />
            </svg>
          </div>
          <div className="card-label">
            <span className="card-number">01</span>
            <h2>Flashcards</h2>
            <p>Flip through words and meanings at your own pace</p>
          </div>
          <div className="card-arrow">→</div>
        </button>

        <button className="mode-card card-practice" onClick={() => onSelectMode('practice')}>
          <div className="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v2M12 16v2M6 12h2M16 12h2" />
            </svg>
          </div>
          <div className="card-label">
            <span className="card-number">02</span>
            <h2>Quiz</h2>
            <p>Test your knowledge with multiple choice questions</p>
          </div>
          <div className="card-arrow">→</div>
        </button>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-value">8</span>
          <span className="stat-label">Words</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">2</span>
          <span className="stat-label">Modes</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">∞</span>
          <span className="stat-label">Progress</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
