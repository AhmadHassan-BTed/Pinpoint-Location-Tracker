/**
 * Pinpoint Module: Civic Locator
 * Level 3: Critical Intelligence
 */
export default {
    id: 'address',
    title: 'Civic_Locator',
    level: 3,
    info: "Converts GPS coordinates into a physical street address.",
    steps: ["Extract coordinates.", "Reverse geocode via API."],
    run: async () => {
        const getPos = () => new Promise(res => navigator.geolocation.getCurrentPosition(res));
        const pos = await getPos();
        const { latitude, longitude } = pos.coords;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        return {
            address: data.display_name,
            house_number: data.address.house_number,
            road: data.address.road,
            suburb: data.address.suburb,
            city: data.address.city,
            postcode: data.address.postcode
        };
    }
};
