/**
 * Pinpoint Core: Metadata Utility
 * 
 * Extracts detailed information about the user's device and browser environment.
 */

/**
 * Gathers comprehensive device and browser metadata.
 * @returns {Object} - An object containing device and environment info.
 */
export const extractMetadata = () => {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    cores: navigator.hardwareConcurrency || 'unknown',
    memory: navigator.deviceMemory || 'unknown',
  };
};
