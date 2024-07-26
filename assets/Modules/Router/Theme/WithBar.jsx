import { Link } from "react-router-dom";
import React from "react";
import { useUser } from "../../../Context/UserContext.jsx";
import "../css/withBar.css";
import {useCart} from "../../../Context/CartContext.jsx";

function WithBar() {
    const { user } = useUser();
    const {cart } = useCart();
    return (
        <div className="navigation-general-otherpage p-4 bg-navbar">
            <Link to={`/`}>
            <h5 className="text-uppercase text-panini">
                <img src="/assets/logo-DMrNd1hm.png" alt="logo" className="logo-auxchamps" width={220} />
            </h5>
            </Link>
            <div className="navigation-items">
                <nav className="d-flex justify-content-center">
                    <div className="navigation">
                        <Link className="text-navigation" to={`/trouver-magasin`}>Le marché</Link>
                        <Link className="text-navigation" to={`/infos`}>En savoir plus</Link>
                        {user ? (
                            <>
                                <Link className="text-navigation" to={`/mon-compte`}>Mon compte</Link>
                                {user.typeUser === "Client" && (
                                    <Link className="text-navigation text-arrondi" to={`/panier`}>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        {cart.length > 0 && (
                                            <span className="cart-count">{cart.length}</span>
                                        )}
                                    </Link>
                                )}
                                <a href="/deconnexion" className="text-navigation text-arrondi">
                                    Déconnexion
                                </a>
                            </>
                        ) : (
                            <>
                                <Link className="text-navigation text-arrondi" to={`/inscription`}>
                                    Inscription
                                </Link>
                                <a className="text-navigation text-arrondi" href="/connexion">Connexion</a>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default WithBar;
