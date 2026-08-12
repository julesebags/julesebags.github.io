import { getExperienceImages } from '../lib/assetLoader'

export type ExperienceCategory =
  | 'professional'
  | 'leadership'
  | 'creative'
  | 'entrepreneurship'

export interface ExperienceMetric {
  val: string
  label: string
}

export interface Experience {
  id: string
  category: ExperienceCategory
  /** Primary heading — the role / position. */
  role: string
  /** Subtitle — the organization. */
  organization: string
  /** Pre-formatted human date range, e.g. "Jun 2026 – Aug 2026". */
  dateRange: string
  /** Pre-formatted duration, e.g. "3 mo", "1y 2mo", "~3y". */
  duration: string
  /** One-liner summary that headlines the section. */
  pitch: string
  /** Detailed paragraph — what was actually done. */
  description: string
  /** Achievement bullets (2–4). */
  bullets: string[]
  /** Optional skill / tool tags. */
  tags?: string[]
  /** Headline metrics for the role (optional, 0–4 of them). */
  metrics?: ExperienceMetric[]
  /**
   * Optional external link rendered at the bottom of the body — used
   * for things like a published paper, a live demo, or a write-up.
   */
  link?: {
    href: string
    label: string
  }
  /**
   * Resolved media list. Auto-populated from
   * `src/assets/experience/<id>/` when images are present; falls back
   * to gradient placeholder strings when the folder is empty.
   *
   * To swap in real photos: drop them into the matching folder. No
   * imports needed. See `src/assets/README.md`.
   */
  images: string[]
  /** Per-role accent color used on tags + bullets + duration pill. */
  color: string
}

export const experiences: Experience[] = [
  // ============================================================
  // PROFESSIONAL
  // ============================================================
  {
    id: 'mastercard',
    category: 'professional',
    role: 'Full Stack Developer Intern',
    organization: 'Mastercard',
    dateRange: 'Jun 2026 – Aug 2026',
    duration: '3 mo',
    pitch: 'Production engineering on a global payments platform.',
    description:
      'Joining Mastercard as a SWE intern in summer 2026. Owning end-to-end features inside a production engineering org — backend services, frontend interfaces, and the developer tooling that holds them together.',
    bullets: [
      'Building and shipping features inside a production codebase',
      'Designing scalable backend services that touch real-world payments traffic',
      'Working alongside a SWE team at one of the largest fintechs in the world',
    ],
    tags: ['Full Stack', 'Enterprise'],
    metrics: [
      { val: 'Summer', label: '2026 SWE intern' },
      { val: 'Prod', label: 'codebase' },
    ],
    images: getExperienceImages('mastercard', [
      'linear-gradient(135deg, #ffb88c 0%, #ff8aa8 50%, #2f3e3d 100%)',
      'linear-gradient(45deg, #ff8aa8 0%, #ffb88c 100%)',
      'radial-gradient(circle at 30% 30%, #ffb88c 0%, #ff8aa8 60%, #2f3e3d 100%)',
    ]),
    color: '#ffb88c',
  },
  {
    id: 'dii-accelerator',
    category: 'professional',
    role: 'Full Stack Developer',
    organization: 'WashU Digital Intelligence & Innovation Accelerator',
    dateRange: 'May 2025 – Jun 2026',
    duration: '1y 1mo',
    pitch:
      'Shipping internal tools that accelerate research and innovation at WashU.',
    description:
      'Built full-stack applications used daily by faculty, researchers, and program staff at the WashU DIAA. Took features from Figma to production with minimal handoff and owned UX decisions on tools real people use.',
    bullets: [
      'Built and shipped multiple internal tools end-to-end (frontend + backend + deploy)',
      'Owned UX decisions on tools used daily by faculty and program staff',
      'Reviewed code and shipped reviews in tight iteration loops with senior engineers',
    ],
    tags: ['Full Stack', 'Research', 'Applied AI'],
    metrics: [
      { val: '4', label: 'tools shipped' },
      { val: '~50%', label: 'workflow time saved' },
      { val: '1y+', label: 'in role' },
    ],
    images: getExperienceImages('dii-accelerator', [
      'linear-gradient(135deg, #6dd6c2 0%, #4a8aff 60%, #2f3e3d 100%)',
      'linear-gradient(45deg, #4a8aff 0%, #6dd6c2 100%)',
      'radial-gradient(circle at 70% 30%, #6dd6c2 0%, #4a8aff 60%, #2f3e3d 100%)',
    ]),
    color: '#6dd6c2',
  },
  {
    id: 'oop-ta',
    category: 'professional',
    role: 'Head Teaching Assistant',
    organization: 'WashU Object-Oriented Programming (CSE 3302S)',
    dateRange: 'Aug 2024 – Present',
    duration: '~2y',
    pitch:
      "Leading the TA team for one of WashU's largest CS courses.",
    description:
      'Promoted from TA to Head TA after one semester. Lead a team of TAs through every course iteration — running office hours, mentoring first-time TAs, debugging student code, and building internal tooling that makes the course run smoother for everyone.',
    bullets: [
      'Promoted from TA to Head TA after one semester (May 2025)',
      'Run weekly office hours; debug 200+ student submissions per week',
      'Mentor first-time TAs through their first semester teaching',
      'Built internal grading tooling that cut TA grading time by ~40%',
    ],
    tags: ['Teaching', 'Java', 'Curriculum'],
    metrics: [
      { val: '200+', label: 'submissions / wk' },
      { val: '~40%', label: 'grading time saved' },
      { val: '4', label: 'TAs mentored' },
    ],
    images: getExperienceImages('oop-ta', [
      'linear-gradient(135deg, #f8a35c 0%, #ff8aa8 50%, #2f3e3d 100%)',
      'linear-gradient(45deg, #ffd56b 0%, #f8a35c 80%, #c44569 100%)',
      'radial-gradient(circle at 30% 70%, #f8a35c 0%, #ff8aa8 60%, #2f3e3d 100%)',
    ]),
    color: '#f8a35c',
  },
  {
    id: 'mizzou-research',
    category: 'professional',
    role: 'Research Assistant',
    organization: 'University of Missouri',
    dateRange: 'May 2024 – Aug 2024',
    duration: '3 mo',
    pitch:
      'Computational research and data analysis under a faculty advisor.',
    description:
      'First exposure to academic research workflows. Cleaned and analyzed datasets, built reproducible analysis scripts, and supported a project mixing computational and experimental work.',
    bullets: [
      'Computational + experimental work on an active research project',
      'Cleaned and analyzed datasets; built reproducible analysis scripts',
      'First exposure to academic research workflows and methods',
    ],
    tags: ['Research'],
    link: {
      href: 'https://www.biorxiv.org/content/10.1101/2024.05.06.592664v3',
      label: 'Read the published paper on bioRxiv',
    },
    images: getExperienceImages('mizzou-research', [
      'linear-gradient(135deg, #4a8aff 0%, #b362ff 50%, #2f3e3d 100%)',
      'linear-gradient(45deg, #4a8aff 0%, #b362ff 100%)',
      'radial-gradient(circle at 30% 70%, #4a8aff 0%, #b362ff 60%, #2f3e3d 100%)',
    ]),
    color: '#4a8aff',
  },
  {
    id: 'code-ninjas',
    category: 'professional',
    role: 'Code Sensei',
    organization: 'Code Ninjas',
    dateRange: 'May 2024 – Aug 2024',
    duration: '3 mo',
    pitch:
      'Taught programming fundamentals to elementary and middle-school learners.',
    description:
      'Ran code-along sessions for kids ages 7–14, paced lessons across a wide skill range, and helped young learners hit their first "aha" moment with code.',
    bullets: [
      'Designed lesson pacing across a wide range of skill levels',
      'Ran 1:1 and small-group code-along sessions',
      'Mentored beginner programmers through their first projects',
    ],
    tags: ['Teaching', 'K–12'],
    images: getExperienceImages('code-ninjas', [
      'linear-gradient(135deg, #6dd6c2 0%, #ffd56b 50%, #2f3e3d 100%)',
      'linear-gradient(45deg, #ffd56b 0%, #6dd6c2 100%)',
      'radial-gradient(circle at 70% 30%, #6dd6c2 0%, #ffd56b 60%, #2f3e3d 100%)',
    ]),
    color: '#6dd6c2',
  },

  // ============================================================
  // LEADERSHIP
  // ============================================================
  {
    id: 'wupuso',
    category: 'leadership',
    role: 'Co-President · Public Relations Chair',
    organization: 'WashU Philippine United Student Organization',
    dateRange: 'Jan 2024 – Present',
    duration: '~2y',
    pitch: "Leading WashU's Filipino-American student community.",
    description:
      'Two roles, two years. Started as PR Chair (rebuilt the brand identity, social presence, and event communication) and stepped up to Co-President of the org. Run weekly executive meetings, manage a board of officers, and own community-wide programming.',
    bullets: [
      'Led the org for a full year as Co-President',
      'Rebuilt brand identity, social presence, and event comms as PR Chair',
      'Manage a board of officers and grew membership engagement YoY',
      'Owned partnerships with WashU admin and other AAPI organizations',
    ],
    tags: ['Leadership', 'Brand', 'Community'],
    metrics: [
      { val: '2', label: 'roles in 2 years' },
      { val: 'YoY', label: 'engagement growth' },
    ],
    images: getExperienceImages('wupuso', [
      'linear-gradient(135deg, #ff8aa8 0%, #c44569 50%, #2f3e3d 100%)',
      'linear-gradient(45deg, #c44569 0%, #ff8aa8 100%)',
      'radial-gradient(circle at 30% 30%, #ff8aa8 0%, #c44569 60%, #2f3e3d 100%)',
    ]),
    color: '#ff8aa8',
  },
  {
    id: 'mfas',
    category: 'leadership',
    role: 'Treasurer',
    organization: 'Midwest Association of Filipino Americans',
    dateRange: 'Aug 2024 – Aug 2025',
    duration: '1y',
    pitch: 'Owned a $30k+ budget for a 600-person regional conference.',
    description:
      "Treasurer for the Midwest's largest Filipino-American student org. Owned the full year of finances — budgeting, vendor contracts, sponsorship reconciliation — and helped organize MFAS 2025: 600 attendees, one of the largest turnouts in the org's history.",
    bullets: [
      'Owned full-year budget, vendor payments, and sponsorship reconciliation',
      'Helped organize MFAS 2025 — 600 attendees, one of the largest in org history',
      'Closed the year with conference profit reinvested into next-gen leadership',
      'Coordinated with treasurers from member orgs across the Midwest',
    ],
    tags: ['Leadership', 'Operations', 'Events'],
    metrics: [
      { val: '$30k+', label: 'budget' },
      { val: '600', label: 'attendees' },
      { val: 'profit', label: 'closed year' },
    ],
    images: getExperienceImages('mfas', [
      'linear-gradient(135deg, #b362ff 0%, #ff8aa8 50%, #2f3e3d 100%)',
      'linear-gradient(45deg, #ff8aa8 0%, #b362ff 100%)',
      'radial-gradient(circle at 70% 30%, #b362ff 0%, #ff8aa8 60%, #2f3e3d 100%)',
    ]),
    color: '#b362ff',
  },

  // ============================================================
  // CREATIVE
  // ============================================================
  {
    id: 'tinikling',
    category: 'creative',
    role: 'Performer · Choreographer',
    organization: 'WashU Tinikling',
    dateRange: '2024 – Present',
    duration: '~2y',
    pitch:
      "Cultural dance for WashU's Filipino performance ensemble.",
    description:
      'Tinikling is a Filipino folk dance performed between rapidly-clashing bamboo poles. Performed across the region and choreographed for WashU Night Market — coordinating timing, formations, and music for a full ensemble.',
    bullets: [
      'Performed at the Saint Louis Art Museum (2026)',
      'Performed at the Cardinals AAPI Celebration at Busch Stadium (Aug 2025)',
      'Performed at WashU Lunar New Year Festival (2024, 2025) and MFAS Conference (2024, 2025)',
      'Choreographed for WashU Night Market',
    ],
    tags: ['Performance', 'Choreography', 'Cultural'],
    metrics: [
      { val: '6+', label: 'major performances' },
      { val: '2', label: 'choreographies' },
    ],
    images: getExperienceImages('tinikling', [
      'linear-gradient(135deg, #f8a35c 0%, #ff8aa8 60%, #2f3e3d 100%)',
      'linear-gradient(45deg, #ffd56b 0%, #f8a35c 80%, #c44569 100%)',
      'radial-gradient(circle at 30% 30%, #f8a35c 0%, #ff8aa8 60%, #2f3e3d 100%)',
    ]),
    color: '#f8a35c',
  },
  {
    id: 'taekwondo',
    category: 'creative',
    role: 'Sparring A-Team · Instructor · Choreographer',
    organization: 'WashU Taekwondo',
    dateRange: '2023 – Present',
    duration: '~3y',
    pitch:
      'Sparring instructor, tournament coordinator, and choreographer for cultural showcases.',
    description:
      'Coach beginner-to-A-team sparring, run tournament coordination, and choreograph performances for cultural events. Equal parts technique, timing, and stagecraft — all the same problem in different forms.',
    bullets: [
      'Sparring A-Team competitor + sparring instructor',
      'Tournament Coordinator for WashU-hosted events',
      'Performances + choreography for Lunar New Year Festival (2024, 2025)',
      'Performances + choreography for Spirit of Korea (2024, 2025)',
    ],
    tags: ['Martial Arts', 'Choreography', 'Coaching'],
    metrics: [
      { val: '3y', label: 'in club' },
      { val: 'A-Team', label: 'sparring' },
    ],
    images: getExperienceImages('taekwondo', [
      'linear-gradient(135deg, #ffd56b 0%, #f8a35c 50%, #2f3e3d 100%)',
      'linear-gradient(45deg, #f8a35c 0%, #ffd56b 100%)',
      'radial-gradient(circle at 70% 70%, #ffd56b 0%, #f8a35c 60%, #2f3e3d 100%)',
    ]),
    color: '#ffd56b',
  },

  // ============================================================
  // ENTREPRENEURSHIP
  // ============================================================
  {
    id: 'juliery-box',
    category: 'entrepreneurship',
    role: 'Founder · Owner',
    organization: 'Juliery Box',
    dateRange: '2020 – Present',
    duration: '5+ yrs',
    pitch:
      'Handmade jewelry, phone charms, and keychains. Brand → product → pricing, in that order.',
    description:
      'Designed, made, and sold handmade pieces since 2020. Pop-ups at conferences and student events. I own brand, design system, sourcing, and craftsmanship end-to-end. Five years of running a small business taught me more about pricing and brand than any class did.',
    bullets: [
      'Designed and produced jewelry, phone charms, and keychains by hand',
      'Pop-ups at MFAS, PUSO, and Midwest student events',
      'Built a small loyal customer base over 5 years of consistent making',
      'Owns brand, packaging, sourcing, and pricing strategy',
    ],
    tags: ['Brand', 'Craft', 'Small Business'],
    metrics: [
      { val: '5+', label: 'years running' },
      { val: 'Solo', label: 'design + make' },
    ],
    images: getExperienceImages('juliery-box', [
      'linear-gradient(135deg, #b362ff 0%, #ff8aa8 50%, #2f3e3d 100%)',
      'linear-gradient(45deg, #ff8aa8 0%, #b362ff 100%)',
      'radial-gradient(circle at 30% 70%, #b362ff 0%, #ff8aa8 60%, #2f3e3d 100%)',
    ]),
    color: '#b362ff',
  },
]

export const categoryLabels: Record<ExperienceCategory, string> = {
  professional: 'Professional',
  leadership: 'Leadership',
  creative: 'Creative',
  entrepreneurship: 'Entrepreneurship',
}
