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

/** One line per thing she's doing / has done, rendered as "role @ org". */
const highlights = [
  { role: 'Studying AI/ML', org: 'HKUST' },
  { role: 'Engineered', org: 'Mastercard' },
  { role: 'Engineering', org: 'WashU' },
  { role: 'Head CS Teaching Assistant', org: 'WashU' },
]

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

      <ul className={styles.highlights}>
        {highlights.map(({ role, org }, i) => (
          <motion.li
            key={`${role}-${org}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 + i * 0.12 }}
          >
            {role} <span className={styles.at}>@</span>{' '}
            <span className={styles.org}>{org}</span>
          </motion.li>
        ))}
      </ul>


    </section>
  )
}
