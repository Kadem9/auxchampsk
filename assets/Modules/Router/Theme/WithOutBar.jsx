import {Link} from "react-router-dom";
import React from "react";
import {useUser} from "../../../Context/UserContext.jsx";

function WithOutBar() {
    const { user } = useUser();

    return (
            <div className="navigation-general p-2">
                <h5 className="text-uppercase text-panini">
                    AuxChamps.fr
                    {/*<img src="/assets/img/logo.png" alt="AuxChamps.fr" className="img-fluid"/>*/}
                </h5>
                <div className="navigation-items">
                    <nav className="d-flex justify-content-center">
                        <div className="navigation">
                            <Link className="text-navigation text-dark" to={`/infos`}>En savoir plus</Link>
                            <Link className="text-navigation text-dark" to={`/`}>Le marché</Link>
                            {user && user.typeUser === "client" && (
                                <Link className="text-navigation text-dark text-arrondi" to={`/`}>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </Link>
                            )}
                            {user ? (
                                <>
                                    <Link className="text-navigation text-dark" to={`/mon-compte`}>Mon compte</Link>
                                    <a href="/deconnexion" className="text-navigation text-dark text-arrondi">
                                        Déconnexion
                                    </a>
                                </>
                            ) : (
                                <>
                                    <Link className="text-navigation text-dark text-arrondi" to={`/inscription`}>
                                        Inscription
                                    </Link>
                                    <a className="text-navigation text-dark text-arrondi"
                                       href="/connexion">Connexion</a>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        );
}

export default WithOutBar;