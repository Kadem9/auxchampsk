import React from "react";
import { useCategory } from "../../../../../../Context/CategoryContext.jsx";

function CategorySelection({ onSelect, onBack }) {
    const { categories } = useCategory();

    const handleCategorySelect = (e) => {
        onSelect(e.target.value);
    };

    return (
        <div>
            <h5>Choisir une catégorie</h5>
            <select className="form-control" onChange={handleCategorySelect}>
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button className="btn btn-secondary mt-3" onClick={onBack}>Retour</button>
        </div>
    );
}

export default CategorySelection;
