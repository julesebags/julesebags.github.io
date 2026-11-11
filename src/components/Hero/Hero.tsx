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

/** Definition-style line that follows the name. */
const TAGLINE =
  'is a full-stack engineer building software that’s as usable as it is useful.'

interface Role {
  verb: string
  org: string
}

/** Two columns under the tagline: what she's doing now vs. before. */
const CURRENTLY: Role[] = [{ verb: 'Studying AI/ML', org: 'HKUST' }]
const PREVIOUSLY: Role[] = [
  { verb: 'Engineered', org: 'Mastercard' },
  { verb: 'Engineered', org: 'WashU' },
  { verb: 'Taught CS', org: 'WashU' },
]

function RoleColumn({ label, roles }: { label: string; roles: Role[] }) {
  return (
    <div className={styles.column}>
      <p className={styles.columnLabel}>{label}</p>
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
  const animatedFullName = useScrambledAscii(fullNameAscii, {
    mode: 'settle',
    settleMs: 2500,
    settleCharset: TERMINAL_CHARSET,
  })

  return (
    <section id="hero" className={styles.hero}>

      <h1 className={styles.asciiName} aria-label="Julie Baguio">
        <pre aria-hidden="true">{animatedFullName}</pre>
      </h1>

      <motion.p
        className={styles.tagline}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
      >
        {TAGLINE}
      </motion.p>

      <motion.div
        className={styles.columns}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.6 }}
      >
        <RoleColumn label="Currently" roles={CURRENTLY} />
        <div className={styles.divider} aria-hidden="true" />
        <RoleColumn label="Previously" roles={PREVIOUSLY} />
      </motion.div>


    </section>
  )
}
