import { projects } from '../../data/projects'
import { ProjectsGrid } from './ProjectsGrid'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <h2 className="sr-only">Projects</h2>
      <ProjectsGrid projects={projects} />
    </section>
  )
}
