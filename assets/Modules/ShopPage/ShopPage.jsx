import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useProduct } from "../../Context/ProductContext.jsx";
import { useCategory } from "../../Context/CategoryContext.jsx";
import ReactPaginate from "react-paginate";
import "./ShopPage.css";
import { useCart } from "../../Context/CartContext.jsx";
import { useUser } from "../../Context/UserContext.jsx";
import { Link, useParams } from "react-router-dom";

function ShopPage() {
    const { id } = useParams();
    const { user } = useUser();
    const { products, loading, setSearchQuery, setSelectedCategory, searchQuery, selectedCategory } = useProduct();
    const { categories } = useCategory();
    const { addToCart, cart } = useCart();
    const [currentPage, setCurrentPage] = useState(0);
    const [quantities, setQuantities] = useState({});
    const [shopOwner, setShopOwner] = useState(null);
    const productsPerPage = 10;

    useEffect(() => {
        const fetchShopOwner = async () => {
            try {
                const response = await fetch(`/api/magasins/${id}`);
                if (response.ok) {
                    const shop = await response.json();
                    const ownerResponse = await fetch(shop.user);
                    if (ownerResponse.ok) {
                        const owner = await ownerResponse.json();
                        setShopOwner(owner);
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des informations du propriétaire du magasin:", error);
            }
        };

        fetchShopOwner();
    }, [id]);

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

    const handleQuantityChange = (e, productId) => {
        const value = parseInt(e.target.value, 10);
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: value
        }));
    };

    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        addToCart(product, user, quantity);
    };

    const offset = currentPage * productsPerPage;
    const currentProducts = products.slice(offset, offset + productsPerPage);
    const pageCount = Math.ceil(products.length / productsPerPage);

    return (
        <div className="shop-page container">
            <div className="shop-header d-flex justify-content-between align-items-center mb-3">
                {shopOwner && (
                    <h5>
                        Magasin de <Link to={`/profil/fermier/${shopOwner.id}`}>{shopOwner.firstname} {shopOwner.lastname}</Link>
                    </h5>
                )}
                <div className="shop-filters d-flex">
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
            </div>

            <div className="row">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                            <div className="card product-card h-100 shadow-sm">
                                <img src={`/assets/img/products/${product.productDetails?.image}`} alt={product.productDetails?.image} className="card-img-top product-image" />
                                <div className="card-body d-flex flex-column">
                                    <h6 className="card-title">{product.productDetails?.name}</h6>
                                    <p className="card-text"><strong>Prix:</strong> {product.price} €</p>
                                    <p className="card-text"><strong>Quantité:</strong> {product.quantity}</p>
                                    <p className="card-text"><strong>Catégorie:</strong> {product.categoryDetails?.name}</p>
                                    <p className="card-text"><strong>Description:</strong> {product.description}</p>
                                    <p className="card-text"><strong>Origine:</strong> {product.origine}</p>
                                    <div className="d-flex align-items-center mt-auto">
                                        <div className="input-group quantity-input-group me-2">
                                            <span className="input-group-text">Qté</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="1"
                                                value={quantities[product.id] || 1}
                                                onChange={(e) => handleQuantityChange(e, product.id)}
                                            />
                                        </div>
                                        <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                                            <FontAwesomeIcon icon={faShoppingCart} /> Ajouter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>Aucun produit trouvé.</p>
                    </div>
                )}
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
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                breakClassName={"page-item"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
            />
        </div>
    );
}

export default ShopPage;
