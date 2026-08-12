import { getProjectImages } from '../lib/assetLoader'

export interface ProjectTech {
  /** Tool / framework / API name. Rendered as a pill. */
  name: string
  /** Short role description (e.g. "mobile app frontend"). */
  role: string
}

export interface Project {
  /**
   * Stable identifier. Also the folder name under
   * `src/assets/projects/<id>/` — drop screenshots there and they'll
   * automatically appear in this project's carousel.
   */
  id: string
  name: string
  /** Display date — e.g. "Apr 2025". Optional; renders next to the
   * "Project" eyebrow at the top of the modal when present. */
  date?: string
  /** One-line hook used as the card subtitle and modal pitch line. */
  pitch: string
  /** Short description used as a fallback when `story` isn't provided. */
  description: string
  /**
   * One-line achievement / context badge shown on the card (e.g.
   * "1st place — 2025 Google DevFest hackathon"). Renders as a small
   * accent-colored pill with a trophy icon. Takes priority over
   * `tags` and `tech` when present.
   */
  highlight?: string
  /**
   * Card-level high-level highlights — what the project IS at a glance
   * (e.g. "Generative AI", "Hackathon Winner"). NOT the tech stack.
   * Used when no `highlight` is provided. If neither is present, the
   * card falls back to displaying the tech names.
   */
  tags?: string[]
  /**
   * Tech stack. Strings render as plain pills (legacy compat). Objects
   * render as a `name → role` metadata grid in the modal so recruiters
   * can scan what each tool was used for.
   */
  tech: (string | ProjectTech)[]
  /**
   * Multi-paragraph project story shown in the modal. Each entry is
   * one paragraph. Falls back to a single-paragraph rendering of
   * `description` when omitted.
   */
  story?: string[]
  /** Bulleted list of key product / engineering features (modal). */
  features?: string[]
  /**
   * Resolved image list. Auto-populated from
   * `src/assets/projects/<id>/` when images are present; falls back to
   * gradient placeholder strings when the folder is empty.
   *
   * To swap in real screenshots: drop them into the matching folder.
   * No imports needed. See `src/assets/README.md`.
   */
  images: string[]
  repo: string
}

export const projects: Project[] = [
  {
    id: 'tailor',
    name: 'Tailor',
    date: 'Apr 2025',
    pitch:
      'An AI-powered virtual wardrobe for style discovery, outfit planning, and personalized try-on.',
    description:
      'An AI-powered virtual wardrobe for style discovery, outfit planning, and personalized try-on.',
    highlight: '1st place — 2025 Google DevFest hackathon',
    tags: ['Generative AI', 'Mobile Product', 'Hackathon Winner'],
    tech: ['React Native', 'Firebase', 'Gemini AI Flash 2.0'],
    story: [
      'I led frontend development for Tailor — an outfit visualization and discovery app — alongside three teammates at the 2025 WashU Google DevFest 24-hour Hackathon.',
      'We wanted to fix a frustration we all shared with online shopping: it’s easy to find individual pieces, but hard to picture how they work together — or how they might actually look on you.',
      'I focused on the design and feel of each page — making it intuitive to swipe through new clothes, search through your saved “closet,” and customize a profile that fed into Gemini Flash for more accurate AI try-on results. Driving these UX decisions across our 4-person team is what got us to a polished, demo-ready prototype in 24 hours.',
    ],
    features: [
      'Swipe-based clothing discovery',
      'Saved wardrobe with closet-style search',
      'Customizable profile feeding Gemini Flash for personalized try-on',
      'AI-generated outfit visualization',
      'Mobile-first product experience',
    ],
    images: getProjectImages('tailor'),
    repo: 'https://github.com/aaronhubhachen/tailor',
  },
  {
    id: 'grubu',
    name: 'GrubU',
    pitch: 'Smart campus food ordering and discovery.',
    description:
      'A real-time food discovery and ordering system optimized for campus dining. Pulls live data from every dining hall and surfaces it as one personalized answer.',
    tech: ['React', 'Node', 'Firebase'],
    images: getProjectImages('grubu', [
      'linear-gradient(135deg, #f8a35c 0%, #ff8aa8 60%, #2f3e3d 100%)',
      'linear-gradient(45deg, #ffd56b 0%, #f8a35c 80%, #c44569 100%)',
    ]),
    repo: 'https://github.com/junjpark/grubu',
  },
  {
    id: 'killerchef',
    name: 'Killer Chef',
    pitch: 'Fast-paced cooking strategy game.',
    description:
      'A timing-based action game where the chef multitasks across upgrades and progression layers. A change of medium — emphasizing game feel, sound design, and tight feedback loops.',
    tech: ['Unity', 'C#'],
    images: getProjectImages('killerchef', [
      'linear-gradient(135deg, #ffb88c 0%, #c44569 60%, #2f3e3d 100%)',
      'linear-gradient(45deg, #c44569 0%, #ffb88c 100%)',
    ]),
    repo: 'https://github.com/julesebags/killer-chef',
  },
  {
    id: 'leetcode1v1',
    name: 'LeetCode 1v1',
    date: 'Nov 2025',
    pitch:
      'A real-time platform where engineers spar through coding problems head-to-head — with live scoring, timers, and matchmaking.',
    description:
      'A real-time 1v1 competitive coding platform built on a 5-service microservices architecture.',
    tags: ['Distributed Systems', 'Real-Time', 'Microservices'],
    tech: [
      'React',
      'Supabase',
      'Azure Functions',
      'Kafka',
      'Docker',
      'Kubernetes',
    ],
    story: [
      'Existing coding platforms like LeetCode focus on solo practice — there’s no real-time way to challenge another engineer head-to-head.',
      'With three teammates, I co-built LeetCode 1v1: a platform that matches two engineers up to compete live, introducing time pressure and a real avenue to learn from how others think through problems.',
      'Live matchmaking and concurrent code execution required a scalable, event-driven cloud architecture. We split the platform into five independently deployed microservices — auth, matchmaking, code execution, scoring, and presence — so each piece could evolve and scale on its own.',
      'I implemented the code-evaluation pipeline by integrating Azure Functions with a self-hosted Judge0 cluster for concurrent submissions. Then I unblocked our 4-person team’s parallel work by establishing the Kafka schemas and interface contracts that glued the services together.',
    ],
    features: [
      'Real-time 1v1 matchmaking',
      'Live coding with shared scoring + timers',
      '5-service microservices architecture',
      'Concurrent code execution via Azure Functions + Judge0',
      'Kafka-based messaging between services',
    ],
    images: getProjectImages('leetcode1v1'),
    repo: 'https://github.com/julesebags',
  },
  {
    id: 'cory',
    name: 'Cory',
    pitch: 'Personal AI assistant for productivity and automation.',
    description:
      'A lightweight assistant that automates tasks and improves productivity workflows. Built end-to-end as a senior capstone — auth, role-based access, full deployment.',
    tech: ['AI', 'Python', 'React'],
    images: getProjectImages('cory', [
      'linear-gradient(135deg, #6dd6c2 0%, #4a8aff 60%, #2f3e3d 100%)',
      'linear-gradient(45deg, #4a8aff 0%, #6dd6c2 100%)',
    ]),
    repo: 'https://github.com/junjpark/cory',
  },
]
