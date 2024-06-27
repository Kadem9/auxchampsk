import React, { createContext, useContext, useState, useEffect } from "react";
import { useMagasin } from "./MagasinContext.jsx";
import { useParams } from "react-router-dom";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { magasins } = useMagasin();
    const { id: magasinId } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        if (magasinId) {
            fetchProducts(magasinId);
        }
    }, [magasinId]);

    useEffect(() => {
        filterProducts();
    }, [products, searchQuery, selectedCategory]);

    const fetchProducts = async (magasinId) => {
        try {
            const response = await fetch(`/api/product_shops?magasin=${magasinId}`);
            if (!response.ok) {
                throw new Error("Impossible de récupérer les produits.");
            }
            const data = await response.json();

            const resolvedProducts = await Promise.all(
                data.map(async (product) => {
                    const productDetails = await resolveIRI(product.product);
                    const categoryDetails = product.categories ? await resolveIRI(product.categories) : null;
                    return {
                        ...product,
                        productDetails,
                        categoryDetails,
                    };
                })
            );

            setProducts(resolvedProducts);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des produits:", error);
        }
    };

    const resolveIRI = async (iri) => {
        try {
            const response = await fetch(iri);
            if (!response.ok) {
                throw new Error(`Impossible de récupérer les détails pour ${iri}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erreur lors de la résolution de l'IRI: ${iri}`, error);
        }
    };

    const filterProducts = () => {
        let filtered = products;
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.productDetails && product.productDetails.name &&
                product.productDetails.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (selectedCategory) {
            filtered = filtered.filter(product =>
                product.categoryDetails && product.categoryDetails.id.toString() === selectedCategory
            );
        }
        setFilteredProducts(filtered);
    };

    const createProduct = async (product) => {
        try {
            const response = await fetch(`/api/product_shops`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error("Impossible de créer le produit.");
            }
            const newProduct = await response.json();
            const productDetails = await resolveIRI(newProduct.product);
            const categoryDetails = newProduct.categories ? await resolveIRI(newProduct.categories) : null;
            setProducts((prevProducts) => [...prevProducts, { ...newProduct, productDetails, categoryDetails }]);
        } catch (error) {
            console.error("Erreur lors de la création du produit:", error);
        }
    };

    const updateProduct = async (product) => {
        try {
            const updatedData = { ...product };
            if (product.categories) {
                updatedData.categories = "/api/category_shops/" + product.categories;
            } else {
                delete updatedData.categories;
            }

            const response = await fetch(`/api/product_shops/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Impossible de mettre à jour le produit.");
            }

            const updatedProduct = await response.json();
            const productDetails = await resolveIRI(updatedProduct.product);
            const categoryDetails = updatedProduct.categories ? await resolveIRI(updatedProduct.categories) : null;

            setProducts((prevProducts) =>
                prevProducts.map((p) => (p.id === updatedProduct.id ? { ...updatedProduct, productDetails, categoryDetails } : p))
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour du produit:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`/api/product_shops/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Impossible de supprimer le produit.");
            }
            setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression du produit:", error);
        }
    };

    const value = {
        products: filteredProducts,
        loading,
        createProduct,
        updateProduct,
        deleteProduct,
        setSearchQuery,
        setSelectedCategory,
        searchQuery,
        selectedCategory,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);
