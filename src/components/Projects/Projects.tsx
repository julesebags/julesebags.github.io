import { projects } from '../../data/projects'
import { ProjectsGrid } from './ProjectsGrid'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Projects</p>
          <h2 className={styles.title}>
            Things I’ve <span className={styles.titleAccent}>built</span>.
          </h2>
        </div>
      </header>

      <ProjectsGrid projects={projects} />
    </section>
  )
}
