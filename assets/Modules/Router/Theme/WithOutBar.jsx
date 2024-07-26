import {Link} from "react-router-dom";
import React from "react";
import {useUser} from "../../../Context/UserContext.jsx";

function WithOutBar() {
    const { user } = useUser();

    return (
            <div className="navigation-general p-2">
                <div className="navigation-sous-header">
                    <img src="/assets/logo-DMrNd1hm.png" alt="logo" className="logo-auxchamps" width={220}/>
                    <div className="navigation-items">
                        <nav className="d-flex justify-content-center">
                            <div className="navigation">
                                <Link className="text-navigation text-dark" to={`/infos`}>En savoir plus</Link>
                                {user && user.typeUser === "Client" && (
                                    <>
                                        <Link className="text-navigation text-dark" to={`/`}>Le marché</Link>
                                        <Link className="text-navigation text-dark" to={`/mon-compte`}>Mon compte</Link>
                                        <Link className="text-navigation text-dark text-arrondi" to={`/`}>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                        </Link>
                                        <a href="/deconnexion" className="text-navigation text-dark text-arrondi">
                                            Déconnexion
                                        </a>
                                    </>
                                )}
                                {user && user.typeUser === "Agriculteur" && (
                                    <>
                                        <Link className="text-navigation text-dark" to={`/mon-compte`}>Mon compte</Link>
                                        <a href="/deconnexion" className="text-navigation text-dark text-arrondi">
                                            Déconnexion
                                        </a>
                                    </>
                                )}
                                {!user ? (
                                    <>

                                        <a className="text-navigation text-dark text-arrondi" href="/inscription">
                                            Inscription
                                        </a>
                                        <a className="text-navigation text-dark text-arrondi"
                                           href="/connexion">Connexion</a>
                                    </>
                                ) :
                                    null
                                }
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
    );
}

export default WithOutBar;