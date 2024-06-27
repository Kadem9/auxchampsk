import React, { useState, useEffect } from "react";
import { useCategory } from "../../../../../../Context/CategoryContext.jsx";
import "./productDetailsForm.css"

function ProductDetailsForm({ product, onSubmit, onBack }) {
    const { categories } = useCategory();
    const [formData, setFormData] = useState({
        product: "/api/productss/" + product.id,
        price: 0,
        quantity: 0,
        minimumQuantityPurchase: 1,
        maximumQuantityPurchase: 1,
        description: "",
        origine: "",
        categories: ""
    });

    useEffect(() => {
        if (categories.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                categories: categories[0].id
            }));
        }
    }, [categories]);

    const handleChange = (e) => {
        const { id, value, type } = e.target;

        let newValue;
        if (type === 'number') {
            newValue = id === 'price' ? parseFloat(value) : parseInt(value, 10);
        } else {
            newValue = value;
        }

        setFormData((prevData) => ({
            ...prevData,
            [id]: newValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            categories: `/api/category_shops/${formData.categories}`
        };
        onSubmit(updatedFormData);
    };

    return (
        <div className="product-details-form">
            <h5>Détails du produit</h5>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="price" className="form-label">Prix</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="quantity" className="form-label">Quantité</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="minimumQuantityPurchase" className="form-label">Quantité minimum d'achat</label>
                    <input
                        type="number"
                        className="form-control"
                        id="minimumQuantityPurchase"
                        value={formData.minimumQuantityPurchase}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="maximumQuantityPurchase" className="form-label">Quantité maximum d'achat</label>
                    <input
                        type="number"
                        className="form-control"
                        id="maximumQuantityPurchase"
                        value={formData.maximumQuantityPurchase}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="origine" className="form-label">Origine</label>
                    <input
                        type="text"
                        className="form-control"
                        id="origine"
                        value={formData.origine}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="categories" className="form-label">Catégorie</label>
                    <select
                        className="form-control"
                        id="categories"
                        value={formData.categories}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary" onClick={onBack}>Retour</button>
                    <button type="submit" className="btn btn-primary">Suivant</button>
                </div>
            </form>
        </div>
    );
}

export default ProductDetailsForm;
