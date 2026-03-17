import { Language } from '../types';

/** B2–C2 level vocabulary for the conversation vocab-task feature */
export interface B2C2Word {
  word: string;
  translation: string;
  level: 'B2' | 'C1' | 'C2';
}

export const b2c2Vocabs: B2C2Word[] = [
  // B2
  { word: 'dennoch', translation: 'nevertheless / still', level: 'B2' },
  { word: 'aufgrund', translation: 'due to / because of', level: 'B2' },
  { word: 'allerdings', translation: 'however / admittedly', level: 'B2' },
  { word: 'jedenfalls', translation: 'at any rate / in any case', level: 'B2' },
  { word: 'zwischenzeitlich', translation: 'in the meantime', level: 'B2' },
  { word: 'ansonsten', translation: 'otherwise', level: 'B2' },
  { word: 'infolgedessen', translation: 'consequently / as a result', level: 'B2' },
  { word: 'letztendlich', translation: 'ultimately / in the end', level: 'B2' },
  { word: 'demzufolge', translation: 'accordingly / therefore', level: 'B2' },
  { word: 'hingegen', translation: 'on the other hand / whereas', level: 'B2' },
  { word: 'überdies', translation: 'moreover / furthermore', level: 'B2' },
  { word: 'womöglich', translation: 'possibly / perhaps', level: 'B2' },
  { word: 'keineswegs', translation: 'by no means / not at all', level: 'B2' },
  { word: 'immerhin', translation: 'after all / at least', level: 'B2' },
  { word: 'zudem', translation: 'in addition / furthermore', level: 'B2' },

  // C1
  { word: 'indes', translation: 'meanwhile / however', level: 'C1' },
  { word: 'vergeblich', translation: 'in vain / futile', level: 'C1' },
  { word: 'ungeachtet', translation: 'regardless of', level: 'C1' },
  { word: 'beiläufig', translation: 'casually / in passing', level: 'C1' },
  { word: 'mitunter', translation: 'sometimes / occasionally', level: 'C1' },
  { word: 'abermals', translation: 'once again / anew', level: 'C1' },
  { word: 'schließlich', translation: 'finally / after all', level: 'C1' },
  { word: 'folgerichtig', translation: 'logically consistent', level: 'C1' },
  { word: 'diesbezüglich', translation: 'in this regard / concerning this', level: 'C1' },
  { word: 'entgegen', translation: 'contrary to / against', level: 'C1' },
  { word: 'außerordentlich', translation: 'extraordinary / exceptionally', level: 'C1' },
  { word: 'nichtsdestotrotz', translation: 'nevertheless / even so', level: 'C1' },
  { word: 'ausschlaggebend', translation: 'decisive / crucial', level: 'C1' },
  { word: 'abgesehen davon', translation: 'apart from that / aside from that', level: 'C1' },
  { word: 'gleichwohl', translation: 'nonetheless / even so', level: 'C1' },

  // C2
  { word: 'indessen', translation: 'meanwhile / in the meantime', level: 'C2' },
  { word: 'wenngleich', translation: 'even though / although', level: 'C2' },
  { word: 'nichtsdestoweniger', translation: 'none the less', level: 'C2' },
  { word: 'unbeschadet', translation: 'without prejudice to / notwithstanding', level: 'C2' },
  { word: 'verabsäumen', translation: 'to neglect / to omit', level: 'C2' },
  { word: 'anmaßend', translation: 'presumptuous / arrogant', level: 'C2' },
  { word: 'wohingegen', translation: 'whereas / while', level: 'C2' },
  { word: 'beredt', translation: 'eloquent', level: 'C2' },
  { word: 'beizeiten', translation: 'in good time / early on', level: 'C2' },
  { word: 'insofern', translation: 'insofar as / to that extent', level: 'C2' },
];

// ─── English B2–C2 vocab ───
export const b2c2EnVocabs: B2C2Word[] = [
  // B2
  { word: 'albeit', translation: 'although / even though', level: 'B2' },
  { word: 'forthcoming', translation: 'about to happen / cooperative', level: 'B2' },
  { word: 'consequently', translation: 'as a result / therefore', level: 'B2' },
  { word: 'predominantly', translation: 'mainly / for the most part', level: 'B2' },
  { word: 'in retrospect', translation: 'looking back / with hindsight', level: 'B2' },
  { word: 'concede', translation: 'to admit / to acknowledge', level: 'B2' },
  { word: 'paramount', translation: 'of prime importance / supreme', level: 'B2' },
  { word: 'tentative', translation: 'not certain / provisional', level: 'B2' },
  { word: 'substantiate', translation: 'to support with evidence', level: 'B2' },
  { word: 'forthright', translation: 'direct / outspoken', level: 'B2' },
  { word: 'contend', translation: 'to argue / to claim', level: 'B2' },
  { word: 'pertinent', translation: 'relevant / to the point', level: 'B2' },
  { word: 'mitigate', translation: 'to lessen / to reduce in severity', level: 'B2' },
  { word: 'discrepancy', translation: 'a difference / inconsistency', level: 'B2' },
  { word: 'hitherto', translation: 'until now / previously', level: 'B2' },

  // C1
  { word: 'acquiesce', translation: 'to accept reluctantly / comply silently', level: 'C1' },
  { word: 'circumspect', translation: 'cautious / wary', level: 'C1' },
  { word: 'predicated on', translation: 'based on / dependent on', level: 'C1' },
  { word: 'cogent', translation: 'clear and convincing', level: 'C1' },
  { word: 'allude', translation: 'to hint at / to refer to indirectly', level: 'C1' },
  { word: 'ostensibly', translation: 'apparently / on the surface', level: 'C1' },
  { word: 'extrapolate', translation: 'to extend conclusions beyond data', level: 'C1' },
  { word: 'impede', translation: 'to obstruct / to slow down', level: 'C1' },
  { word: 'elicit', translation: 'to draw out / to provoke a response', level: 'C1' },
  { word: 'nuanced', translation: 'subtly different / finely detailed', level: 'C1' },
  { word: 'corroborate', translation: 'to confirm / to support', level: 'C1' },
  { word: 'astute', translation: 'clever / sharply perceptive', level: 'C1' },
  { word: 'precipitate', translation: 'to cause suddenly / hasty', level: 'C1' },
  { word: 'insidious', translation: 'subtly harmful / treacherous', level: 'C1' },
  { word: 'superfluous', translation: 'unnecessary / excessive', level: 'C1' },

  // C2
  { word: 'inimical', translation: 'harmful / hostile', level: 'C2' },
  { word: 'propitious', translation: 'favourable / auspicious', level: 'C2' },
  { word: 'tendentious', translation: 'biased / promoting a cause', level: 'C2' },
  { word: 'perspicacious', translation: 'having ready insight / shrewd', level: 'C2' },
  { word: 'laconic', translation: 'using very few words', level: 'C2' },
  { word: 'sanguine', translation: 'optimistic / positive', level: 'C2' },
  { word: 'perfidious', translation: 'deceitful / treacherous', level: 'C2' },
  { word: 'loquacious', translation: 'very talkative', level: 'C2' },
  { word: 'equivocate', translation: 'to be deliberately vague', level: 'C2' },
  { word: 'pellucid', translation: 'transparently clear', level: 'C2' },
];

/** Returns a random B2-C2 word for the given language */
export function getRandomB2C2Word(lang: Language): B2C2Word {
  const list = lang === 'en' ? b2c2EnVocabs : b2c2Vocabs;
  return list[Math.floor(Math.random() * list.length)];
}
