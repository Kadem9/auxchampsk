import { Link } from 'react-router-dom';
import React, {useEffect} from "react"
import "./css/style.css";
import {useLocation} from "react-router-dom";
import {useAuth} from "../../Context/AuthContext.jsx";

function Menu({theme}) {
    let location = useLocation();
    const token = localStorage.getItem('token'); // Récupérer le token du localStorage
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        logout();
    }

    useEffect(() => {

    }, [location]);

    return location.pathname === "/" ? (
        <div className="navigation-general p-2">
            <h5 className="text-uppercase text-panini">AuxChamps.fr</h5>
            <div className="navigation-items">
                <nav className="d-flex justify-content-center">
                    <div className="navigation">
                        <Link className="text-navigation text-dark" to={`/infos`}>
                            En savoir plus</Link>
                        <Link className="text-navigation text-dark" to={`/`}>
                            Le marché</Link>
                        <Link className="text-navigation text-dark text-arrondi" to={`/`}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                        {token ? (
                            <>
                                <Link className="text-navigation text-dark" to={`/mon-compte`}>
                                    Mon compte</Link>
                                <div onClick={handleLogout} className="text-navigation text-dark text-arrondi">
                                    Déconnexion
                                </div>
                            </>
                        ) : (
                            <>
                                <Link className="text-navigation text-dark text-arrondi" to={`/inscription`}>
                                    Inscription
                                </Link>
                                <Link className="text-navigation text-dark text-arrondi" to={`/connexion`}>
                                    Connexion
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    ) : (
        <div className="navigation-general-otherpage p-4 bg-navbar">
            <h5 className="text-uppercase text-panini">AuxChamps.fr</h5>
            <div className="navigation-items">
                <nav className="d-flex justify-content-center">
                    <div className="navigation">
                        <Link className="text-navigation text-dark" to={`/infos`}>
                            En savoir plus</Link>
                        <Link className="text-navigation text-dark" to={`/`}>
                            Le marché</Link>
                        <Link className="te xt-navigation text-dark text-arrondi" to={`/`}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                        {token ? (
                            <>
                                <Link className="text-navigation text-dark" to={`/mon-compte`}>
                                    Mon compte</Link>
                                <div onClick={handleLogout} className="text-navigation text-dark text-arrondi">
                                    Déconnexion
                                </div>
                            </>
                        ) : (
                            <>
                                <Link className="text-navigation text-dark text-arrondi" to={`/inscription`}>
                                    Inscription
                                </Link>
                                <Link className="text-navigation text-dark text-arrondi" to={`/connexion`}>
                                    Connexion
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}
export default Menu;
