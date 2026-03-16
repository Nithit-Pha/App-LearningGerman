export type Language = 'de' | 'en';
export type AppMode = 'home' | 'language' | 'parts' | 'vocab' | 'practice' | 'scenario' | 'conversation';
export type ActivityType = 'vocab' | 'practice' | 'conversation';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}


export interface Vocab {
  id: number;
  word: string;
  translation: string;
  example: string;
  category: string;
}

export interface QuizQuestion {
  vocab: Vocab;
  options: string[];
  correctIndex: number;
}
