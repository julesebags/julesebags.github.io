import { useState } from 'react'
import type { Project } from '../../data/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import styles from './Projects.module.css'

interface ProjectsGridProps {
  projects: Project[]
}

/**
 * Owns the "selected project" state. The grid renders cards; clicking a
 * card sets it as selected, which mounts the modal. Modal close clears
 * the selection. AnimatePresence inside the modal handles the entrance
 * and exit animations cleanly.
 */
export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <>
      <div className={styles.grid}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={i}
            onOpen={setSelected}
          />
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
