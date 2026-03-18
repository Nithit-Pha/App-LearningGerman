# VocabLab

A language learning app with three modes: Flashcards, Quiz, and AI Conversation.

Built with **React 18 + TypeScript + Vite**.

---

## Quick Start (Windows — Recommended)

If you just want to run the app without touching a terminal:

1. Install prerequisites (first time only):
   - [Node.js](https://nodejs.org) (LTS version)
   - [Ollama](https://ollama.com) (for AI Conversation mode)
   - Run once in a terminal: `npm install` and `ollama pull llama3.2`
2. **Double-click `Start App.bat`** — it starts Ollama and the app automatically.
3. The app opens in your browser at [http://localhost:5173](http://localhost:5173).

> Keep the launcher window open while using the app. Close it to stop everything.

---

## Getting Started (Manual)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Features

### 🌐 Language Selection
Choose your target language on startup:
- 🇩🇪 **German** — German words with English translations
- 🇬🇧 **English** — English words with Thai translations (ภาษาไทย)

Switch languages anytime from the Home screen.

---

### 01 · Flashcards
Flip cards to learn words and meanings at your own pace.
- Vocabulary is split into **parts of 15 words** — choose a part to avoid overwhelm.
- Progress bar and navigation arrows included.

---

### 02 · Quiz
Multiple-choice questions to test retention.
- Same part-based system as Flashcards.
- Instant feedback with correct/wrong indicators.
- Results screen shows score and per-question dots.

---

### 03 · Conversation (AI-powered)
Practice real-life conversations with a local **Llama 3.2** AI via **Ollama**.

#### Scenarios (6 included)
| Icon | German | English |
|------|--------|---------|
| 🏨 | Hotel buchen | Book a Hotel |
| 🍽️ | Im Restaurant | At a Restaurant |
| 🏥 | Beim Arzt | At the Doctor |
| 🛒 | Im Supermarkt | At the Supermarket |
| 🚆 | Bahnticket kaufen | Buy a Train Ticket |
| 🏠 | Wohnung mieten | Rent an Apartment |

#### Sub-Goal Checklist
Each scenario has **3 sub-goals** to complete:
1. A core task (e.g. state your dates)
2. A second core task (e.g. number of guests)
3. 🎁 **Special bonus task** (e.g. ask for a birthday surprise)

Each sub-goal checks off with a ✓ tick in real time as the AI detects you've achieved it. When all three are done, a 🎉 success overlay appears.

#### Ollama Setup (required for Conversation mode)
1. [Download & install Ollama](https://ollama.com)
2. Pull the model:
   ```bash
   ollama pull llama3.2
   ```
3. Verify at [http://localhost:11434](http://localhost:11434) — you should see `Ollama is running`.

> **Using `Start App.bat`?** It starts Ollama automatically — no extra terminal needed.

---

## Project Structure

```
vocablab/
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── App.tsx               # Root component & routing (starts on LanguagePage)
    ├── styles.css            # Global styles & design tokens
    ├── types/
    │   └── index.ts          # Language, AppMode, Vocab, ChatMessage, etc.
    ├── data/
    │   ├── vocabs.ts         # German & English vocab lists + getVocabs(lang)
    │   └── scenarios.ts      # German & English scenarios + getScenarios(lang)
    ├── services/
    │   └── ollamaService.ts  # Ollama API client (POST /api/chat)
    ├── components/
    │   └── FlashCard.tsx     # Reusable flip-card component
    └── pages/
        ├── LanguagePage.tsx     # Language picker (first screen)
        ├── HomePage.tsx         # Mode selector with language switch button
        ├── PartsPage.tsx        # 15-word chunk selector
        ├── VocabPage.tsx        # Flashcard mode
        ├── PracticePage.tsx     # Quiz mode
        ├── ScenarioPage.tsx     # Conversation scenario picker
        └── ConversationPage.tsx # AI chat with sub-goal checklist
```

---

## Adding Vocabulary

Edit `src/data/vocabs.ts` and append to `germanVocabs` or `englishVocabs`:

```ts
{ id: 31, word: 'Resilient', translation: 'Widerstandsfähig', example: '...', category: 'Adjective' },
```

## Adding Scenarios

Edit `src/data/scenarios.ts` and append to `germanScenarios` or `englishScenarios`:

```ts
{
  id: 'bank',
  title: 'Bei der Bank',
  subtitle: 'Open a bank account',
  icon: '🏦',
  goal: 'Open an account',
  subGoals: ['Ask about account types', 'Provide your ID', '🎁 Special: Ask about the interest rate'],
  systemPrompt: `You are a German bank clerk. Speak ONLY in German. ...`,
}
```

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`.
