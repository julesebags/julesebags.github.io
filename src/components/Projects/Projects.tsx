import { projects } from '../../data/projects'
import { SectionLabel } from '../SectionLabel/SectionLabel'
import { ProjectsGrid } from './ProjectsGrid'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <SectionLabel index="001" label="Selected Work" />
      <ProjectsGrid projects={projects} />
    </section>
  )
}
