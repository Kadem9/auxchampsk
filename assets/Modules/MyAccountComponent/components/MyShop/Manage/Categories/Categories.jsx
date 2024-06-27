import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCategory } from "../../../../../../Context/CategoryContext.jsx";
import CategoryForm from "./CategoryForm.jsx";
import Modal from "../../../../../Utils/Modal.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal.jsx";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

    // Trier les catégories par ordre avant de les afficher
    const sortedCategories = [...categories].sort((a, b) => a.ordre - b.ordre);

    return (
        <div className="mt-3">
            <h5>Les catégories</h5>
            <p>Gérez les catégories de produits de votre magasin.</p>
            <button className="rounded bg-primary-color border border-0 mb-2" onClick={() => setPageCreate(true)}>
                <FontAwesomeIcon icon={faPlus} /> Ajouter une catégorie
            </button>
            <div className="row">
                {sortedCategories.map((category) => (
                    <div className="col-md-6" key={category.id}>
                        <div className="card mb-2">
                            <div className="card-body">
                                <h6>{category.name}</h6>
                                <p>Ordre : {category.ordre}</p>
                                <button className="btn btn-warning me-2" onClick={() => setEditCategory(category)}>
                                    <FontAwesomeIcon icon={faEdit} /> Modifier
                                </button>
                                <button className="btn btn-danger" onClick={() => setCategoryToDelete(category)}>
                                    <FontAwesomeIcon icon={faTrash} /> Supprimer
                                </button>
                            </div>
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
