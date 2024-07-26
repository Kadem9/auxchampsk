export const geocodeCity = async (city) => {
    const apiKey = "AIzaSyColEkRLJ0NRAAZhbWFXfxVNHPTqgwjn5c";
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`);
    const data = await response.json();
    if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
    } else {
        throw new Error("Ville non trouvée");
    }
};

export const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km

    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lng - coords1.lng);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

export const filterStoresByDistance = (stores, userCoords, radius) => {
    return stores.filter(store => {
        const storeCoords = { lat: store.latitude, lng: store.longitude };
        const distance = haversineDistance(userCoords, storeCoords);
        return distance <= radius;
    });
};