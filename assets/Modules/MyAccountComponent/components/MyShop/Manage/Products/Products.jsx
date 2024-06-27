import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { useProduct } from "../../../../../../Context/ProductContext.jsx";
import { useCategory } from "../../../../../../Context/CategoryContext.jsx";
import Modal from "../../../../../Utils/Modal.jsx";
import ProductForm from "./ProductForm.jsx";
import CreateProductModal from "./CreateProductModal.jsx";
import "./Product.css";

function Products() {
    const { products, loading, setSearchQuery, setSelectedCategory, searchQuery, selectedCategory, deleteProduct, updateProduct } = useProduct();
    const { categories } = useCategory();
    const [currentPage, setCurrentPage] = useState(0);
    const [editProduct, setEditProduct] = useState(null);
    const [showCreateProductModal, setShowCreateProductModal] = useState(false);
    const productsPerPage = 12; // Increased to show more products per page

    if (loading) {
        return <div>Chargement...</div>;
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
    };

    const handleEdit = (product) => {
        setEditProduct(product);
    };

    const handleUpdate = async (productData) => {
        const updatedProduct = {
            ...productData,
            categories: productData.categories,
        };
        await updateProduct(updatedProduct);
        setEditProduct(null);
    };

    const offset = currentPage * productsPerPage;
    const currentProducts = products.slice(offset, offset + productsPerPage);
    const pageCount = Math.ceil(products.length / productsPerPage);

    return (
        <div className="products-container">
            <div className="products-header d-flex justify-content-between align-items-center mb-3">
                <h5>Les produits</h5>
                <button className="btn btn-primary" onClick={() => setShowCreateProductModal(true)}>
                    <FontAwesomeIcon icon={faPlus} /> Ajouter un produit
                </button>
            </div>
            <p>Gérez les produits de votre magasin.</p>

            <div className="products-filters d-flex mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher un produit..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <span className="input-group-text">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </div>

                <select className="form-control ms-3" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Toutes les catégories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="row">
                {currentProducts.map((product) => (
                    <div className="col-md-4 col-sm-6" key={product.id}>
                        <div className="card product-card mb-3 shadow-sm">
                            <img src={`/assets/img/products/${product.productDetails?.image}`} alt={product.productDetails?.image} className="card-img-top product-image" />
                            <div className="card-body">
                                <h6 className="card-title">{product.productDetails?.name}</h6>
                                <p className="card-text"><strong>Prix:</strong> {product.price} €</p>
                                <p className="card-text"><strong>Quantité:</strong> {product.quantity}</p>
                                <p className="card-text"><strong>Catégorie:</strong> {product.categoryDetails?.name}</p>
                                <p className="card-text"><strong>Description:</strong> {product.description}</p>
                                <p className="card-text"><strong>Origine:</strong> {product.origine}</p>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(product)}>
                                        <FontAwesomeIcon icon={faEdit} /> Modifier
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                                        <FontAwesomeIcon icon={faTrash} /> Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ReactPaginate
                previousLabel={"Précédent"}
                nextLabel={"Suivant"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />

            {editProduct && (
                <Modal onClose={() => setEditProduct(null)}>
                    <ProductForm product={editProduct} onSave={handleUpdate} />
                </Modal>
            )}

            {showCreateProductModal && (
                <Modal onClose={() => setShowCreateProductModal(false)}>
                    <CreateProductModal onClose={() => setShowCreateProductModal(false)} />
                </Modal>
            )}
        </div>
    );
}

export default Products;