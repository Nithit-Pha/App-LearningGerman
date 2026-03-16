import React, { useState } from 'react';
import { AppMode } from './types';
import HomePage from './pages/HomePage';
import VocabPage from './pages/VocabPage';
import PracticePage from './pages/PracticePage';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('home');

  return (
    <div className="app">
      {mode === 'home' && <HomePage onSelectMode={setMode} />}
      {mode === 'vocab' && <VocabPage onBack={() => setMode('home')} />}
      {mode === 'practice' && <PracticePage onBack={() => setMode('home')} />}
    </div>
  );
};

export default App;
