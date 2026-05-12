/**
 * Pinpoint Core: Battery Utility
 * 
 * Extracts power-related metrics from the device.
 */

/**
 * Resolves the current battery status.
 * @returns {Promise<Object>} - Battery level, charging state, and timing.
 */
export const extractBatteryStatus = async () => {
  if (!navigator.getBattery) {
    return { supported: false };
  }

  try {
    const battery = await navigator.getBattery();
    return {
      supported: true,
      level: (battery.level * 100).toFixed(0) + '%',
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime,
    };
  } catch (error) {
    console.error('[Battery] Error:', error.message);
    return { supported: false, error: error.message };
  }
};
