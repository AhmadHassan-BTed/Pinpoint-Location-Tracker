/**
 * Pinpoint Core: Tracker Utility
 * 
 * Provides robust functions for high-accuracy geolocation extraction.
 */

/**
 * Extracts the current precise location of the device.
 * @param {Object} options - Configuration for the acquisition.
 * @returns {Promise<Object>} - Resolves with latitude and longitude.
 */
export const extractLocation = (options = {}) => {
  const defaults = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  const settings = { ...defaults, ...options };

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log(`[Tracker] Position acquired with accuracy: ${accuracy}m`);
        resolve({ latitude, longitude, accuracy, timestamp: position.timestamp });
      },
      (error) => {
        reject(error);
      },
      settings
    );
  });
};
