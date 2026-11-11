import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import fullNameAscii from '../../assets/fullname.txt?raw'
import { useScrambledAscii } from '../../hooks/useScrambledAscii'
import styles from './Hero.module.css'

interface HeroProps {
  /**
   * Kept for API compatibility with the parent — Hero no longer
   * renders inline CTAs but the prop stays in place so a future
   * "scroll to" button can be re-added without touching App.tsx.
   */
  onScrollTo?: (id: string) => void
}

/**
 * Charset the hero ASCII settles into. A curated set of terminal /
 * source-code glyphs chosen to feel computational without becoming
 * noise. The animation passes through any of these mid-flight as
 * well, so the whole thing reads as code/terminal output rather than
 * craft/stitched typography.
 */
const TERMINAL_CHARSET = '/\\{}<>*#$%&|~=+;:[]()'

/**
 * The ASCII file carries blank padding rows/columns around the letters.
 * Strip it so the name can sit inline like a word, and work out how
 * many rows hang below the letters' baseline (the "g" descender) so the
 * tagline can line up with that baseline instead of the art's bottom.
 *
 * Baseline = the last row with at least 40% as many inked characters
 * as the busiest row. Rows below it only hold descender tails (J, g),
 * which are sparse even when they sit far apart. Everything from the top
 * row down to it is the tallest letter's height, which the CSS uses to
 * size the art to match the text.
 */
function prepareName(raw: string) {
  const lines = raw.replace(/\s+$/, '').split('\n')
  const inked = (l: string) => l.trim().length > 0
  const first = lines.findIndex(inked)
  const rows = lines.slice(first).map((l) => l.replace(/\s+$/, ''))
  const indent = Math.min(
    ...rows.filter(inked).map((l) => l.length - l.trimStart().length),
  )
  const trimmed = rows.map((l) => l.slice(indent))
  const ink = (l: string) => l.replace(/\s/g, '').length
  const busiest = Math.max(...trimmed.map(ink))
  let baseline = 0
  trimmed.forEach((l, i) => {
    if (ink(l) >= busiest * 0.4) baseline = i
  })
  return {
    art: trimmed.join('\n'),
    /** Rows from the top of the tallest letter down to the baseline. */
    capRows: baseline + 1,
    descenderRows: trimmed.length - 1 - baseline,
  }
}

const NAME = prepareName(fullNameAscii)

/**
 * Continues the name as one sentence: "Julie Baguio is a …". Split in
 * two so the line always breaks after "engineer".
 */
const TAGLINE = [
  'is a software engineer',
  'who builds seamless digital experiences.',
]
// Alternatives:
//   'is a software engineer who builds products that feel right to use.'
//   'is a software engineer who makes complex systems feel simple to use.'

interface Role {
  verb: string
  org: string
}

/** Vertical list under the tagline: what she's doing now, then before. */
const CURRENT: Role[] = [
  {
    verb: 'AI/ML Student abroad',
    org: 'The Hong Kong University of Science and Technology',
  },
  {
    verb: 'CS & Math May 2027 Grad',
    org: 'Washington University in St. Louis',
  },
]
const PREVIOUS: Role[] = [
  { verb: 'SWE', org: 'Mastercard' },
  { verb: 'SWE', org: 'WashU Di2' },
  {
    verb: 'Head Teaching Assistant',
    org: 'Washington University in St. Louis',
  },
]

function RoleGroup({ label, roles }: { label: string; roles: Role[] }) {
  return (
    <div className={styles.group}>
      <p className={styles.groupLabel}>{label}</p>
      <ul className={styles.roles}>
        {roles.map(({ verb, org }) => (
          <li key={`${verb}-${org}`}>
            {verb} <span className={styles.at}>@</span>{' '}
            <span className={styles.org}>{org}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Hero / identity anchor. The ASCII name is the centerpiece — slightly
 * sized down from the original so subtitle and CTAs sit comfortably
 * above the fold. The settle animation lands on a random arrangement
 * of terminal characters so the silhouette reads as code.
 */
export function Hero(_props: HeroProps) {
  const animatedFullName = useScrambledAscii(NAME.art, {
    mode: 'settle',
    settleMs: 2500,
    settleCharset: TERMINAL_CHARSET,
  })

  return (
    <section id="hero" className={styles.hero}>

      {/* One sentence: the ASCII name sits inline as the first "word"
       * and the tagline flows after it, wrapping like normal text. */}
      <h1 className={styles.statement}>
        <span
          className={styles.asciiName}
          aria-hidden="true"
          style={
            {
              '--cap-rows': NAME.capRows,
              '--descender-rows': NAME.descenderRows,
            } as CSSProperties
          }
        >
          {animatedFullName}
        </span>
        <span className={styles.srOnly}>Julie Baguio</span>{' '}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {TAGLINE[0]}
          <br />
          {TAGLINE[1]}
        </motion.span>
      </h1>

      <motion.div
        className={styles.roleList}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.6 }}
      >
        <RoleGroup label="Current" roles={CURRENT} />
        <RoleGroup label="Previous" roles={PREVIOUS} />
      </motion.div>


    </section>
  )
}
