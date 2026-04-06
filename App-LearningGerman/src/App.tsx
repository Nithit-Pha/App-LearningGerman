import React, { useState, useMemo } from 'react';
import { AppMode, ActivityType, Language } from './types';
import { getVocabs } from './data/vocabs';
import LanguagePage from './pages/LanguagePage';
import HomePage from './pages/HomePage';
import VocabPage from './pages/VocabPage';
import PracticePage from './pages/PracticePage';
import PartsPage from './pages/PartsPage';
import ScenarioPage from './pages/ScenarioPage';
import ConversationPage from './pages/ConversationPage';
import StoryMenuPage from './pages/StoryMenuPage';
import StoryPage from './pages/StoryPage';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('language');
  const [language, setLanguage] = useState<Language>('de');
  const [activity, setActivity] = useState<ActivityType | null>(null);
  const [partIndex, setPartIndex] = useState<number>(0);
  const [scenarioId, setScenarioId] = useState<string>('');

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setPartIndex(0);
    setMode('home');
  };

  const handleSelectActivity = (act: ActivityType) => {
    setActivity(act);
    if (act === 'conversation') {
      setMode('scenario');
    } else if (act === 'story') {
      setMode('story-menu');
    } else {
      setMode('parts');
    }
  };

  const allVocabs = useMemo(() => getVocabs(language), [language]);

  const currentVocabs = useMemo(() => {
    const start = partIndex * 15;
    return allVocabs.slice(start, start + 15);
  }, [partIndex, allVocabs]);

  return (
    <div className="app">
      {mode === 'language' && (
        <LanguagePage onSelectLanguage={handleSelectLanguage} />
      )}

      {mode === 'home' && (
        <HomePage
          language={language}
          onSelectMode={handleSelectActivity}
          onChangeLanguage={() => setMode('language')}
        />
      )}

      {mode === 'parts' && activity && (
        <PartsPage
          language={language}
          activityName={activity === 'vocab' ? 'Flashcards' : 'Quiz'}
          onBack={() => setMode('home')}
          onSelectPart={(index) => {
            setPartIndex(index);
            setMode(activity);
          }}
        />
      )}

      {mode === 'scenario' && (
        <ScenarioPage
          language={language}
          onBack={() => setMode('home')}
          onSelectScenario={(id) => {
            setScenarioId(id);
            setMode('conversation');
          }}
        />
      )}

      {mode === 'vocab' && (
        <VocabPage vocabs={currentVocabs} onBack={() => setMode('home')} />
      )}
      {mode === 'practice' && (
        <PracticePage language={language} vocabs={currentVocabs} onBack={() => setMode('home')} />
      )}
      {mode === 'conversation' && scenarioId && (
        <ConversationPage language={language} scenarioId={scenarioId} onBack={() => setMode('scenario')} />
      )}
      {mode === 'story-menu' && (
        <StoryMenuPage
          language={language}
          onBack={() => setMode('home')}
          onSelectTheme={(id) => {
            setScenarioId(id);
            setMode('story-chat');
          }}
        />
      )}
      {mode === 'story-chat' && scenarioId && (
        <StoryPage language={language} themeId={scenarioId} onBack={() => setMode('home')} />  
      )}
    </div>
  );
};

export default App;
