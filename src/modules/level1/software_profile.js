/**
 * Pinpoint Module: Software Profile
 * Level 1: Standard Recon
 */
export default {
    id: 'fonts',
    title: 'Software_Profile',
    level: 1,
    info: "Detects installed system fonts to map software profile.",
    steps: ["Measure font rendering widths.", "Map system fonts."],
    run: async () => {
        const testFonts = ['Arial', 'Verdana', 'Courier New', 'Consolas', 'Impact', 'Comic Sans MS'];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const text = "abcdefghijklmnopqrstuvwxyz";
        ctx.font = "72px monospace";
        const baseline = ctx.measureText(text).width;
        const detected = testFonts.filter(font => {
            ctx.font = `72px "${font}", monospace`;
            return ctx.measureText(text).width !== baseline;
        });
        return { detected, profile: detected.length > 3 ? "STANDARD" : "CUSTOM" };
    }
};
