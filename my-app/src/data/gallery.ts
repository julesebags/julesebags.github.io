import { getGalleryImage } from '../lib/assetLoader'

export type GalleryCategory =
  | 'Performance'
  | 'Choreography'
  | 'Community'
  | 'Jewelry'

/**
 * Visual aspect of each tile in the masonry. Items flow into columns;
 * varying these creates the natural Pinterest-style "uneven heights"
 * rhythm where the eye is pulled down through different shapes.
 */
export type GalleryAspect =
  | 'portrait'    // 4 : 5
  | 'tall'        // 3 : 4
  | 'extraTall'   // 3 : 5
  | 'square'      // 1 : 1
  | 'landscape'   // 5 : 4

export interface GalleryItem {
  id: string
  category: GalleryCategory
  /** Short headline shown at rest. */
  title: string
  /** Sub-line under the title (date, role, venue). */
  meta: string
  /**
   * Longer description revealed on hover. Should be one sentence —
   * what it was, what it meant to me, or quick context.
   */
  description: string
  /** Tile aspect ratio — drives the natural height variation. */
  aspect?: GalleryAspect
  /**
   * Resolved image — either an imported file URL (when a photo is
   * dropped into `src/assets/gallery/<id>/`) or a CSS gradient string
   * placeholder. Auto-detected at render time.
   *
   * To swap in a real photo: drop one image into the matching folder.
   * No imports needed. See `src/assets/README.md`.
   */
  image: string
}

/**
 * Creative + community gallery. Performances, choreography, jewelry,
 * and organization moments. Replace the gradient placeholders with
 * real photos as they come in — the component handles both.
 */
export const galleryItems: GalleryItem[] = [
  // ── Tinikling ────────────────────────────────────────────────────
  {
    id: 'tinikling-mfas-2024',
    category: 'Performance',
    title: 'MFAS Conference 2024',
    meta: 'Tinikling · Spring 2024',
    description:
      'My first major Tinikling performance — danced between the bamboo poles at the Midwest Association of Filipino Americans Conference.',
    image: getGalleryImage(
      'tinikling-mfas-2024',
      'linear-gradient(135deg, #c44569 0%, #ff8aa8 50%, #f8a35c 100%)',
    ),
  },
  {
    id: 'tinikling-lnyf-2025',
    category: 'Performance',
    title: 'Lunar New Year 2025',
    meta: 'Tinikling · WashU LNYF',
    description:
      'Performed Tinikling at WashU’s Lunar New Year Festival — a packed showcase of campus AAPI cultural performance groups.',
    image: getGalleryImage(
      'tinikling-lnyf-2025',
      'linear-gradient(135deg, #ff8aa8 0%, #f8a35c 50%, #ffd56b 100%)',
    ),
  },
  {
    id: 'tinikling-lnyf-2026',
    category: 'Performance',
    title: 'Lunar New Year 2026',
    meta: 'Tinikling · WashU LNYF',
    description:
      'Returned to LNYF a second year — bigger ensemble, tighter timing, same packed audience.',
    image: getGalleryImage(
      'tinikling-lnyf-2026',
      'linear-gradient(135deg, #ffd56b 0%, #ff8aa8 60%, #c44569 100%)',
    ),
  },
  {
    id: 'cardinals-aapi',
    category: 'Performance',
    title: 'Cardinals AAPI Celebration',
    meta: 'Tinikling · Busch Stadium · Aug 2025',
    description:
      'Performed traditional Filipino bamboo dance at the St. Louis Cardinals AAPI Celebration in front of a stadium crowd.',
    aspect: 'tall',
    image: getGalleryImage(
      'cardinals-aapi',
      'linear-gradient(135deg, #c44569 0%, #ff8aa8 50%, #f8a35c 100%)',
    ),
  },
  {
    id: 'slam',
    category: 'Performance',
    title: 'Saint Louis Art Museum',
    meta: 'Tinikling · 2026',
    description:
      'Performed at SLAM as part of a cultural showcase celebrating Filipino-American heritage.',
    aspect: 'square',
    image: getGalleryImage(
      'slam',
      'linear-gradient(135deg, #2f3e3d 0%, #6dd6c2 50%, #f1efc9 100%)',
    ),
  },
  {
    id: 'night-market',
    category: 'Choreography',
    title: 'WashU Night Market',
    meta: 'Choreographer · Tinikling',
    description:
      'Choreographed and led rehearsals for the Tinikling number at WashU’s Night Market — formations, music, timing.',
    aspect: 'landscape',
    image: getGalleryImage(
      'night-market',
      'linear-gradient(160deg, #ffd56b 0%, #ff8aa8 50%, #b362ff 100%)',
    ),
  },

  // ── Taekwondo ────────────────────────────────────────────────────
  {
    id: 'taekwondo-lnyf-2024',
    category: 'Performance',
    title: 'Lunar New Year 2024',
    meta: 'WashU Taekwondo · LNYF',
    description:
      'Choreographed forms set to music for WashU Taekwondo at the Lunar New Year Festival — first year on stage with the team.',
    image: getGalleryImage(
      'taekwondo-lnyf-2024',
      'linear-gradient(135deg, #ffd56b 0%, #f8a35c 60%, #2f3e3d 100%)',
    ),
  },
  {
    id: 'taekwondo-lnyf-2026',
    category: 'Performance',
    title: 'Lunar New Year 2026',
    meta: 'WashU Taekwondo · LNYF',
    description:
      'A returning act for WashU Taekwondo at LNYF — three years in a row of cultural showcase performance.',
    image: getGalleryImage(
      'taekwondo-lnyf-2026',
      'linear-gradient(135deg, #f8a35c 0%, #ffd56b 60%, #2f3e3d 100%)',
    ),
  },
  {
    id: 'taekwondo-lnyf-2026-formation',
    category: 'Choreography',
    title: 'Circles formation',
    meta: 'Taekwondo · LNYF 2026',
    description:
      'Choreographed a circular formation for the closing of our LNYF 2026 set — formations are the part of the routine I most love designing.',
    image: getGalleryImage(
      'taekwondo-lnyf-2026-formation',
      'linear-gradient(135deg, #f8a35c 0%, #c44569 60%, #2f3e3d 100%)',
    ),
  },
  {
    id: 'taekwondo-lnyf-2026-team',
    category: 'Community',
    title: 'The team after LNYF',
    meta: 'WashU Taekwondo · 2026',
    description:
      'Group selfie with the WashU Taekwondo crew right after our LNYF 2026 set. Three years of training, performing, and choreographing with this team.',
    image: getGalleryImage(
      'taekwondo-lnyf-2026-team',
      'linear-gradient(135deg, #ffd56b 0%, #ffb88c 60%, #2f3e3d 100%)',
    ),
  },
  {
    id: 'spirit-of-korea',
    category: 'Choreography',
    title: 'Spirit of Korea',
    meta: 'Taekwondo · 2024, 2025',
    description:
      'Performed and choreographed for back-to-back Spirit of Korea showcases with WashU Taekwondo.',
    aspect: 'tall',
    image: getGalleryImage(
      'spirit-of-korea',
      'linear-gradient(135deg, #c44569 0%, #2f3e3d 100%)',
    ),
  },
  {
    id: 'sparring',
    category: 'Performance',
    title: 'Sparring A-Team',
    meta: 'WashU Taekwondo · 3+ yrs',
    description:
      'A-Team competitor and sparring instructor. Tournament coordinator for WashU-hosted events.',
    aspect: 'tall',
    image: getGalleryImage(
      'sparring',
      'linear-gradient(135deg, #ffd56b 0%, #f8a35c 60%, #2f3e3d 100%)',
    ),
  },
  {
    id: 'taekwondo-worlds',
    category: 'Performance',
    title: 'Taekwondo World Championships',
    meta: '3rd-degree black belt · 10 yrs competing',
    description:
      '8× Missouri state champion, 5× USA Midwest district champion, and 3× top-10 placer at the World Championships across 10 years of competition.',
    image: getGalleryImage(
      'taekwondo-worlds',
      'linear-gradient(135deg, #c44569 0%, #ffb88c 60%, #2f3e3d 100%)',
    ),
  },

  // ── Community ────────────────────────────────────────────────────
  {
    id: 'puso',
    category: 'Community',
    title: 'PUSO at WashU',
    meta: 'Co-President · PR Chair',
    description:
      'Two years leading WashU’s Filipino-American community — first as PR Chair, then as Co-President. Pictured: PUSO Mango Market.',
    aspect: 'portrait',
    image: getGalleryImage(
      'puso',
      'linear-gradient(135deg, #ff8aa8 0%, #c44569 50%, #2f3e3d 100%)',
    ),
  },
  {
    id: 'mfas-2025',
    category: 'Community',
    title: 'MFAS Conference 2025',
    meta: 'Treasurer · 600 attendees',
    description:
      'Owned the budget and helped organize one of the largest Midwest Filipino-American gatherings in the org’s history.',
    aspect: 'extraTall',
    image: getGalleryImage(
      'mfas-2025',
      'linear-gradient(160deg, #4a8aff 0%, #b362ff 50%, #c44569 100%)',
    ),
  },

  // ── Juliery Box ──────────────────────────────────────────────────
  {
    id: 'juliery-charms',
    category: 'Jewelry',
    title: 'Juliery Box · Charms',
    meta: 'Founder · 2020 – Present',
    description:
      'Hand-beaded phone charms made and sold since 2020. Owns brand, design, sourcing, and pricing end-to-end.',
    aspect: 'square',
    image: getGalleryImage(
      'juliery-charms',
      'radial-gradient(circle at 30% 30%, #ff8aa8 0%, #c44569 60%, #2f3e3d 100%)',
    ),
  },
  {
    id: 'juliery-popup',
    category: 'Jewelry',
    title: 'Juliery Box · Pop-ups',
    meta: 'MFAS, PUSO, regional events',
    description:
      'Five years of pop-up booths at student conferences and cultural events — brand, packaging, and craft.',
    aspect: 'extraTall',
    image: getGalleryImage(
      'juliery-popup',
      'radial-gradient(circle at 70% 30%, #f1efc9 0%, #f8e5d0 60%, #c4a47a 100%)',
    ),
  },
  {
    id: 'juliery-mfas-2025',
    category: 'Jewelry',
    title: 'MFAS 2025 pop-up',
    meta: 'Juliery Box · 600 attendees',
    description:
      'Set up a Juliery Box booth at MFAS 2025 — five years into the brand, still hand-making and selling at the same conferences I help organize.',
    image: getGalleryImage(
      'juliery-mfas-2025',
      'radial-gradient(circle at 30% 70%, #ff8aa8 0%, #c4a47a 60%, #2f3e3d 100%)',
    ),
  },
]
