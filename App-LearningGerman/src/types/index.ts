export type AppMode = 'home' | 'vocab' | 'practice';

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
