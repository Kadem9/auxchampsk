import React, { useState, useEffect } from "react";
import { useMagasin } from "../../Context/MagasinContext.jsx";
import SearchForm from "./SearchForm.jsx";
import { filterStoresByDistance, geocodeCity } from "./google/api.jsx";
import { Link } from "react-router-dom";
import "./css/HomePageSearch.css";
import FruitDuMois from "./FruitDuMois.jsx";

function HomePageSearch() {
    const { allMagasins, fetchAllMagasins } = useMagasin();
    const [filteredStores, setFilteredStores] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllMagasins();
    }, []);
    const handleSearch = async (city, radius) => {
        setLoading(true);
        try {
            const userCoords = await geocodeCity(city);
            const nearbyStores = filterStoresByDistance(allMagasins, userCoords, radius);
            setFilteredStores(nearbyStores);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la recherche des magasins");
        }
        setLoading(false);
    };

    const getRandomStores = (stores, count) => {
        const shuffled = [...stores].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    return (
        <div className="home-page">
            <div className="search-header">
                <h1>Rechercher un magasin à proximité</h1>
                <SearchForm onSearch={handleSearch} />
            </div>
            {loading ? (
                <p className="loading-text">Chargement...</p>
            ) : filteredStores.length > 0 ? (
                <div className="store-list">
                    {filteredStores.map((store) => (
                        <Link to={`/magasin/${store.id}`} key={store.id} className="store-item">
                            <img src={store.logo} alt={store.nom} className="store-logo" />
                            <div className="store-info">
                                <h2>{store.nom}</h2>
                                <p>{store.rue}, {store.ville}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="content-feed">
                    <div className="content-section fruits">
                        <h2 className="mb-4">Les fruits du mois</h2>
                        <FruitDuMois />
                    </div>
                    <div className="content-section portrait">
                        <h2>Le portrait du mois</h2>
                        <p>Présentez le portrait d'un producteur ou d'un magasin.</p>
                    </div>
                    <div className="content-section random-stores">
                        <h2>Magasins aléatoires</h2>
                        <div className="random-store-list">
                            {getRandomStores(allMagasins, 3).map((store) => (
                                <Link to={`/magasin/${store.id}`} key={store.id} className="store-item">
                                    <img src={store.logo} alt={store.nom} className="store-logo" />
                                    <div className="store-info">
                                        <h3>{store.nom}</h3>
                                        <p>{store.rue}, {store.ville}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePageSearch;
