import { useEffect, useState } from 'react'
import { GITHUB, LINKEDIN } from '../../data/socials'
import { Ginger } from '../Ginger/Ginger'
import { GithubIcon, LinkedinIcon } from '../icons/BrandIcons'
import styles from './Navbar.module.css'

interface NavLink {
  label: string
  targetId: string
  /** If true, hidden on very narrow screens to keep the bar uncluttered. */
  secondary?: boolean
}

const links: NavLink[] = [
  { label: 'About', targetId: 'about' },
  { label: 'Work', targetId: 'projects' },
  { label: 'Experience', targetId: 'experience' },
  { label: 'Skills', targetId: 'skills', secondary: true },
  { label: 'Beyond', targetId: 'gallery', secondary: true },
  { label: 'Contact', targetId: 'footer' },
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.brandBlock}>
        <a
          href="#hero"
          className={styles.brand}
          aria-label="Julie Baguio — back to top"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('hero')
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
        </div>
      </div>
      <div className={styles.links}>
        {links.map((link) => (
          <button
            key={link.targetId}
            type="button"
            className={`${styles.link} ${link.secondary ? styles.secondary : ''}`}
            onClick={() => scrollTo(link.targetId)}
          >
            {link.label}
          </button>
        ))}
      </div>
      <Ginger />
    </nav>
  )
}
