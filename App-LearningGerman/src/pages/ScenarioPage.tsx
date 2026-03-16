import React from 'react';
import { Language } from '../types';
import { getScenarios } from '../data/scenarios';

interface ScenarioPageProps {
  language: Language;
  onBack: () => void;
  onSelectScenario: (scenarioId: string) => void;
}

const langLabel: Record<Language, string> = { de: 'German', en: 'English' };

const ScenarioPage: React.FC<ScenarioPageProps> = ({ language, onBack, onSelectScenario }) => {
  const scenarios = getScenarios(language);
  return (
    <div className="page scenario-page">
      <header className="page-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1 className="page-title">Choose a Scenario</h1>
        <span className="page-badge convo-badge">Conversation</span>
      </header>

      <div className="scenario-intro">
        <p>Pick a real-life situation and practice {langLabel[language]} by achieving the goal!</p>
      </div>

      <div className="scenario-grid">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            className="scenario-card"
            onClick={() => onSelectScenario(scenario.id)}
          >
            <span className="scenario-icon">{scenario.icon}</span>
            <div className="scenario-info">
              <h3 className="scenario-title">{scenario.title}</h3>
              <p className="scenario-subtitle">{scenario.subtitle}</p>
              <div className="scenario-goal-tag">🎯 {scenario.goal}</div>
            </div>
            <span className="card-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScenarioPage;
