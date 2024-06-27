import React from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { useMagasin } from "../../../../Context/MagasinContext.jsx";
import Dashboard from "./Manage/Dashboard.jsx";
import Categories from "./Manage/Categories/Categories.jsx";
import Products from "./Manage/Products/Products.jsx";
import Orders from "./Manage/Orders.jsx";
import Settings from "./Manage/Settings.jsx";
import Messages from "./Manage/Messages.jsx";
import {CategoryProvider} from "../../../../Context/CategoryContext.jsx";
import {ProductProvider} from "../../../../Context/ProductContext.jsx";

function ManageShop() {
    const { id } = useParams();
    const { magasins } = useMagasin();
    const magasin = magasins.find((magasin) => magasin.id === parseInt(id));

    if (!magasin) {
        return <div>Magasin introuvable</div>;
    }

    return (
        <CategoryProvider>
            <ProductProvider>
            <div className="bg-navigation p-4">
                <h5>Gérer le magasin: {magasin.nom}</h5>
                <nav>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link className="nav-link" to={`/mon-compte/magasin/${id}/dashboard`}>Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/mon-compte/magasin/${id}/categories`}>Les catégories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/mon-compte/magasin/${id}/products`}>Les produits</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/mon-compte/magasin/${id}/orders`}>Les commandes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/mon-compte/magasin/${id}/settings`}>Les paramètres</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/mon-compte/magasin/${id}/messages`}>Les messages</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="messages" element={<Messages />} />
                </Routes>
            </div>
            </ProductProvider>
        </CategoryProvider>
    );
}

export default ManageShop;
