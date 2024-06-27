import React, { useState, useEffect } from "react";
import { useCategory } from "../../../../../../Context/CategoryContext.jsx";
import "./ProductForm.css";

function ProductForm({ product = {}, onSave }) {
    const { categories } = useCategory();
    const [formData, setFormData] = useState({
        id: product.id || "",
        price: product.price || 0,
        quantity: product.quantity || 0,
        minimumQuantityPurchase: product.minimumQuantityPurchase || 1,
        maximumQuantityPurchase: product.maximumQuantityPurchase || 1,
        description: product.description || "",
        origine: product.origine || "",
        categories: product.categoryDetails ? product.categoryDetails["@id"] : "",
        magasin: product.magasin || "",
    });

    useEffect(() => {
        if (product.id) {
            setFormData({
                id: product.id,
                price: product.price || 0,
                quantity: product.quantity || 0,
                minimumQuantityPurchase: product.minimumQuantityPurchase || 1,
                maximumQuantityPurchase: product.maximumQuantityPurchase || 1,
                description: product.description || "",
                origine: product.origine || "",
                categories: product.categoryDetails ? product.categoryDetails["@id"] : "",
                magasin: product.magasin || "",
            });
        }
    }, [product]);

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
        onSave(formData);
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-row mb-3">
                <div className="col">
                    <label htmlFor="price" className="form-label">Prix</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col">
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
            </div>
            <div className="form-row mb-3">
                <div className="col">
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
                <div className="col">
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
                    {product.categoryDetails ? (
                        <option key={product.categoryDetails.id} value={product.categoryDetails["@id"]}>
                            {product.categoryDetails.name}
                        </option>
                    ) : (
                        <option value="">Sélectionnez une catégorie</option>
                    )}
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Enregistrer</button>
        </form>
    );
}

export default ProductForm;
