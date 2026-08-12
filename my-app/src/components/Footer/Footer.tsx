import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons'
import styles from './Footer.module.css'

const EMAIL = 'julie.baguio@example.com' // replace with real email
const LINKEDIN = 'https://www.linkedin.com/in/julie-baguio/'
const GITHUB = 'https://github.com/julesebags'

export function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.headline}>
            Want to <span className={styles.accent}>build</span> something
            together?
          </h2>
          <a className={styles.email} href={`mailto:${EMAIL}`}>
            <Mail size={18} strokeWidth={1.75} />
            {EMAIL}
          </a>
        </div>

        <div className={styles.linksColumn}>
          <div>
            <p className={styles.linksLabel}>Elsewhere</p>
            <ul className={styles.socialList}>
              <li>
                <a
                  className={styles.socialLink}
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (opens in new tab)"
                >
                  <LinkedinIcon className={styles.socialIcon} size={18} />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className={styles.socialLink}
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub (opens in new tab)"
                >
                  <GithubIcon className={styles.socialIcon} size={18} />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.copy}>
        <span>© {new Date().getFullYear()} Julie Baguio</span>
        <span className={styles.copyMeta}>Built with care in St. Louis</span>
      </div>
    </footer>
  )
}
