import { Language } from '../types';

export interface ScenarioVocab {
  word: string;
  translation: string;
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  goal: string;
  /** 2–3 sentence scene-setter shown to the learner before the chat. */
  situation: string;
  /** 5 situational vocab words; one is picked randomly per session. */
  vocabPool: ScenarioVocab[];
  /** At least 3 sub-goals. The last one is a special/bonus task. */
  subGoals: string[];
  systemPrompt: string;
}

export const germanScenarios: Scenario[] = [
  {
    id: 'hotel',
    title: 'Hotel buchen',
    subtitle: 'Book a hotel room',
    icon: '🏨',
    goal: 'Successfully book a hotel room',
    situation: 'Du bist gerade in München angekommen und stehst an der Rezeption eines Hotels. Du hast online kein Zimmer gebucht und möchtest spontan eines reservieren. Der Rezeptionist Klaus wartet auf dich.',
    vocabPool: [
      { word: 'Doppelzimmer', translation: 'double room' },
      { word: 'Frühstück', translation: 'breakfast' },
      { word: 'verfügbar', translation: 'available' },
      { word: 'Aufpreis', translation: 'surcharge / extra charge' },
      { word: 'Nichtraucherzimmer', translation: 'non-smoking room' },
    ],
    subGoals: [
      'Nenne dem Rezeptionisten deine Reisedaten',
      'Sage, für wie viele Gäste das Zimmer ist',
      '🎁 Spezial: Bitte um eine Geburtstagsüberraschung im Zimmer',
    ],
    systemPrompt: `You are a hotel receptionist in Germany named Klaus. Speak ONLY in German. Be helpful and natural.
Keep replies short (2-4 sentences max).

Track these three sub-goals internally:
1. The user provides travel dates → reply normally, then append "[GOAL_1]" at the very end of your message.
2. The user says how many guests → reply normally, then append "[GOAL_2]".
3. The user asks for a birthday surprise or special room decoration → reply normally, then append "[GOAL_3]".

Only emit each tag once, the first time the goal is reached. When all three tags have been emitted (in any message), also append "[GOAL_REACHED]" at the very end.`,
  },
  {
    id: 'restaurant',
    title: 'Im Restaurant',
    subtitle: 'Order food at a restaurant',
    icon: '🍽️',
    goal: 'Order a full meal and pay the bill',
    situation: 'Es ist Freitagabend und du sitzt in einem gemütlichen Restaurant in Berlin. Die Kellnerin Lena bringt dir die Speisekarte und lächelt dich freundlich an. Du hast Hunger und möchtest ein komplettes Abendessen bestellen.',
    vocabPool: [
      { word: 'Tagesgericht', translation: 'dish of the day' },
      { word: 'Vorspeise', translation: 'starter / appetiser' },
      { word: 'empfehlen', translation: 'to recommend' },
      { word: 'allergisch', translation: 'allergic' },
      { word: 'Trinkgeld', translation: 'tip / gratuity' },
    ],
    subGoals: [
      'Bestelle dein Hauptgericht',
      'Bestelle ein Getränk',
      '🎁 Spezial: Bitte die Bedienung um eine Empfehlung',
    ],
    systemPrompt: `You are a waiter at a German restaurant named Lena. Speak ONLY in German. Be friendly and natural.
Keep replies short (2-4 sentences max).

Track these three sub-goals:
1. User orders a main course → append "[GOAL_1]" once at the end.
2. User orders a drink → append "[GOAL_2]" once at the end.
3. User explicitly asks for a recommendation → append "[GOAL_3]" once at the end.

When all three goals are reached, also append "[GOAL_REACHED]".`,
  },
  {
    id: 'arzt',
    title: 'Beim Arzt',
    subtitle: 'Visit the doctor',
    icon: '🏥',
    goal: 'Describe your symptoms and get a diagnosis',
    situation: 'Du fühlst dich seit einigen Tagen nicht gut und hast endlich einen Termin beim Hausarzt bekommen. Dr. Müller ruft deinen Namen auf und bittet dich, im Behandlungszimmer Platz zu nehmen. Erkläre ihm, was dich plagt.',
    vocabPool: [
      { word: 'schwindelig', translation: 'dizzy' },
      { word: 'Übelkeit', translation: 'nausea' },
      { word: 'Fieber', translation: 'fever' },
      { word: 'Rezept', translation: 'prescription' },
      { word: 'Schmerzmittel', translation: 'painkiller' },
    ],
    subGoals: [
      'Beschreibe dein Hauptsymptom',
      'Sage, wie lange du es schon hast',
      '🎁 Spezial: Frage, ob du eine Krankschreibung benötigst',
    ],
    systemPrompt: `You are a German doctor named Dr. Müller. Speak ONLY in German. Be professional.
Keep replies short (2-4 sentences max).

Track these three sub-goals:
1. User describes a symptom → append "[GOAL_1]" once at the end.
2. User says how long they have had illness → append "[GOAL_2]" once at the end.
3. User asks for a sick note (Krankschreibung or Attest) → append "[GOAL_3]" once at the end.

When all three goals are reached, also append "[GOAL_REACHED]".`,
  },
  {
    id: 'supermarkt',
    title: 'Im Supermarkt',
    subtitle: 'Ask for help finding items',
    icon: '🛒',
    goal: 'Find 3 items and check out',
    situation: 'Du bist in einem großen REWE-Supermarkt in Frankfurt und kennst dich noch nicht gut aus. Du brauchst mehrere Artikel für ein Abendessen und ein Mitarbeiter steht in der Nähe, bereit dir zu helfen.',
    vocabPool: [
      { word: 'Sonderangebot', translation: 'special offer / deal' },
      { word: 'Abteilung', translation: 'section / aisle' },
      { word: 'Kassenbon', translation: 'receipt' },
      { word: 'Pfand', translation: 'bottle deposit' },
      { word: 'Bioprodukte', translation: 'organic products' },
    ],
    subGoals: [
      'Frage, wo du ein Produkt finden kannst',
      'Finde einen zweiten Artikel',
      '🎁 Spezial: Frage, ob es heute ein Sonderangebot gibt',
    ],
    systemPrompt: `You are a supermarket assistant in Germany. Speak ONLY in German.
Keep replies short (2-4 sentences max).

Track these three sub-goals:
1. User asks where to find any product → append "[GOAL_1]" once at the end.
2. User asks where to find a second (different) product → append "[GOAL_2]" once at the end.
3. User asks about a discount, sale, or special offer → append "[GOAL_3]" once at the end.

When all three goals are reached, also append "[GOAL_REACHED]".`,
  },
  {
    id: 'bahn',
    title: 'Bahnticket kaufen',
    subtitle: 'Buy a train ticket',
    icon: '🚆',
    goal: 'Buy a train ticket to Berlin',
    situation: 'Du stehst am Schalter am Hamburger Hauptbahnhof. Dein Zug nach Berlin fährt in einer Stunde und du musst noch ein Ticket kaufen. Der Beamte am Schalter schaut dich erwartungsvoll an.',
    vocabPool: [
      { word: 'Hin- und Rückfahrt', translation: 'return ticket' },
      { word: 'Verspätung', translation: 'delay' },
      { word: 'Fensterplatz', translation: 'window seat' },
      { word: 'Umstieg', translation: 'transfer / connection' },
      { word: 'Bahnsteig', translation: 'platform' },
    ],
    subGoals: [
      'Nenne dein Reiseziel',
      'Wähle eine Reiseklasse (1. oder 2. Klasse)',
      '🎁 Spezial: Frage, ob es einen Gruppenrabatt gibt',
    ],
    systemPrompt: `You are a ticket agent at a German train station. Speak ONLY in German.
Keep replies short (2-4 sentences max).

Track these three sub-goals:
1. User states a destination → append "[GOAL_1]" once at the end.
2. User picks 1st or 2nd class (or asks about classes) → append "[GOAL_2]" once at the end.
3. User asks about a group discount or Gruppenrabatt → append "[GOAL_3]" once at the end.

When all three goals are reached, also append "[GOAL_REACHED]".`,
  },
  {
    id: 'wohnung',
    title: 'Wohnung mieten',
    subtitle: 'Rent an apartment',
    icon: '🏠',
    goal: 'Inquire and arrange a viewing',
    situation: 'Du hast eine Anzeige für eine 2-Zimmer-Wohnung in Köln online gesehen und rufst jetzt den Vermieter Herr Fischer an. Die Wohnung klingt perfekt für dich, aber du hast noch ein paar wichtige Fragen, bevor du dich entscheidest.',
    vocabPool: [
      { word: 'Nebenkosten', translation: 'utility bills / running costs' },
      { word: 'Kaution', translation: 'security deposit' },
      { word: 'möbliert', translation: 'furnished' },
      { word: 'Grundriss', translation: 'floor plan' },
      { word: 'Besichtigung', translation: 'viewing / inspection' },
    ],
    subGoals: [
      'Frage nach der monatlichen Miete',
      'Vereinbare einen Besichtigungstermin',
      '🎁 Spezial: Frage, ob Haustiere erlaubt sind',
    ],
    systemPrompt: `You are a German landlord named Herr Fischer. Speak ONLY in German.
Keep replies short (2-4 sentences max).

Track these three sub-goals:
1. User asks about the rent price → append "[GOAL_1]" once at the end.
2. User schedules or asks to schedule a viewing → append "[GOAL_2]" once at the end.
3. User asks if pets are allowed → append "[GOAL_3]" once at the end.

When all three goals are reached, also append "[GOAL_REACHED]".`,
  },
];

export const englishScenarios: Scenario[] = [
  {
    id: 'hotel',
    title: 'Book a Hotel',
    subtitle: 'Reserve a room at a hotel',
    icon: '🏨',
    goal: 'Successfully book a hotel room',
    situation: "You've just arrived in London after a long flight and you're standing at the front desk of a hotel near the city centre. You didn't book in advance and hope they have a room available. The receptionist James greets you warmly.",
    vocabPool: [
      { word: 'adjoining rooms', translation: 'connected rooms next to each other' },
      { word: 'complimentary', translation: 'free / included in the price' },
      { word: 'amenities', translation: 'facilities (pool, gym, etc.)' },
      { word: 'concierge', translation: 'hotel helper for bookings & info' },
      { word: 'checkout time', translation: 'time you must leave the room by' },
    ],
    subGoals: [
      'Tell the receptionist your dates',
      'Say how many guests',
      '🎁 Special: Request a birthday surprise in the room',
    ],
    systemPrompt: `You are a hotel receptionist in London named James. Speak ONLY in English. Be helpful and natural.
Keep replies short (2-4 sentences max).

Track these three sub-goals:
1. User provides travel dates → append "[GOAL_1]" once at the end.
2. User states how many guests → append "[GOAL_2]" once at the end.
3. User asks for a birthday surprise or special room decoration → append "[GOAL_3]" once at the end.

When all three goals are reached, also append "[GOAL_REACHED]".`,
  },
  {
    id: 'restaurant',
    title: 'At a Restaurant',
    subtitle: 'Order food and pay the bill',
    icon: '🍽️',
    goal: 'Order a full meal and pay the bill',
    situation: "It's a Saturday evening and you're seated at a cosy English restaurant in Oxford. Your waiter Sarah hands you the menu with a smile. You're hungry after a day of sightseeing and ready to order a proper meal.",
    vocabPool: [
      { word: 'specials', translation: 'today\'s extra dishes not on the menu' },
      { word: 'allergen', translation: 'a substance that causes an allergic reaction' },
      { word: 'garnish', translation: 'decoration added to a dish' },
      { word: 'palate', translation: 'your sense of taste' },
      { word: 'corkage', translation: 'fee for bringing your own wine' },
    ],
    subGoals: [
      'Order your main course',
      'Order a drink',
      '🎁 Special: Ask the waiter for a recommendation',
    ],
    systemPrompt: `You are a friendly waiter at an English restaurant named Sarah. Speak ONLY in English.
Keep replies short (2-4 sentences max).

Track these three sub-goals:
1. User orders a main course → append "[GOAL_1]" once at the end.
2. User orders a drink → append "[GOAL_2]" once at the end.
3. User asks for a recommendation → append "[GOAL_3]" once at the end.

When all three goals are reached, also append "[GOAL_REACHED]".`,
  },
  {
    id: 'doctor',
    title: 'At the Doctor',
    subtitle: 'Describe symptoms and get advice',
    icon: '🏥',
    goal: 'Describe your symptoms and get a diagnosis',
    situation: "You haven't been feeling well for a few days and have managed to get a GP appointment. Dr. Smith calls you in and asks you to sit down. Be clear and specific about your symptoms so he can help you.",
    vocabPool: [
      { word: 'dizzy', translation: 'feeling like everything is spinning' },
      { word: 'nausea', translation: 'feeling like you need to vomit' },
      { word: 'prescription', translation: 'a doctor\'s written order for medicine' },
      { word: 'chronic', translation: 'long-lasting / persisting over time' },
      { word: 'referral', translation: 'being sent to a specialist' },
    ],
    subGoals: [
      'Describe your main symptom',
      'Say how long you have had it',
      '🎁 Special: Ask for a sick note',
    ],
    systemPrompt: `You are an English doctor named Dr. Smith. Speak ONLY in English.
Keep replies short (2-4 sentences max).

Track these three sub-goals:
1. User describes a symptom → append "[GOAL_1]" once at the end.
2. User says how long they have been ill → append "[GOAL_2]" once at the end.
3. User asks for a sick note or doctor's note → append "[GOAL_3]" once at the end.

When all three goals are reached, also append "[GOAL_REACHED]".`,
  },
  {
    id: 'supermarket',
    title: 'At the Supermarket',
    subtitle: 'Ask for help finding items',
    icon: '🛒',
    goal: 'Find items and check out',
    situation: "You're in a large Tesco supermarket and you're not familiar with the layout at all. You need several items for a dinner party tonight and a member of staff is nearby ready to assist.",
    vocabPool: [
      { word: 'aisle', translation: 'the passage between shelves' },
      { word: 'expiry date', translation: 'the date food must be used by' },
      { word: 'loyalty card', translation: 'a card that earns you points / discounts' },
      { word: 'perishable', translation: 'food that goes off quickly' },
      { word: 'bulk buy', translation: 'buying a large quantity to save money' },
    ],
    subGoals: [
      'Ask where to find a product',
      'Find a second item',
      '🎁 Special: Ask if there is a discount today',
    ],
    systemPrompt: `You are a supermarket assistant in England. Speak ONLY in English.
Keep replies short (2-4 sentences max).

Track these three sub-goals:
1. User asks where to find any product → append "[GOAL_1]" once at the end.
2. User asks where to find a second product → append "[GOAL_2]" once at the end.
3. User asks about a discount, sale, or special offer → append "[GOAL_3]" once at the end.

When all three goals are reached, also append "[GOAL_REACHED]".`,
  },
  {
    id: 'train',
    title: 'Buy a Train Ticket',
    subtitle: 'Purchase a ticket at the station',
    icon: '🚆',
    goal: 'Buy a train ticket to London',
    situation: "You're at Manchester Piccadilly station and need to catch a train to London this afternoon. You head to the ticket window where a staff member is ready to help. You want to get the best deal for your journey.",
    vocabPool: [
      { word: 'platform', translation: 'the area where you board the train' },
      { word: 'peak hours', translation: 'busy times when fares are higher' },
      { word: 'railcard', translation: 'a discount card for train travel' },
      { word: 'itinerary', translation: 'a planned route / schedule' },
      { word: 'interchange', translation: 'a station where you change trains' },
    ],
    subGoals: [
      'Say your destination',
      'Choose a travel class',
      '🎁 Special: Ask if there is a group discount',
    ],
    systemPrompt: `You are a ticket agent at an English train station. Speak ONLY in English.
Keep replies short (2-4 sentences max).

Track these three sub-goals:
1. User states a destination → append "[GOAL_1]" once at the end.
2. User picks 1st or 2nd class (or asks about it) → append "[GOAL_2]" once at the end.
3. User asks about a group discount → append "[GOAL_3]" once at the end.

When all three goals are reached, also append "[GOAL_REACHED]".`,
  },
  {
    id: 'apartment',
    title: 'Rent an Apartment',
    subtitle: 'Inquire about and view a flat',
    icon: '🏠',
    goal: 'Get info and arrange a viewing',
    situation: "You spotted an online listing for a one-bedroom flat in central Edinburgh that looks perfect. You've called the landlord Mr. Thompson to find out more details before committing to a viewing.",
    vocabPool: [
      { word: 'deposit', translation: 'upfront money held as security' },
      { word: 'tenancy', translation: 'the period you rent the property' },
      { word: 'utilities', translation: 'water, gas, and electricity costs' },
      { word: 'inventory', translation: 'a list of items in the property' },
      { word: 'letting agent', translation: 'an agency that manages rentals' },
    ],
    subGoals: [
      'Ask about the monthly rent',
      'Schedule a viewing appointment',
      '🎁 Special: Ask if pets are allowed',
    ],
    systemPrompt: `You are an English landlord named Mr. Thompson. Speak ONLY in English.
Keep replies short (2-4 sentences max).

Track these three sub-goals:
1. User asks about the rent price → append "[GOAL_1]" once at the end.
2. User schedules or asks to schedule a viewing → append "[GOAL_2]" once at the end.
3. User asks if pets are allowed → append "[GOAL_3]" once at the end.

When all three goals are reached, also append "[GOAL_REACHED]".`,
  },
];

export function getScenarios(lang: Language): Scenario[] {
  return lang === 'en' ? englishScenarios : germanScenarios;
}

export const scenarios = germanScenarios;
