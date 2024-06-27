import React, { useState, useEffect } from "react";
import "./productSearch.css";

function ProductSearch({ onSelect }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/productss?name=${searchQuery}`);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des produits.");
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (searchQuery) {
            fetchProducts().then(r => console.log(r));
        }
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="product-search">
            <h5>Rechercher un produit</h5>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div className="product-list">
                {searchResults.map((product) => (
                    <div
                        key={product.id}
                        className="product-item list-group-item"
                        onClick={() => onSelect(product)}
                    >
                        <img
                            src={`/assets/img/products/${product.image}`}
                            alt={product.name}
                            className="product-image-search"
                        />
                        <div className="product-name">{product.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductSearch;
