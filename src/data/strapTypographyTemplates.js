/**
 * Predesigned strap typography layouts (Konva text elements + editor state).
 * Styles echo common event/credential mockups (tech conferences, festivals, sports, editorial).
 */

const FF = ['Montserrat', 'Roboto', 'Open Sans', 'Arial'];

const PATTERN_ROTATION = [
  'geo-diamonds',
  'pro-signal-grid',
  'gallery-pro-3',
  'kids-stars',
  'gallery-kids-4',
  'art-waves',
  'gallery-art-2',
  'geo-carbon',
  'tribal-lines',
  'corporate-stripe',
  'kids-zigzag',
  'art-marble',
  'gallery-pro-8',
  'gallery-kids-9',
  'gallery-art-11',
  'pro-hazard-lane',
  'art-japanese',
  'geo-herringbone',
];

const FAMILIES = [
  'Corporate & Events',
  'Tech & Startup',
  'Festival & Youth',
  'Sports & Team',
  'Healthcare & Calm',
  'Editorial & Art',
  'Hospitality & Retail',
];

const HEADLINES = [
  'NORTHSTAR',
  'SUMMIT 26',
  'RIVERA LIVE',
  'APEX CREW',
  'URBAN FEST',
  'HELIX LABS',
  'MARINA BAY',
  'CRESTLINE',
  'NOVA RUN',
  'EMBER CON',
  'SKYLINE VIP',
  'VECTOR DAY',
  'PRISM TOUR',
  'ALPINE TEAM',
  'COASTAL MED',
  'FORGE EXPO',
  'LUMEN GALA',
  'QUARTZ STAFF',
  'ORBIT DEV',
  'STELLAR ID',
  'CASCADE',
  'MIRAGE FEST',
  'TERRA PARK',
  'VOLT CREW',
  'NIMBUS AIR',
  'SOLSTICE',
  'ARCADIA',
  'BRIDGE RUN',
  'CIPHER DAY',
  'ECHO SUMMIT',
];

const SUBS = [
  'STAFF ACCESS',
  'VISITOR',
  'MEDIA PASS',
  'SECURITY',
  'VOLUNTEER',
  'SPEAKER',
  'SPONSOR',
  'CREW ONLY',
  'ALL ACCESS',
  'DAY PASS',
  'BACKSTAGE',
  'TEAM LEAD',
  'GUEST',
  'VIP LOUNGE',
  'PANELIST',
  'EXHIBITOR',
  'BOARDING',
  'PRESS',
  'COORD',
  'FIELD TEAM',
];

function hslBg(i) {
  const h = (i * 47 + 11) % 360;
  return `linear-gradient(125deg, hsl(${h}, 42%, 18%) 0%, hsl(${(h + 38) % 360}, 38%, 28%) 100%)`;
}

function textFillForStrap(hex) {
  if (!hex || hex.includes('gradient')) return '#f8fafc';
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.55 ? '#0f172a' : '#f8fafc';
}

function makeTextEl(overrides) {
  return {
    type: 'text',
    x: 0,
    y: 0,
    fontSize: 18,
    fontFamily: 'Montserrat',
    fill: '#ffffff',
    fontStyle: 'bold',
    lineHeight: 1.15,
    letterSpacing: 0,
    align: 'center',
    width: 248,
    height: 40,
    opacity: 1,
    ...overrides,
  };
}

const id = () => `tmpl-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

/**
 * Clone template strap elements with fresh ids for Konva.
 */
export function instantiateStrapTypographyElements(template) {
  const assign = (el) => ({ ...el, id: id() });
  return {
    left: (template.elements?.left || []).map(assign),
    right: (template.elements?.right || []).map(assign),
  };
}

function buildTemplate(i) {
  const fontFamily = FF[i % FF.length];
  const headline = HEADLINES[i % HEADLINES.length];
  const sub = SUBS[i % SUBS.length];
  const patternId = PATTERN_ROTATION[i % PATTERN_ROTATION.length];
  const strapColor = ['#0f172a', '#1e3a8a', '#14532d', '#9d174d', '#0e7490', '#1c1917', '#312e81', '#0b1f32', '#7c2d12', '#164e63'][i % 10];
  const fill = textFillForStrap(strapColor);
  const dual = i % 4 !== 3;
  const opacity = 0.58 + (i % 9) * 0.04;
  const fs1 = 15 + (i % 5) * 2;
  const fs2 = Math.max(10, fs1 - 5);

  const leftEls = dual
    ? [
        makeTextEl({
          content: headline,
          y: -16,
          fontSize: fs1,
          fontFamily,
          fill,
          fontStyle: i % 7 === 0 ? 'bold italic' : 'bold',
          letterSpacing: i % 6 === 0 ? 1.2 : 0.5,
          width: 260,
          height: Math.ceil(fs1 * 1.35),
        }),
        makeTextEl({
          content: sub,
          y: 14,
          fontSize: fs2,
          fontFamily,
          fill,
          fontStyle: 'bold',
          opacity: 0.92,
          width: 260,
          height: Math.ceil(fs2 * 1.4),
        }),
      ]
    : [
        makeTextEl({
          content: `${headline} · ${sub}`,
          y: 0,
          fontSize: fs1,
          fontFamily,
          fill,
          fontStyle: 'bold',
          letterSpacing: 0.4,
          width: 268,
          height: Math.ceil(fs1 * 1.4),
        }),
      ];

  const statePatch = {
    lanyardColor: strapColor,
    strapPattern: patternId,
    strapPatternOpacity: Math.min(0.92, opacity),
    fontFamily,
    fontColor: fill,
    fontSize: fs1,
    fontWeight: 'bold',
    lineHeight: 1.15,
    textAlign: 'center',
    copyMode: 'synchronized',
    lanyardDesignStyle: 'repeated',
    customTextLeft: '',
    customTextCenter: '',
    customTextRight: '',
    customTextSecondary: '',
    textOffset: 0,
    textYOffset: 0,
    textOffsetLeft: 0,
    textOffsetCenter: 0,
    textOffsetRight: 0,
    textYOffsetLeft: 0,
    textYOffsetCenter: 0,
    textYOffsetRight: 0,
  };

  return {
    id: `type-layout-${i + 1}`,
    name: dual ? `${headline} / ${sub}` : `${headline}`,
    family: FAMILIES[i % FAMILIES.length],
    preview: hslBg(i),
    caption: dual ? 'Dual-line credential layout' : 'Single-line bold lockup',
    statePatch,
    elements: {
      left: leftEls.map((e) => ({ ...e })),
      right: leftEls.map((e) => ({ ...e })),
    },
  };
}

/** 56 predesigned typography + surface pairings (editable after apply). */
export const typographyTemplates = Array.from({ length: 56 }, (_, i) => buildTemplate(i));
