import { Vocab } from '../types';
import { Language } from '../types';

export const germanVocabs: Vocab[] = [
  { id: 1, word: 'Gelegenheit', translation: 'Opportunity', example: 'Das ist eine gute Gelegenheit, Deutsch zu üben.', category: 'Noun' },
  { id: 2, word: 'Entscheidung', translation: 'Decision', example: 'Es war eine schwere Entscheidung für mich.', category: 'Noun' },
  { id: 3, word: 'Erfahrung', translation: 'Experience', example: 'Ich habe viel Erfahrung in diesem Bereich gesammelt.', category: 'Noun' },
  { id: 4, word: 'Herausforderung', translation: 'Challenge', example: 'Die neue Aufgabe ist eine große Herausforderung.', category: 'Noun' },
  { id: 5, word: 'Zufall', translation: 'Coincidence', example: 'Was für ein Zufall, dich hier zu treffen!', category: 'Noun' },
  { id: 6, word: 'Alltäglich', translation: 'Everyday / Common', example: 'Stress ist leider ein alltägliches Problem geworden.', category: 'Adjective' },
  { id: 7, word: 'Voraussetzung', translation: 'Prerequisite', example: 'Gute Sprachkenntnisse sind eine Voraussetzung für diesen Job.', category: 'Noun' },
  { id: 8, word: 'Zuverlässig', translation: 'Reliable', example: 'Er ist ein sehr zuverlässiger Kollege.', category: 'Adjective' },
  { id: 9, word: 'Unterstützung', translation: 'Support', example: 'Ich danke dir für deine großartige Unterstützung.', category: 'Noun' },
  { id: 10, word: 'Selbstbewusst', translation: 'Confident', example: 'Sie trat bei dem Interview sehr selbstbewusst auf.', category: 'Adjective' },
  { id: 11, word: 'Beziehung', translation: 'Relationship', example: 'Sie haben eine sehr enge Beziehung zueinander.', category: 'Noun' },
  { id: 12, word: 'Abhängig', translation: 'Dependent', example: 'Meine gute Laune ist oft vom Wetter abhängig.', category: 'Adjective' },
  { id: 13, word: 'Notwendig', translation: 'Necessary', example: 'Es ist notwendig, diese Regeln genau zu befolgen.', category: 'Adjective' },
  { id: 14, word: 'Ursache', translation: 'Cause', example: 'Die Ursache des Problems ist uns noch unbekannt.', category: 'Noun' },
  { id: 15, word: 'Erfolgreich', translation: 'Successful', example: 'Das letzte Projekt der Firma war sehr erfolgreich.', category: 'Adjective' },
  { id: 16, word: 'Verantwortung', translation: 'Responsibility', example: 'Wer trägt die Verantwortung für diesen großen Fehler?', category: 'Noun' },
  { id: 17, word: 'Zweck', translation: 'Purpose', example: 'Welchen Zweck genau erfüllt dieses neue Gerät?', category: 'Noun' },
  { id: 18, word: 'Überrascht', translation: 'Surprised', example: 'Ich war wirklich überrascht über seine schnelle Antwort.', category: 'Adjective' },
  { id: 19, word: 'Verhalten', translation: 'Behavior', example: 'Sein Verhalten auf der Party war völlig inakzeptabel.', category: 'Noun' },
  { id: 20, word: 'Eigenschaft', translation: 'Characteristic / Trait', example: 'Geduld ist eine sehr wichtige Eigenschaft für Lehrer.', category: 'Noun' },
  { id: 21, word: 'Enttäuscht', translation: 'Disappointed', example: 'Die Fans waren enttäuscht vom Ergebnis des Spiels.', category: 'Adjective' },
  { id: 22, word: 'Bemerkenswert', translation: 'Remarkable', example: 'Ihre akademische Leistung war wirklich bemerkenswert.', category: 'Adjective' },
  { id: 23, word: 'Ausreichend', translation: 'Sufficient', example: 'Wir haben leider nicht ausreichend Zeit für dieses Projekt.', category: 'Adjective' },
  { id: 24, word: 'Anspruchsvoll', translation: 'Demanding', example: 'Mein neues Studium ist unglaublich anspruchsvoll.', category: 'Adjective' },
  { id: 25, word: 'Gegenteil', translation: 'Opposite', example: 'Das Gegenteil von gut ist nicht immer schlecht.', category: 'Noun' },
  { id: 26, word: 'Entwicklung', translation: 'Development', example: 'Die technologische Entwicklung geht heutzutage rasant.', category: 'Noun' },
  { id: 27, word: 'Gesellschaft', translation: 'Society', example: 'Jeder Mensch ist ein wichtiger Teil unserer Gesellschaft.', category: 'Noun' },
  { id: 28, word: 'Vielfältig', translation: 'Diverse / Varied', example: 'Das Angebot an Sprachkursen ist hier sehr vielfältig.', category: 'Adjective' },
  { id: 29, word: 'Zusammenhang', translation: 'Context / Connection', example: 'In diesem Zusammenhang ergibt das Zitat keinen Sinn.', category: 'Noun' },
  { id: 30, word: 'Tatsächlich', translation: 'Actually / Indeed', example: 'Das ist tatsächlich die beste Lösung für uns alle.', category: 'Adverb' },
];

export const englishVocabs: Vocab[] = [
  { id: 1, word: 'Accomplish', translation: 'Achieve / Complete', example: 'She accomplished all her goals this year.', category: 'Verb' },
  { id: 2, word: 'Ambiguous', translation: 'Unclear / Vague', example: 'His answer was ambiguous and hard to understand.', category: 'Adjective' },
  { id: 3, word: 'Consequence', translation: 'Result / Effect', example: 'You must face the consequences of your actions.', category: 'Noun' },
  { id: 4, word: 'Dedicate', translation: 'Commit / Devote', example: 'He dedicated his life to helping others.', category: 'Verb' },
  { id: 5, word: 'Efficient', translation: 'Effective / Productive', example: 'Working smart is more efficient than working hard.', category: 'Adjective' },
  { id: 6, word: 'Frustrate', translation: 'Annoy / Disappoint', example: 'The delay frustrated the entire team.', category: 'Verb' },
  { id: 7, word: 'Genuine', translation: 'Real / Authentic', example: 'Her smile was warm and genuine.', category: 'Adjective' },
  { id: 8, word: 'Hesitate', translation: 'Pause / Wait', example: 'Don\'t hesitate to ask for help when you need it.', category: 'Verb' },
  { id: 9, word: 'Inevitable', translation: 'Unavoidable / Certain', example: 'Change is inevitable in any growing company.', category: 'Adjective' },
  { id: 10, word: 'Justify', translation: 'Explain / Defend', example: 'Can you justify your decision to the team?', category: 'Verb' },
  { id: 11, word: 'Keen', translation: 'Eager / Sharp', example: 'She has a keen interest in learning languages.', category: 'Adjective' },
  { id: 12, word: 'Leverage', translation: 'Use / Take advantage of', example: 'We can leverage technology to solve this problem.', category: 'Verb' },
  { id: 13, word: 'Maintain', translation: 'Keep / Preserve', example: 'It\'s hard to maintain focus during long meetings.', category: 'Verb' },
  { id: 14, word: 'Neglect', translation: 'Ignore / Forget', example: 'Don\'t neglect your health while chasing success.', category: 'Verb' },
  { id: 15, word: 'Overwhelm', translation: 'Overload / Crush', example: 'Too much information can overwhelm you.', category: 'Verb' },
  { id: 16, word: 'Perceive', translation: 'Notice / See', example: 'How we perceive problems affects how we solve them.', category: 'Verb' },
  { id: 17, word: 'Qualify', translation: 'Be eligible / Fit', example: 'You need experience to qualify for this position.', category: 'Verb' },
  { id: 18, word: 'Remarkable', translation: 'Amazing / Exceptional', example: 'She made a remarkable recovery after the accident.', category: 'Adjective' },
  { id: 19, word: 'Sufficient', translation: 'Enough / Adequate', example: 'Is the budget sufficient for this project?', category: 'Adjective' },
  { id: 20, word: 'Transparent', translation: 'Clear / Open', example: 'Good leaders are transparent with their teams.', category: 'Adjective' },
  { id: 21, word: 'Undermine', translation: 'Weaken / Damage', example: 'Constant criticism can undermine someone\'s confidence.', category: 'Verb' },
  { id: 22, word: 'Vulnerable', translation: 'Weak / Defenseless', example: 'Sharing feelings can make you feel vulnerable.', category: 'Adjective' },
  { id: 23, word: 'Withstand', translation: 'Resist / Endure', example: 'The structure was built to withstand earthquakes.', category: 'Verb' },
  { id: 24, word: 'Exceed', translation: 'Surpass / Go beyond', example: 'Her results exceeded everyone\'s expectations.', category: 'Verb' },
  { id: 25, word: 'Yield', translation: 'Produce / Give in', example: 'Hard work will yield great results over time.', category: 'Verb' },
  { id: 26, word: 'Adapt', translation: 'Adjust / Change', example: 'You need to adapt quickly in a new environment.', category: 'Verb' },
  { id: 27, word: 'Comprehensive', translation: 'Complete / Thorough', example: 'The report was comprehensive and well-structured.', category: 'Adjective' },
  { id: 28, word: 'Disrupt', translation: 'Interrupt / Disturb', example: 'New technology can disrupt traditional industries.', category: 'Verb' },
  { id: 29, word: 'Enthusiastic', translation: 'Excited / Eager', example: 'The crowd was enthusiastic about the new product.', category: 'Adjective' },
  { id: 30, word: 'Flexible', translation: 'Adaptable / Adjustable', example: 'A flexible schedule allows for better work-life balance.', category: 'Adjective' },
];

/** Returns the vocab list for a given language */
export function getVocabs(lang: Language): Vocab[] {
  return lang === 'en' ? englishVocabs : germanVocabs;
}

// Keep backward-compat alias for PartsPage which still imports `vocabs` directly
export const vocabs = germanVocabs;