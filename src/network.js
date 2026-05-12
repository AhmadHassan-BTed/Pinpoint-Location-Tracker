/**
 * Pinpoint Core: Network Utility
 * 
 * Handles acquisition of network-related identifiers like IP and connection type.
 */

/**
 * Resolves the user's public IP address using an external provider.
 * @returns {Promise<string>} - The public IP address.
 */
export const resolvePublicIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn('[Network] Failed to resolve IP:', error.message);
    return 'unknown';
  }
};

/**
 * Extracts basic network connection information.
 * @returns {Object} - Connection type, effective bandwidth, etc.
 */
export const extractConnectionInfo = () => {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) return { supported: false };

  return {
    supported: true,
    type: conn.effectiveType,
    downlink: conn.downlink,
    rtt: conn.rtt,
    saveData: conn.saveData,
  };
};
