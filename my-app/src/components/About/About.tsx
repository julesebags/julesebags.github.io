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
 * Replace once the report is live — Drive link, Notion page, hosted
 * PDF, etc. While `null`, the "Read the report" CTA renders disabled.
 */
const REPORT_URL: string | null = null

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
              <span className={styles.bodyStrong}>Mathematical Sciences</span>.
            </p>
            <p>
              I focus on{' '}
              <span className={styles.bodyStrong}>full-stack development</span>{' '}
              with a deep emphasis on building products that are actually{' '}
              <span className={styles.bodyStrong}>usable</span> — clear
              interfaces, fast feedback, and the small details between “this
              works” and “this feels right.”
            </p>
          </div>

          <article className={styles.feature}>
            <p className={styles.featureEyebrow}>Featured research</p>
            <h3 className={styles.featureTitle}>
              Auditing the usability of WashU Workday.
            </h3>
            <p className={styles.featureDescription}>
              Authored a research report for the{' '}
              <span className={styles.bodyStrong}>
                Provost and Vice Provost
              </span>{' '}
              of Washington University on the usability of WashU Workday — the
              university’s student information system — backed by user
              research and concrete redesign recommendations.
            </p>
            <p className={styles.featureMeta}>
              <span>WashU Provost’s Office</span>
              <span>·</span>
              <span>Independent research</span>
            </p>
            {REPORT_URL ? (
              <a
                className={styles.featureLink}
                href={REPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the report →
              </a>
            ) : (
              <span
                className={styles.featureLink}
                aria-disabled="true"
                style={{ opacity: 0.5, cursor: 'default' }}
              >
                Read the report → (coming soon)
              </span>
            )}
          </article>
        </motion.div>
      </div>
    </section>
  )
}
