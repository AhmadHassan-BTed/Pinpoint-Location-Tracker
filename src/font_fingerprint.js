/**
 * Pinpoint Core: Font Profiler
 * 
 * Demonstrates system identification via installed font enumeration.
 */

/**
 * Detects specific fonts by measuring rendered text widths.
 * @returns {Object}
 */
export const extractFontProfile = () => {
  const baseFonts = ['monospace', 'sans-serif', 'serif'];
  const testFonts = ['Arial', 'Verdana', 'Courier New', 'Consolas', 'Impact', 'Comic Sans MS'];
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const text = "abcdefghijklmnopqrstuvwxyz0123456789";
  ctx.font = "72px monospace";
  const baseline = ctx.measureText(text).width;

  const detected = [];

  testFonts.forEach(font => {
    ctx.font = `72px "${font}", monospace`;
    const width = ctx.measureText(text).width;
    if (width !== baseline) {
      detected.push(font);
    }
  });

  return {
    detected,
    entropy: detected.length > 0 ? "HIGH" : "LOW",
    note: "Uniquely identifies your system software profile."
  };
};
