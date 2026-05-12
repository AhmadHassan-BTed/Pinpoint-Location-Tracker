/**
 * Pinpoint Core: Geocoder Utility
 * 
 * Converts raw coordinates into human-readable address data.
 */

/**
 * Resolves physical address from coordinates using OpenStreetMap Nominatim.
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 * @returns {Promise<Object>} - Detailed address information.
 */
export const resolveAddress = async (lat, lon) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    if (!response.ok) throw new Error("Geocoding service unavailable");
    
    const data = await response.json();
    return {
      fullAddress: data.display_name,
      details: data.address
    };
  } catch (error) {
    console.warn('[Geocoder] Failed to resolve address:', error.message);
    return { error: error.message };
  }
};
