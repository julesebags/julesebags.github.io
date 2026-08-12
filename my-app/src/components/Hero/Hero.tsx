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

const subtitleParts = [
  'Fullstack Developer',
  'Student',
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

      <motion.p
        className={styles.tagline}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.4 }}
      >
        Building products, systems, and experiences.
      </motion.p>

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.7 }}
      >
        {subtitleParts.map((part, i) => (
          <span key={part}>
            {i > 0 && <span className={styles.dot}>•</span>}
            {part}
          </span>
        ))}
      </motion.p>


    </section>
  )
}
