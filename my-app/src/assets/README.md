# Assets — drop-in image system

Drop a photo into the right folder and it will automatically appear in
the matching slot on the website. **No imports, no edits to data files,
nothing else to do.**

## Folder layout

```
src/assets/
├── about/             ← drop your headshot here (one image)
│
├── projects/
│   ├── tailor/        ← Tailor screenshots
│   ├── grubu/         ← GrubU screenshots
│   ├── killerchef/    ← Killer Chef gameplay shots
│   ├── leetcode1v1/   ← LeetCode 1v1 architecture / UI
│   └── cory/          ← Cory screenshots
│
├── experience/
│   ├── mastercard/        ← Mastercard photos
│   ├── dii-accelerator/   ← WashU DIAA
│   ├── oop-ta/            ← Head TA
│   ├── mizzou-research/   ← Mizzou research
│   ├── code-ninjas/       ← Code Ninjas
│   ├── wupuso/            ← PUSO leadership
│   ├── mfas/              ← MFAS treasurer
│   ├── tinikling/         ← WashU Tinikling
│   ├── taekwondo/         ← WashU Taekwondo
│   └── juliery-box/       ← Juliery Box
│
└── gallery/
    ├── cardinals-aapi/    ← Cardinals AAPI Celebration
    ├── mfas-2025/         ← MFAS 2025 Conference
    ├── slam/              ← Saint Louis Art Museum
    ├── lunar-new-year/    ← WashU Lunar New Year
    ├── night-market/      ← WashU Night Market
    ├── spirit-of-korea/   ← Spirit of Korea
    ├── juliery-charms/    ← Juliery Box charms
    ├── juliery-popup/     ← Juliery Box pop-ups
    ├── puso/              ← PUSO at WashU
    └── sparring/          ← Taekwondo sparring
```

## Rules

1. **Filename → order.** Files are sorted alphabetically. Prefix with
   `01_`, `02_`, `03_`, etc. to force a specific carousel order.
   Example: `01_hero.jpg`, `02_team.jpg`, `03_demo.png`.
2. **Supported formats:** `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`,
   `.avif`. JPEG is best for photos; PNG for screenshots / diagrams.
3. **Keep files under ~500KB.** Resize anything 2000px-wide or larger
   down to 1440px. On macOS:
   ```bash
   sips -Z 1440 path/to/image.png --out path/to/image.png
   ```
4. **Gallery folders only show the first image.** Drop one hero image
   per gallery item. Extras in the same folder are ignored. Same goes
   for `about/` — only the first image is used as the headshot.
5. **Empty folders are safe.** If a folder has no images, the site
   falls back to the existing gradient placeholder. The site never
   breaks because of missing photos.

## Adding a brand-new project / experience / gallery item

If you want to add a *new* entry that doesn't exist yet:

1. Add it to the matching data file (`src/data/projects.ts`,
   `experience.ts`, or `gallery.ts`) with a unique `id`.
2. Create a folder named exactly that `id` under the right asset
   folder (e.g. `src/assets/projects/my-new-app/`).
3. Drop in your images. Done.

## How this works under the hood

`src/lib/assetLoader.ts` uses Vite's `import.meta.glob` to scan these
folders at build time. The `getProjectImages(id, fallback)`,
`getExperienceImages(id, fallback)`, and `getGalleryImage(id, fallback)`
helpers do the lookup and return either the real images or the gradient
fallback. The data files call those helpers — no manual `import`
statements needed per asset.
