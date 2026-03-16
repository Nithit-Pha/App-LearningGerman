import React from 'react';
import { Language } from '../types';

interface LanguagePageProps {
  onSelectLanguage: (lang: Language) => void;
}

const LanguagePage: React.FC<LanguagePageProps> = ({ onSelectLanguage }) => {
  return (
    <div className="language-page">
      <div className="language-hero">
        <div className="logo-mark">V</div>
        <h1 className="home-title">VocabLab</h1>
        <p className="home-subtitle">Choose the language you want to learn</p>
      </div>

      <div className="language-grid">
        <button
          className="language-card lang-de"
          onClick={() => onSelectLanguage('de')}
        >
          <span className="lang-flag">🇩🇪</span>
          <div className="lang-info">
            <h2 className="lang-name">Deutsch</h2>
            <p className="lang-sub">Learn German</p>
          </div>
          <div className="lang-arrow">→</div>
        </button>

        <button
          className="language-card lang-en"
          onClick={() => onSelectLanguage('en')}
        >
          <span className="lang-flag">🇬🇧</span>
          <div className="lang-info">
            <h2 className="lang-name">English</h2>
            <p className="lang-sub">Learn English (Thai translations)</p>
          </div>
          <div className="lang-arrow">→</div>
        </button>
      </div>

      <p className="language-footer">You can change this anytime from the home screen</p>
    </div>
  );
};

export default LanguagePage;
