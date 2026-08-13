import { motion } from 'framer-motion'
import styles from './About.module.css'

/**
 * Drop a real portrait at `src/assets/portrait.jpg` (or .png) and
 * uncomment the import below — the gradient placeholder is replaced
 * automatically. Square-ish or 4:5 portrait crops look best.
 */
import { getAboutPortrait } from '../../lib/assetLoader'

// Auto-loaded from `src/assets/about/`. Drop a single headshot into
// that folder (jpg/png/webp) and it shows up here. See
// `src/assets/README.md`.
const portraitImg = getAboutPortrait()

/**
 * Featured research PDF, hosted on Google Drive.
 */
const REPORT_URL =
  'https://drive.google.com/file/d/1apKzC-JMYunYYcZB5YaZp0U2hE9EQkFq/view?usp=sharing'

export function About() {
  const photoStyle = portraitImg
    ? { ['--portrait-image' as string]: `url(${portraitImg})` }
    : undefined

  return (
    <section id="about" className={styles.section}>
      <div className={styles.layout}>
        <motion.div
          className={styles.photoCol}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className={styles.photo} style={photoStyle} />
          <p className={styles.photoCaption}>
            <span>Julie Baguio</span>
            <span>Columbia, MO</span>
          </p>
        </motion.div>

        <motion.div
          className={styles.bodyCol}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className={styles.eyebrow}>About</p>
          <h2 className={styles.title}>
            Hi! I'm <span className={styles.titleAccent}>Julie Baguio.</span>
          </h2>

          <div className={styles.body}>
            <p>
              I’m a{' '}
              <span className={styles.bodyStrong}>rising senior</span> at{' '}
              <span className={styles.bodyStrong}>
                Washington University in St. Louis
              </span>
              , double-majoring in{' '}
              <span className={styles.bodyStrong}>Computer Science</span> and{' '}
              <span className={styles.bodyStrong}>Mathematical Sciences</span>,
              graduating{' '}
              <span className={styles.bodyStrong}>May 2027</span>.
            </p>
            <p>
              I build as a{' '}
              <span className={styles.bodyStrong}>full-stack developer</span>{' '}
              with one throughline: software is only as useful as it is{' '}
              <span className={styles.bodyStrong}>usable</span>. That means
              clear interfaces and fast feedback for the people on the other
              side of the screen — and systems that fellow developers can
              actually understand, extend, and ship against. If it doesn’t feel
              right to use, it doesn’t fully work.
            </p>
          </div>

          <article className={styles.feature}>
            <p className={styles.featureEyebrow}>Featured research</p>
            <h3 className={styles.featureTitle}>
              Auditing the usability of WashU Workday.
            </h3>
            <p className={styles.featureDescription}>
              A usability audit of WashU Workday for the Provost’s Office —
              user research and redesign recommendations for the university’s
              student information system.
            </p>
            <a
              className={styles.featureLink}
              href={REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the report →
            </a>
          </article>
        </motion.div>
      </div>
    </section>
  )
}
