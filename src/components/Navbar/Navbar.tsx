import { useEffect, useState } from 'react'
import { navigate, useRoute, type Page } from '../../lib/route'
import { Mail } from 'lucide-react'
import { EMAIL, GITHUB, LINKEDIN } from '../../data/socials'
import { Ginger } from '../Ginger/Ginger'
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons'
import styles from './Navbar.module.css'

interface NavLink {
  label: string
  /** Hash path it goes to (see lib/route.ts). */
  path: string
  /** The page it belongs to, for highlighting the current one. */
  page: Page
  /** If true, hidden on very narrow screens to keep the bar uncluttered. */
  secondary?: boolean
}

// Experience lives on the home page; Projects and Beyond are their own pages.
const links: NavLink[] = [
  { label: 'Experience', path: '/experience', page: 'home' },
  { label: 'Projects', path: '/projects', page: 'projects' },
  { label: 'Beyond', path: '/beyond', page: 'beyond' },
]

/**
 * Fixed nav rail down the left edge, with Ginger anchored at the foot of
 * it. On narrow viewports it collapses to a horizontal top bar, and only
 * then does the `scrolled` state matter — that layout is the one where
 * content passes underneath and needs a blurred backdrop for legibility.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const route = useRoute()

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.brandBlock}>
        <a
          href="#/"
          className={styles.brand}
          aria-label="Julie Baguio — home"
          onClick={(e) => {
            e.preventDefault()
            navigate('/')
          }}
        >
          Julie Baguio
        </a>
        <div className={styles.socials}>
          <a
            className={styles.social}
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in new tab)"
          >
            <LinkedinIcon size={17} />
          </a>
          <a
            className={styles.social}
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in new tab)"
          >
            <GithubIcon size={17} />
          </a>
          <a
            className={styles.social}
            href={`mailto:${EMAIL}`}
            aria-label={`Email ${EMAIL}`}
            title={EMAIL}
          >
            <Mail size={18} strokeWidth={2} />
          </a>
        </div>
      </div>
      <div className={styles.links}>
        {links.map((link) => {
          const current = route.page === link.page
          return (
            <a
              key={link.path}
              href={`#${link.path}`}
              className={`${styles.link} ${current ? styles.linkActive : ''} ${
                link.secondary ? styles.secondary : ''
              }`}
              aria-current={current ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault()
                navigate(link.path)
              }}
            >
              {link.label}
            </a>
          )
        })}
      </div>
      <Ginger />
    </nav>
  )
}
