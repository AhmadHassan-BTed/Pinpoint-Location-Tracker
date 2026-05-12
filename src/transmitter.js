/**
 * Pinpoint Core: Transmitter Utility
 * 
 * Handles stealthy data transmission to remote endpoints.
 */

/**
 * Transmits payload data to a specified endpoint.
 * @param {string} endpoint - The target URL.
 * @param {Object} payload - The data to send.
 * @returns {Promise<Response>}
 */
export const transmitData = async (endpoint, payload) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'X-Pinpoint-Version': '2.5.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Transmission failed: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error(`[Transmitter] Error: ${error.message}`);
    throw error;
  }
};
