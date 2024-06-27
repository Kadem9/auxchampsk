import React, { createContext, useContext, useState, useEffect } from "react";
import { useMagasin } from "./MagasinContext.jsx";
import {useParams} from "react-router-dom";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const { magasins } = useMagasin();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id} = useParams();

    useEffect(() => {
        if (id) {
            fetchCategories(id);
        }
    }, [id]);

    const fetchCategories = async (magasinId) => {
        try {
            const response = await fetch(`/api/category_shops?magasin=${magasinId}`);
            if (!response.ok) {
                throw new Error("Impossible de récupérer les catégories.");
            }
            const data = await response.json();
            setCategories(data);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories:", error);
        }
    };

    const createCategory = async (category) => {
        try {
            const response = await fetch(`/api/category_shops`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category),
            });
            if (!response.ok) {
                throw new Error("Impossible de créer la catégorie.");
            }
            const newCategory = await response.json();
            setCategories((prevCategories) => [...prevCategories, newCategory]);
        } catch (error) {
            console.error("Erreur lors de la création de la catégorie:", error);
        }
    };

    const updateCategory = async (category) => {
        try {
            const response = await fetch(`/api/category_shops/${category.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category),
            });
            if (!response.ok) {
                throw new Error("Impossible de mettre à jour la catégorie.");
            }
            const updatedCategory = await response.json();
            setCategories((prevCategories) =>
                prevCategories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la catégorie:", error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`/api/category_shops/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Impossible de supprimer la catégorie.");
            }
            setCategories((prevCategories) => prevCategories.filter((c) => c.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie:", error);
        }
    };

    const value = {
        categories,
        loading,
        createCategory,
        updateCategory,
        deleteCategory,
    };

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);
