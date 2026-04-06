import React from 'react';
import { ActivityType, Language } from '../types';

interface HomePageProps {
  language: Language;
  onSelectMode: (mode: ActivityType) => void;
  onChangeLanguage: () => void;
}

const flagLabel: Record<Language, string> = { de: '🇩🇪 Deutsch', en: '🇬🇧 English' };

const HomePage: React.FC<HomePageProps> = ({ language, onSelectMode, onChangeLanguage }) => {
  return (
    <div className="home-page">
      <div className="home-header">
        <div className="logo-mark">V</div>
        <h1 className="home-title">VocabLab</h1>
        <p className="home-subtitle">Master words. Build fluency.</p>
        <button className="lang-switch-btn" onClick={onChangeLanguage}>
          {flagLabel[language]} ↕
        </button>
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

        <button className="mode-card card-convo" onClick={() => onSelectMode('conversation')}>
          <div className="card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <path d="M8 10h8M8 14h5" />
            </svg>
          </div>
          <div className="card-label">
            <span className="card-number">03</span>
            <h2>Conversation</h2>
            <p>Chat with AI in real-life scenarios to achieve goals</p>
          </div>
          <div className="card-arrow">→</div>
        </button>

        <button className="mode-card card-story" onClick={() => onSelectMode('story')}>
          <div className="card-icon" style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
          </div>
          <div className="card-label">
            <span className="card-number">04</span>
            <h2 style={{ color: '#8b5cf6' }}>Story Mode</h2>
            <p>Go with the flow in open-ended themed discussions</p>
          </div>
          <div className="card-arrow" style={{ color: '#8b5cf6' }}>→</div>
        </button>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-value">30</span>
          <span className="stat-label">Words</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">4</span>
          <span className="stat-label">Modes</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">4</span>
          <span className="stat-label">Themes</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
