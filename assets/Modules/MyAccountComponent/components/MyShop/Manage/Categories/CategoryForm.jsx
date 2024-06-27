import React, { useState, useEffect } from "react";
import { useMagasin } from "../../../../../../Context/MagasinContext.jsx";
import { useCategory } from "../../../../../../Context/CategoryContext.jsx";
import {useParams} from "react-router-dom";

function CategoryForm({ category = {}, onSave }) {
    const { magasins } = useMagasin();
    const { categories } = useCategory();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id: category.id || null,
        name: category.name || "",
        ordre: category.ordre || categories.length + 1,
        magasin: category.magasin || (magasins.length > 0 ? `/api/magasins/${id}` : ""),
    });

    useEffect(() => {
        if (category.id) {
            setFormData({
                id: category.id || null,
                name: category.name || "",
                ordre: category.ordre || categories.length + 1,
                magasin: category.magasin || (magasins.length > 0 ? `/api/magasins/${id}` : ""),
            });
        }
    }, [category, categories, magasins]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let ordre = parseInt(formData.ordre);
        if (ordre > categories.length + 1) {
            ordre = categories.length + 1;
        }

        const adjustedCategories = categories.map(cat => {
            if (cat.ordre >= ordre && cat.id !== category.id) {
                return { ...cat, ordre: cat.ordre + 1 };
            }
            return cat;
        }).sort((a, b) => a.ordre - b.ordre);

        onSave({ ...formData, ordre }, adjustedCategories);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom de la catégorie</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="ordre" className="form-label">Ordre</label>
                <input
                    type="number"
                    className="form-control"
                    id="ordre"
                    value={formData.ordre}
                    onChange={handleChange}
                    required
                    min="1"
                    max={categories.length + 1}
                />
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
}

export default CategoryForm;
