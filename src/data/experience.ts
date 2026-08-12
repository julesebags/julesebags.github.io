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
    id: 'proximity',
    category: 'professional',
    role: 'Contract Software Engineer',
    organization: 'Proximity',
    dateRange: 'Jun 2026 – Present',
    duration: 'Ongoing',
    pitch:
      'Full-stack engineer on a WashU off-campus housing marketplace serving 300+ users.',
    description:
      'One of four engineers on Proximity — a marketplace for the WashU off-campus housing market. Shipping full-stack features from database up to UI, and building the internal tooling that keeps a small team moving fast.',
    bullets: [
      'Ship full-stack features supporting 300+ active users and $500K+ in facilitated lease value across 42+ signed leases',
      'Own the end-to-end messaging system: live delivery via Supabase Realtime, hover-based prefetch for near-instant conversation loads, and email notifications with deep links',
    ],
    tags: ['Full Stack', 'Supabase', 'Realtime', 'MCP'],
    metrics: [
      { val: '300+', label: 'active users' },
      { val: '$500K+', label: 'lease value' },
      { val: '42+', label: 'signed leases' },
    ],
    images: getExperienceImages('proximity', [
      'linear-gradient(135deg, #b362ff 0%, #ff8aa8 50%, #2f3e3d 100%)',
      'linear-gradient(45deg, #ff8aa8 0%, #b362ff 100%)',
      'radial-gradient(circle at 30% 30%, #b362ff 0%, #ff8aa8 60%, #2f3e3d 100%)',
    ]),
    color: '#b362ff',
  },
  {
    id: 'mastercard',
    category: 'professional',
    role: 'Software Engineering Intern',
    organization: 'Mastercard',
    dateRange: 'Jun 2026 – Aug 2026',
    duration: '3 mo',
    pitch:
      'Full-stack + platform engineering on Mastercard Transaction Streams.',
    description:
      "SWE intern on the Mastercard Transaction Streams team in O'Fallon, MO. Shipped internal developer tooling, production mappings on the payments transaction pipeline, and rotated onto the team's deployment engineering.",
    bullets: [
      "Built MCP Manager — an internal FastAPI + React app that automates MCP/Skill setup to 1 step; engineered a plugin system driven by a single config file; served as Scrum Master for 8 devs and led the live demo for Mastercard's CTO",
      'Implemented and shipped 4 new mappings to a production system for translating payment transaction data; wrote a POC that generates QE test inputs from Jira story requirements',
      'Eliminated a transaction-classification dependency that rippled to downstream teams by shipping a Java + Spring Boot local-override system — cut a 5-step, multi-repo process to 2 steps in a single repo',
      'Deployed 12 services as one of 5 rotating engineers on the Transaction Streams deploy team',
    ],
    tags: ['FastAPI', 'React', 'Spring Boot', 'Java', 'Payments'],
    metrics: [
      { val: '12', label: 'services deployed' },
      { val: '4', label: 'prod mappings' },
      { val: 'CTO', label: 'demo led' },
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
      "Built the People's Voice Survey Dashboard — an interactive public health tool used by 300+ researchers.",
    description:
      "Full-stack engineer at the WashU DIAA on the People's Voice Survey (PVS) Dashboard — an interactive public health visualization tool used by 300+ researchers and policymakers to explore survey data across 20+ countries. Presented at the 2025 Science for Health Systems Conference.",
    bullets: [
      'Built an interactive public health dashboard for 300+ researchers and policymakers, presented at the 2025 Science for Health Systems Conference',
      'Translated ambiguous requirements into intuitive user flows through weekly client reviews with domain researchers',
      'Cut filter-load times for visualizing 60.2K+ records across 20+ countries to under 1 second',
      'Reduced payload size by 95%+ through caching, response compression, scoped queries, and connection pooling',
    ],
    tags: ['React', 'Mapbox', 'FastAPI', 'Supabase', 'AWS', 'Figma'],
    metrics: [
      { val: '300+', label: 'researchers served' },
      { val: '60.2K+', label: 'records visualized' },
      { val: '20+', label: 'countries' },
      { val: '<1s', label: 'filter load' },
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
    organization:
      'Washington University in St. Louis · Object-Oriented Programming',
    dateRange: 'Aug 2024 – May 2026',
    duration: '~2y',
    pitch:
      'Head TA for Object-Oriented Programming — mentored 250+ students and led a team of 30+ TAs.',
    description:
      "Led the TA team for WashU's Object-Oriented Programming course across four semesters. Owned grading operations for 700+ submissions/semester and shaped how a large TA team taught C++, memory management, and object-oriented design.",
    bullets: [
      'Strengthened grading consistency across 30+ TAs and 700+ submissions/semester by restructuring rubrics into a simple flow, automating grading distribution by conflict of interest, and launching a grading-calibration system',
      'Mentored 250+ students in C++, memory management, and object-oriented design across studios and office hours',
    ],
    tags: ['Teaching', 'C++', 'OOP', 'Curriculum'],
    metrics: [
      { val: '250+', label: 'students mentored' },
      { val: '30+', label: 'TAs led' },
      { val: '700+', label: 'submissions / sem' },
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
    pitch: 'Undergraduate research contributor — published on bioRxiv.',
    description:
      'Summer research assistant at Mizzou. Contributed to a project whose work is now available as a preprint on bioRxiv.',
    bullets: [
      'Contributed to a research project resulting in a published bioRxiv preprint',
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
    role: 'Choreographer · Instructor',
    organization: 'WashU Taekwondo',
    dateRange: 'Aug 2023 – Feb 2026',
    duration: '~2.5y',
    pitch:
      'Choreographer for cultural showcases; sparring instructor and tournament coordinator on the side.',
    description:
      'Led choreography for WashU Taekwondo across two-and-a-half years of cultural showcases. Ran 15+ hrs/wk of planning and practices for a 16-person performance team, and coached sparring on the side. Equal parts technique, timing, and stagecraft — the same design problem in different forms.',
    bullets: [
      'Led 15+ hrs/wk of planning and practices for a 16-person performance team',
      'Performed in 15+ shows for 3000+ total attendees',
      'Choreographed for Lunar New Year Festival (2024, 2025, 2026) and Spirit of Korea (2024, 2025)',
      'Sparring instructor and tournament coordinator for WashU-hosted events',
    ],
    tags: ['Choreography', 'Martial Arts', 'Coaching'],
    metrics: [
      { val: '15+', label: 'shows' },
      { val: '16', label: 'team size' },
      { val: '3000+', label: 'attendees' },
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
    dateRange: 'Jan 2020 – Present',
    duration: '5+ yrs',
    pitch:
      'Handmade jewelry business — $3,500+ in sales across 25+ states through Depop and local events.',
    description:
      'Designed, made, and sold handmade pieces since 2020. I own brand, design, sourcing, pricing, and fulfillment end-to-end. Five years of running a small business has taught me more about pricing and brand than any class did.',
    bullets: [
      '$3,500+ in sales across 25+ states through Depop and local events',
      'Designed and produced jewelry, phone charms, and keychains by hand',
      'Pop-ups at MFAS, PUSO, and Midwest student events',
      'Owns brand, packaging, sourcing, and pricing strategy',
    ],
    tags: ['Brand', 'Craft', 'Depop', 'Small Business'],
    metrics: [
      { val: '$3.5K+', label: 'in sales' },
      { val: '25+', label: 'states shipped' },
      { val: '5+', label: 'years running' },
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
