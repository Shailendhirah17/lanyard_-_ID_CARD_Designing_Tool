// CR-80 Standard: 85.6mm × 53.98mm (credit card size)
// At ~3.15 px/mm → 270 × 170 px (aspect ratio 1.588:1)
export const cardSizes = {
  // CR-80 Vertical (portrait): 54mm wide × 86mm tall
  '54x86':  { width: 170, height: 270 },
  '86x54':  { width: 170, height: 270 },
  // CR-80 Horizontal (landscape): 86mm wide × 54mm tall
  '100x70': { width: 270, height: 170 },
  '70x100': { width: 270, height: 170 },
};

export const SAFETY_MARGIN = 16; // ~5mm bleed (approx 16px at this scale)
