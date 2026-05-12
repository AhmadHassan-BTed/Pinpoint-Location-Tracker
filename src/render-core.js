/**
 * Pinpoint Core: Fingerprint Utility
 * 
 * Demonstrates how Canvas rendering is used to create a unique browser identifier.
 */

/**
 * Generates a unique hash based on how the browser renders a hidden canvas.
 * @returns {Object} - The raw canvas data and a unique fingerprint hash.
 */
export const extractCanvasFingerprint = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // High-fidelity rendering test for unique artifacts
  canvas.width = 200;
  canvas.height = 50;
  ctx.textBaseline = "top";
  ctx.font = "14px 'Arial'";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#f60";
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = "#069";
  ctx.fillText("PinpointFingerprint <canvas> 1.0", 2, 15);
  ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
  ctx.fillText("PinpointFingerprint <canvas> 1.0", 4, 17);

  const dataURL = canvas.toDataURL();
  
  // Simple hash function to turn the image data into a short ID
  let hash = 0;
  for (let i = 0; i < dataURL.length; i++) {
    const char = dataURL.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return {
    hash: Math.abs(hash).toString(16),
    supported: true,
    note: "This ID is unique to your browser's hardware/driver combination."
  };
};
