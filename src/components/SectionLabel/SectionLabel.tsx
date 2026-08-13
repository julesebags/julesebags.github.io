import styles from './SectionLabel.module.css'

interface SectionLabelProps {
  /** Zero-padded ordinal shown on the left, e.g. "001". */
  index: string
  /** Section name, right-aligned. Doubles as the section's heading. */
  label: string
}

/**
 * The thin index row that heads a section: a numbered marker on the
 * left, the section name on the right. The name is the real `h2` so
 * the document outline survives the minimal treatment.
 */
export function SectionLabel({ index, label }: SectionLabelProps) {
  return (
    <div className={styles.row}>
      <span className={styles.index}>({index})</span>
      <h2 className={styles.label}>{label}</h2>
    </div>
  )
}
