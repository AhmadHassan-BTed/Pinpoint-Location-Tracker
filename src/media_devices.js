/**
 * Pinpoint Core: Media Device Utility
 * 
 * Demonstrates the enumeration of connected audio and video hardware.
 */

/**
 * Lists all media input and output devices.
 * @returns {Promise<Array>} - List of device types and IDs.
 */
export const enumerateDevices = async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    return { supported: false };
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.map(device => ({
      kind: device.kind,
      deviceId: device.deviceId ? "Captured (ID Masked)" : "Not Available",
      groupId: device.groupId,
      label: device.label || "Permission Required to view label"
    }));
  } catch (error) {
    console.error('[Media] Error:', error.message);
    return { error: error.message };
  }
};
