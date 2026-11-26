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
 *   src/assets/experience/<experience-id>/*.{png,jpg,jpeg,webp,gif,mp4,webm}
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
 *   With `eager: true`, modules are resolved synchronously.
 *
 *   Photos go through vite-imagetools on the way (see the query on the globs below):
 *   each is resized to at most 1600px wide and re-encoded as WebP, so
 *   a 2–4 MB original ships as ~100–300 KB. The import also reports the
 *   output's width and height, which components put on the `<img>` so
 *   the browser reserves the right space before the file arrives (no
 *   layout jump). Originals in this folder are never modified.
 */

type ImageModule = { default: { src: string; width: number; height: number } }
type UrlModule = { default: string }

/*
 * The image globs below all pass the same query (Vite requires glob
 * options to be literals, so it's repeated rather than shared):
 *
 *   ?w=1600&format=webp&quality=80&as=metadata:src;width;height
 *
 * = resize (never upscale) to 1600px wide, encode as WebP, and return
 * { src, width, height }. 1600 covers the modals and close-ups at 2x;
 * tiles show them at ~520px. GIFs are left out: converting would drop
 * their animation, so they're picked up as-is by the URL-only globs.
 */

const projectModules = {
  ...import.meta.glob<ImageModule>(
    '../assets/projects/**/*.{png,jpg,jpeg,webp,avif}',
    { eager: true, query: '?w=1600&format=webp&quality=80&as=metadata:src;width;height' },
  ),
  ...import.meta.glob<UrlModule>('../assets/projects/**/*.gif', {
    eager: true,
  }),
}

/*
 * Experience folders also accept video, which the media carousel mounts
 * as a `<video>` instead of painting as a background. Only the web-safe
 * containers are picked up: a `.mov` straight off a phone is usually
 * HEVC, which Chrome and Firefox can't decode, so it has to be
 * transcoded to H.264 `.mp4` before it will appear here.
 */
const experienceModules = {
  ...import.meta.glob<ImageModule>(
    '../assets/experience/**/*.{png,jpg,jpeg,webp,avif}',
    { eager: true, query: '?w=1600&format=webp&quality=80&as=metadata:src;width;height' },
  ),
  ...import.meta.glob<UrlModule>(
    '../assets/experience/**/*.{gif,mp4,webm}',
    { eager: true },
  ),
}

const galleryModules = {
  ...import.meta.glob<ImageModule>(
    '../assets/gallery/**/*.{png,jpg,jpeg,webp,avif}',
    { eager: true, query: '?w=1600&format=webp&quality=80&as=metadata:src;width;height' },
  ),
  ...import.meta.glob<UrlModule>('../assets/gallery/**/*.gif', {
    eager: true,
  }),
}

/** Output size of every processed image, keyed by its final URL. */
const imageSizes = new Map<string, { width: number; height: number }>()

/** Final URL of a module, recording its size when it was processed. */
function urlOf(mod: ImageModule | UrlModule): string {
  const value = mod.default
  if (typeof value === 'string') return value
  imageSizes.set(value.src, { width: value.width, height: value.height })
  return value.src
}

/**
 * Pixel size of an image from the asset folders, for the `width` /
 * `height` attributes that let the browser reserve its space before it
 * loads. Undefined for gradients, videos and GIFs.
 */
export function getImageSize(
  src: string,
): { width: number; height: number } | undefined {
  return imageSizes.get(src)
}

/**
 * True for assets that need a `<video>` element rather than a
 * background image. Matches on extension because Vite rewrites these to
 * hashed URLs (and may append a query), so the tail of the string isn't
 * predictable.
 */
export function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm)(\?.*)?$/i.test(src)
}

/** True for a real image URL (vs. a CSS-gradient placeholder string). */
export function isImagePath(s: string): boolean {
  return (
    s.startsWith('/') ||
    s.startsWith('.') ||
    s.startsWith('http') ||
    s.startsWith('data:')
  )
}

/** True for the CSS-gradient placeholders used when a folder is empty. */
export function isGradient(src: string): boolean {
  return /^(linear|radial|conic)-gradient\(/.test(src.trim())
}

function pickById(
  modules: Record<string, ImageModule | UrlModule>,
  folder: string,
  id: string,
): string[] {
  const prefix = `../assets/${folder}/${id}/`
  return Object.entries(modules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => urlOf(mod))
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
