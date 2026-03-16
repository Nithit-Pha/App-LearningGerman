# VocabLab

A clean vocabulary learning app with two modes:
- **Flashcards** — flip cards to learn words and meanings
- **Quiz** — multiple choice questions to test retention

Built with React 18 + TypeScript + Vite.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
vocablab/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx          # App entry point
    ├── App.tsx           # Root component & routing
    ├── styles.css        # Global styles & design tokens
    ├── types/
    │   └── index.ts      # AppMode, Vocab, QuizQuestion types
    ├── data/
    │   └── vocabs.ts     # Vocab word list — edit this to add words
    ├── components/
    │   └── FlashCard.tsx # Reusable flip-card component
    └── pages/
        ├── HomePage.tsx     # Mode selector screen
        ├── VocabPage.tsx    # Flashcard mode
        └── PracticePage.tsx # Quiz mode
```

## Adding Vocabulary

Edit `src/data/vocabs.ts` and append to the `vocabs` array:

```ts
{ id: 9, word: 'Resilient', translation: 'Able to recover quickly', example: 'She was resilient in the face of adversity.', category: 'Adjective' },
```

## Build for Production

```bash
npm run build
```

Output goes to `dist/`.
