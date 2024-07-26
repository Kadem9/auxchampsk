import React, { useState } from "react";
import CityAutocomplete from "./CityAutocomplete.jsx";
function SearchForm({ onSearch }) {
    const [city, setCity] = useState("");
    const [radius, setRadius] = useState(5); // 5 km par défaut

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(city, radius);
    };

    const handleCitySelected = (selectedCity) => {
        setCity(selectedCity);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="city">Lieu de recherche</label>
                    <CityAutocomplete onCitySelected={handleCitySelected} />
                </div>
                <div className="form-group">
                    <label htmlFor="radius">Rayon (km)</label>
                    <select
                        className="form-control"
                        id="radius"
                        value={radius}
                        onChange={(e) => setRadius(parseInt(e.target.value))}
                        required
                    >
                        <option value={5}>5 km</option>
                        <option value={10}>10 km</option>
                        <option value={15}>15 km</option>
                        <option value={20}>20 km</option>
                        <option value={30}>30 km</option>
                        <option value={50}>50 km</option>
                        <option value={100}>Plus de 50 km</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Rechercher</button>
            </div>
        </form>
    );
}

export default SearchForm;
