import React from 'react';
import { Language } from '../types';
import { getStories } from '../data/stories';

interface StoryMenuPageProps {
  language: Language;
  onBack: () => void;
  onSelectTheme: (themeId: string) => void;
}

const StoryMenuPage: React.FC<StoryMenuPageProps> = ({ language, onBack, onSelectTheme }) => {
  const stories = getStories(language);
  
  return (
    <div className="page scenario-page">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1 className="page-title">{language === 'de' ? 'Wähle ein Thema' : 'Choose a Theme'}</h1>
        <span className="page-badge convo-badge" style={{ backgroundColor: '#8b5cf6', color: '#fff' }}>Story Mode</span>
      </header>

      <div className="scenario-intro">
        <p>
          {language === 'de' 
            ? 'Gehe mit dem Flow! Wähle eine Geschichte und chatte unendlich mit der KI.' 
            : 'Go with the flow! Pick a theme and have an open-ended chat with AI.'}
        </p>
      </div>

      <div className="scenario-grid">
        {stories.map((story) => (
          <button
            key={story.id}
            className="scenario-card"
            style={{ borderColor: '#8b5cf6', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)' }}
            onClick={() => onSelectTheme(story.id)}
          >
            <span className="scenario-icon">{story.icon}</span>
            <div className="scenario-info">
              <h3 className="scenario-title">{story.title}</h3>
              <p className="scenario-subtitle" style={{ fontSize: '0.9rem', opacity: 0.8 }}>{story.context.slice(0, 60)}...</p>
            </div>
            <span className="card-arrow" style={{ color: '#8b5cf6' }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoryMenuPage;
