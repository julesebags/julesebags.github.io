/**
 * Convention-based asset loader.
 *
 * Drop any image into the right folder and it will automatically appear
 * in the matching project / experience / gallery slot — no imports, no
 * code changes, no rebuilds beyond what Vite already does.
 *
 * ──────────────────────────────────────────────────────────────────────
 *   FOLDER CONVENTION
 * ──────────────────────────────────────────────────────────────────────
 *
 *   src/assets/projects/<project-id>/*.{png,jpg,jpeg,webp,gif}
 *   src/assets/experience/<experience-id>/*.{png,jpg,jpeg,webp,gif}
 *   src/assets/gallery/<gallery-id>/*.{png,jpg,jpeg,webp,gif}
 *
 *   Where <id> matches the `id` field in the corresponding data file
 *   (src/data/projects.ts, experience.ts, gallery.ts).
 *
 *   Files are sorted alphabetically by filename — prefix with `01_`,
 *   `02_`, etc. to control the order they appear in carousels.
 *
 * ──────────────────────────────────────────────────────────────────────
 *   FALLBACK
 * ──────────────────────────────────────────────────────────────────────
 *
 *   If a folder is empty, the helper returns the `fallback` array
 *   (typically a list of CSS gradient strings the carousel can render
 *   as placeholder backgrounds). This keeps the site looking finished
 *   even before real photos are dropped in.
 *
 * ──────────────────────────────────────────────────────────────────────
 *   HOW IT WORKS
 * ──────────────────────────────────────────────────────────────────────
 *
 *   `import.meta.glob` is a Vite-native primitive that scans the
 *   filesystem at build time and produces a map from path → module.
 *   With `eager: true`, modules are resolved synchronously and the
 *   `default` export is the final asset URL (hashed in production).
 *   That makes this both type-safe and zero-cost at runtime.
 */

const projectModules = import.meta.glob<{ default: string }>(
  '../assets/projects/**/*.{png,jpg,jpeg,webp,gif,avif}',
  { eager: true },
)

const experienceModules = import.meta.glob<{ default: string }>(
  '../assets/experience/**/*.{png,jpg,jpeg,webp,gif,avif}',
  { eager: true },
)

const galleryModules = import.meta.glob<{ default: string }>(
  '../assets/gallery/**/*.{png,jpg,jpeg,webp,gif,avif}',
  { eager: true },
)

const aboutModules = import.meta.glob<{ default: string }>(
  '../assets/about/*.{png,jpg,jpeg,webp,gif,avif}',
  { eager: true },
)

function pickById(
  modules: Record<string, { default: string }>,
  folder: string,
  id: string,
): string[] {
  const prefix = `../assets/${folder}/${id}/`
  return Object.entries(modules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default)
}

/**
 * Returns all images dropped into `src/assets/projects/<id>/`. Falls
 * back to `fallback` (gradient strings) if the folder is empty.
 */
export function getProjectImages(
  id: string,
  fallback: string[] = [],
): string[] {
  const found = pickById(projectModules, 'projects', id)
  return found.length > 0 ? found : fallback
}

/**
 * Returns all images dropped into `src/assets/experience/<id>/`. Falls
 * back to `fallback` (gradient strings) if the folder is empty.
 */
export function getExperienceImages(
  id: string,
  fallback: string[] = [],
): string[] {
  const found = pickById(experienceModules, 'experience', id)
  return found.length > 0 ? found : fallback
}

/**
 * Returns the first image dropped into `src/assets/gallery/<id>/`.
 * Gallery tiles only show one image at a time, so the rest are ignored.
 * Falls back to `fallback` (a gradient string) if the folder is empty.
 */
export function getGalleryImage(id: string, fallback: string): string {
  const found = pickById(galleryModules, 'gallery', id)
  return found[0] ?? fallback
}

/**
 * Returns the first image dropped into `src/assets/about/`. Used for
 * the headshot in the About section. Returns `null` when the folder is
 * empty, in which case the component falls back to the gradient
 * placeholder.
 */
export function getAboutPortrait(): string | null {
  const sorted = Object.entries(aboutModules).sort(([a], [b]) =>
    a.localeCompare(b),
  )
  return sorted[0]?.[1].default ?? null
}
