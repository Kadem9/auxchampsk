import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCategory } from "../../../../../../Context/CategoryContext.jsx";
import CategoryForm from "./CategoryForm.jsx";
import Modal from "../../../../../Utils/Modal.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../css/categories.css';

function Categories() {
    const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategory();
    const [pageCreate, setPageCreate] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const handleCreate = async (category, adjustedCategories) => {
        try {
            await Promise.all(adjustedCategories.map(cat => updateCategory(cat)));
            await createCategory(category);
            toast.success("Catégorie créée avec succès !");
            setPageCreate(false);
        } catch (error) {
            toast.error("Erreur lors de la création de la catégorie.");
        }
    };

    const handleUpdate = async (category, adjustedCategories) => {
        try {
            await Promise.all(adjustedCategories.map(cat => updateCategory(cat)));
            await updateCategory(category);
            toast.success("Catégorie mise à jour avec succès !");
            setEditCategory(null);
        } catch (error) {
            toast.error("Erreur lors de la mise à jour de la catégorie.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            toast.success("Catégorie supprimée avec succès !");
            setCategoryToDelete(null);
        } catch (error) {
            toast.error("Erreur lors de la suppression de la catégorie.");
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    const sortedCategories = [...categories].sort((a, b) => a.ordre - b.ordre);

    return (
        <div className="categories-container">
            <h5 className="title">Les catégories</h5>
            <p className="description">Gérez les catégories de produits de votre magasin.</p>
            <button className="add-button" onClick={() => setPageCreate(true)}>
                <FontAwesomeIcon icon={faPlus} /> Ajouter une catégorie
            </button>
            <div className="categories-grid">
                {sortedCategories.map((category) => (
                    <div className="category-card" key={category.id}>
                        <div className="card-content">
                            <h6 className="category-name">{category.name}</h6>
                            <p className="category-order">Ordre : {category.ordre}</p>
                            <button className="edit-button" onClick={() => setEditCategory(category)}>
                                <FontAwesomeIcon icon={faEdit} /> Modifier
                            </button>
                            <button className="delete-button" onClick={() => setCategoryToDelete(category)}>
                                <FontAwesomeIcon icon={faTrash} /> Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {pageCreate && (
                <Modal onClose={() => setPageCreate(false)}>
                    <CategoryForm onSave={handleCreate} />
                </Modal>
            )}
            {editCategory && (
                <Modal onClose={() => setEditCategory(null)}>
                    <CategoryForm category={editCategory} onSave={handleUpdate} />
                </Modal>
            )}
            {categoryToDelete && (
                <ConfirmDeleteModal
                    onClose={() => setCategoryToDelete(null)}
                    onConfirm={() => handleDelete(categoryToDelete.id)}
                    categoryName={categoryToDelete.name}
                />
            )}
        </div>
    );
}

export default Categories;
