import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

/**
 * Adds <link rel="preload"> for the given font files to the built
 * index.html. The fonts are imported from JS (main.tsx), so without
 * this the browser only discovers them after the CSS has loaded, and
 * the hero briefly renders in the fallback font and reflows when they
 * arrive. Build only: the dev server has no hashed file names to point at.
 */
function preloadFonts(names: string[]): Plugin {
  let base = '/'
  return {
    name: 'preload-fonts',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return []
        return Object.keys(ctx.bundle)
          .filter((file) => names.some((name) => file.includes(`/${name}-`)))
          .map((file) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              href: `${base}${file}`,
              as: 'font',
              type: 'font/woff2',
              crossorigin: '',
            },
            injectTo: 'head-prepend' as const,
          }))
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Resizes the photos in src/assets (see lib/assetLoader.ts).
    imagetools(),
    // Latin subsets only: the hero tagline (Playfair) and everything else (Jakarta).
    preloadFonts([
      'playfair-latin-opsz-normal',
      'plus-jakarta-sans-latin-wght-normal',
    ]),
  ],
})
