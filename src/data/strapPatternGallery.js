/**
 * Extended catalog: palette-forward variants of existing procedural renders.
 * Visual language references common event-lanyard / mockup board styling (geometric, festival, editorial).
 */

const PRO_RENDERS = [
  'geometric-diamonds',
  'geometric-chevrons',
  'geometric-hexagons',
  'tribal-lines',
  'racing-stripes',
  'polka-dots',
  'grid-lines',
  'diagonal-shift',
  'carbon-fiber',
  'herringbone',
  'topographic',
  'speckle',
  'micro-grid',
  'circuit',
  'hazard-stripes',
  'pinstripes',
  'role-bands',
  'modular-nodes',
];

const KIDS_RENDERS = [
  'stars',
  'bubbles',
  'zigzag',
  'hearts',
  'confetti',
  'triangles',
  'clouds',
];

const ART_RENDERS = [
  'waves',
  'marble-swirl',
  'flames',
  'circuit',
  'seigaiha',
  'mandala',
  'floral',
  'ink',
  'leaf-silhouettes',
  'watercolor-bloom',
  'topographic',
  'herringbone',
];

function previewPro(h) {
  return `linear-gradient(135deg, hsl(${h}, 38%, 16%) 0%, hsl(${(h + 48) % 360}, 42%, 28%) 100%)`;
}

function previewKids(h) {
  return `linear-gradient(135deg, hsl(${h}, 85%, 58%) 0%, hsl(${(h + 35) % 360}, 90%, 52%) 50%, hsl(${(h + 70) % 360}, 80%, 55%) 100%)`;
}

function previewArt(h) {
  return `linear-gradient(160deg, hsl(${h}, 45%, 22%) 0%, hsl(${(h + 55) % 360}, 55%, 38%) 55%, hsl(${(h + 110) % 360}, 40%, 18%) 100%)`;
}

function tonesProfessional(seed) {
  const h = (seed * 37) % 360;
  return [
    `hsla(${(h + 20) % 360}, 35%, 92%, 0.22)`,
    `hsla(${(h + 200) % 360}, 25%, 40%, 0.12)`,
    `rgba(255,255,255,0.08)`,
  ];
}

function tonesKids(seed) {
  const palette = ['#fbbf24', '#f472b6', '#60a5fa', '#34d399', '#a78bfa', '#fb7185', '#f97316'];
  const a = palette[seed % palette.length];
  const b = palette[(seed + 2) % palette.length];
  const c = palette[(seed + 4) % palette.length];
  return [a, b, c, palette[(seed + 1) % palette.length]];
}

function tonesArtistic(seed) {
  const h = (seed * 41 + 10) % 360;
  return [
    `hsla(${h}, 70%, 72%, 0.28)`,
    `hsla(${(h + 80) % 360}, 55%, 45%, 0.18)`,
    `rgba(255,255,255,0.12)`,
  ];
}

const PRO_NAMES = [
  'Arctic Boardroom',
  'Harbor Slate',
  'Signal Navy',
  'Carbon Summit',
  'Metro Grid',
  'Vertex Indigo',
  'Steel Chevron',
  'Quiet Pinstripe',
  'Tactical Amber',
  'Circuit Frost',
  'Obsidian Weave',
  'Glacier Line',
  'Ink Microgrid',
  'Atlas Stripe',
  'Cipher Hex',
  'Monolith Dot',
  'Polar Shift',
  'Sable Ridge',
  'Civic Band',
  'Orbit Node',
  'Quarry Speckle',
  'Lumen Hazard',
  'Baltic Contour',
  'Studio Role',
];

const KIDS_NAMES = [
  'Candy Comet',
  'Bubble Circus',
  'Zigzag Carnival',
  'Heart Parade',
  'Confetti Pop',
  'Triangle Jam',
  'Cloud Parade',
  'Starburst Pop',
  'Neon Splash',
  'Rainbow Dash',
  'Fizz Party',
  'Sprinkle Joy',
  'Laser Tag Fun',
  'Birthday Burst',
  'Playground Sky',
  'Gummy Wave',
  'Sticker Stack',
  'Doodle Bright',
  'Popsicle Stripe',
  'Sunbeam Spark',
];

const ART_NAMES = [
  'Ink Wash',
  'Seigaiha Dusk',
  'Marble Veil',
  'Floral Ember',
  'Leaf Canopy',
  'Mandala Mist',
  'Wave Studio',
  'Circuit Garden',
  'Contour Drift',
  'Watercolor Haze',
  'Ombre Tide',
  'Copper Patina',
  'Lilac Editorial',
  'Sage Abstract',
  'Crimson Bloom',
  'Teal Atelier',
  'Amber Sketch',
  'Moonlit Weave',
];

const INSPIRATION_FAMILIES = [
  'Corporate & Events',
  'Tech & Startup',
  'Healthcare & Calm',
  'Festival & Youth',
  'Sports & Team',
  'Hospitality & Retail',
  'Editorial & Art',
  'Minimalist & Tonal',
  'Techwear & EDC',
  'Organic & Abstract',
];

const INSPIRATION_NOTES = [
  'Crisp conference passes with restrained contrast and readable branding zones.',
  'Bright wayfinding energy inspired by festival wristbands and youth camps.',
  'Soft editorial washes that pair with serif logos and muted photography.',
  'High-contrast utility cues for crew, safety, and backstage visibility.',
  'Tonal luxury suitable for galas, member clubs, and premium launches.',
  'Playful gradients that read well on merch tables and school events.',
  'Cool neutrals for hospital, lab, and wellness programs.',
  'Athletic rhythm stripes with team-color flexibility.',
  'Dark-base tech styling with luminous accent threads.',
  'Botanical calm for sustainability and outdoor brand stories.',
];

function strapColorForInspiration(i) {
  const colors = [
    '#0f172a',
    '#1e3a8a',
    '#14532d',
    '#9d174d',
    '#0e7490',
    '#fef3c7',
    '#ecfdf5',
    '#312e81',
    '#171717',
    '#fff7ed',
    '#f8fafc',
    '#1c1917',
    '#e0f2fe',
    '#fce7f3',
    '#ede9fe',
  ];
  return colors[i % colors.length];
}

function swatchesForInspiration(base, i) {
  const accents = ['#5d5fef', '#f59e0b', '#10b981', '#f43f5e', '#38bdf8', '#a78bfa', '#94a3b8'];
  return [base, accents[i % accents.length], '#cbd5e1'];
}

export const galleryStrapPatterns = [
  ...PRO_NAMES.map((name, i) => ({
    id: `gallery-pro-${i + 1}`,
    name,
    category: 'professional',
    description: 'Gallery variant tuned for corporate and event branding.',
    preview: previewPro((i * 29) % 360),
    render: PRO_RENDERS[i % PRO_RENDERS.length],
    patternColors: tonesProfessional(i + 3),
  })),
  ...KIDS_NAMES.map((name, i) => ({
    id: `gallery-kids-${i + 1}`,
    name,
    category: 'kids',
    description: 'Gallery variant with playful color energy.',
    preview: previewKids((i * 31 + 12) % 360),
    render: KIDS_RENDERS[i % KIDS_RENDERS.length],
    patternColors: tonesKids(i + 5),
  })),
  ...ART_NAMES.map((name, i) => ({
    id: `gallery-art-${i + 1}`,
    name,
    category: 'artistic',
    description: 'Gallery variant with expressive, editorial surface character.',
    preview: previewArt((i * 33 + 7) % 360),
    render: ART_RENDERS[i % ART_RENDERS.length],
    patternColors: tonesArtistic(i + 8),
  })),
];

/** Curated looks (strap color + intensity); subset of the gallery so the list stays scannable. */
export const galleryInspirationPresets = galleryStrapPatterns.slice(0, 45).map((p, i) => {
  const strapColor = strapColorForInspiration(i);
  const opacity = 0.62 + (i % 8) * 0.04;
  return {
    id: `insp-gallery-${i + 1}`,
    name: p.name,
    family: INSPIRATION_FAMILIES[i % INSPIRATION_FAMILIES.length],
    inspiration: INSPIRATION_NOTES[i % INSPIRATION_NOTES.length],
    strapColor,
    patternId: p.id,
    strapPatternOpacity: Math.min(0.92, opacity),
    preview: p.preview,
    swatches: swatchesForInspiration(strapColor, i),
  };
});
