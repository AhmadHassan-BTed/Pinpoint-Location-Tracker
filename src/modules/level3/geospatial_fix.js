/**
 * Pinpoint Module: Geospatial Fix
 * Level 3: Critical Intelligence
 */
export default {
    id: 'location',
    title: 'Geospatial_Fix',
    level: 3,
    info: "Extracts high-precision GPS coordinates.",
    steps: ["Query Geolocation API.", "Log lat/long telemetry."],
    run: async () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    accuracy: pos.coords.accuracy + 'm',
                    timestamp: new Date(pos.timestamp).toISOString()
                }),
                (err) => reject(new Error(err.message)),
                { enableHighAccuracy: true, timeout: 5000 }
            );
        });
    }
};
