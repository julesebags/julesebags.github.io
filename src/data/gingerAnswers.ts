/**
 * Ginger's script. She's the portfolio's spokesdog: the tone is silly,
 * but every claim is pulled from real content in `experience.ts`,
 * `projects.ts`, and the About section — a recruiter should come away
 * with actual information.
 *
 * Typed questions are routed by keyword rather than by any model, so
 * keywords should stay distinctive between entries. Longer matches win,
 * which is what keeps "tell me about julie" from landing on "ginger".
 */

export interface GingerAnswer {
  id: string
  /** Doubles as the suggestion chip and the echoed user message. */
  question: string
  /** Lowercase fragments that route a typed question here. */
  keywords: string[]
  /** Her reply, one bubble per entry. */
  reply: string[]
}

export const GINGER_ANSWERS: GingerAnswer[] = [
  {
    id: 'who',
    question: 'who are you?',
    keywords: ['who are you', 'what are you', 'your name', 'about you', 'ginger'],
    reply: [
      "hi!! im ginger. im julie's dog. i just turned 9, which i'm told is somewhere in my 60s in human years.",
      'my whole personality is barking at everyone who walks past the window. i am very good at it.',
      'julie made me her spokesperson because i work for treats. ask me about her, i know things.',
    ],
  },
  {
    id: 'about',
    question: 'tell me about julie',
    keywords: [
      'about julie',
      'tell me about',
      'who is julie',
      'background',
      'school',
      'study',
      'major',
    ],
    reply: [
      "she's a rising senior at washu, double majoring in computer science and math.",
      'this past summer she was a software engineering intern at mastercard. she also builds features for proximity, a washu off-campus housing marketplace with 300+ users and $500k+ of leases signed through it.',
      "she says she cares about whether software is actually usable, not just whether it runs. i care about whether she's home yet.",
    ],
  },
  {
    id: 'hire',
    question: 'why should i hire julie?',
    keywords: ['hire', 'why should', 'recruit', 'interview', 'candidate'],
    reply: [
      'biased answer: she feeds me. real answer: she ships things people actually use.',
      'at mastercard she built an internal tool that cut a multi-step setup down to one step, was scrum master for 8 devs, and demoed it to the CTO.',
      'at the washu accelerator she built a public health dashboard for 300+ researchers across 20+ countries — sub-second filters over 60k records, payloads cut by 95%+.',
      'she finishes what she starts. that is more than i can say for any bone i have ever been given.',
    ],
  },
  {
    id: 'strengths',
    question: 'what are her strengths?',
    keywords: ['strength', 'good at', 'best at', 'skills', 'strong'],
    reply: [
      'one: she turns messy requirements into something usable. she wrote a whole usability audit of washu workday for the provost.',
      'two: she makes slow things fast. see: the 95% payload thing i mentioned. she will bring it up too.',
      'three: she leads. head TA over 30+ TAs and 250+ students, co-president of PUSO, and treasurer of a $30k+ budget for a 600-person conference.',
      'four: she has a dog. personally i think this is the strongest one.',
    ],
  },
  {
    id: 'built',
    question: 'what has she built?',
    keywords: ['built', 'build', 'project', 'made', 'portfolio', 'work on'],
    reply: [
      'leetcode 1v1 lets engineers spar through coding problems head-to-head with live scoring and matchmaking. tailor is an AI virtual wardrobe. cory is a personal AI assistant. grubu does campus food ordering.',
      'for work: the whole messaging system at proximity — live delivery, prefetch, email deep links — and that public health dashboard at the accelerator.',
      'scroll down to the work section, it has pictures. i am in none of them, which i believe was an oversight.',
    ],
  },
  {
    id: 'contact',
    question: 'how do i reach her?',
    keywords: ['contact', 'reach', 'email', 'linkedin', 'github', 'resume', 'touch'],
    reply: [
      "linkedin and github are the two little icons right under her name up there. her email's at the very bottom of the page.",
      'she replies faster than i come when called.',
    ],
  },
]

/** Used when nothing matches — she's a dog, not a language model. */
const GINGER_FALLBACKS = [
  "i don't know that one. i'm a dog. try one of these?",
  'that was not in my training data (treats). maybe ask me one of these:',
  'no clue!! but i can answer these ones:',
]

export function pickGingerFallback(): string {
  return GINGER_FALLBACKS[Math.floor(Math.random() * GINGER_FALLBACKS.length)]
}

/**
 * Routes free text to an answer by keyword overlap, weighting longer
 * fragments higher so specific phrases beat generic ones.
 */
export function matchGingerAnswer(input: string): GingerAnswer | null {
  const text = input.toLowerCase()
  let best: GingerAnswer | null = null
  let bestScore = 0

  for (const answer of GINGER_ANSWERS) {
    let score = 0
    for (const keyword of answer.keywords) {
      if (text.includes(keyword)) score += keyword.length
    }
    if (score > bestScore) {
      best = answer
      bestScore = score
    }
  }

  return best
}
