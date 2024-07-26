import React, { useRef } from 'react';
import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places'];

function AddressAutocomplete({ onPlaceSelected }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyColEkRLJ0NRAAZhbWFXfxVNHPTqgwjn5c',
        libraries,
    });

    const searchBoxRef = useRef(null);

    const handlePlacesChanged = () => {
        const places = searchBoxRef.current.getPlaces();
        if (places.length === 0) return;
        const place = places[0];
        const addressComponents = place.address_components;

        const getAddressComponent = (type) => {
            const component = addressComponents.find(c => c.types.includes(type));
            return component ? component.long_name : '';
        };

        const address = {
            rue: `${getAddressComponent('street_number')} ${getAddressComponent('route')}`,
            ville: getAddressComponent('locality') || getAddressComponent('sublocality'),
            codePostal: getAddressComponent('postal_code'),
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
        };

        onPlaceSelected(address);
    };

    if (!isLoaded) return <div>Chargement...</div>;

    return (
        <StandaloneSearchBox
            onLoad={ref => (searchBoxRef.current = ref)}
            onPlacesChanged={handlePlacesChanged}
        >
            <input
                type="text"
                placeholder="Saisir une ville"
                className="form-control"
            />
        </StandaloneSearchBox>
    );
}

export default AddressAutocomplete;
