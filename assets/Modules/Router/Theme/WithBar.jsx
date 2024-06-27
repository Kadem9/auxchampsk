import {Link} from "react-router-dom";
import React from "react";
import {useUser} from "../../../Context/UserContext.jsx";
import logo from "../img/logo.png";
function WithBar() {
    const { user } = useUser();

  return (
      <div className="navigation-general-otherpage p-4 bg-navbar">
          <h5 className="text-uppercase text-panini">
              {/*AuxChamps.fr*/}
              <img src={logo} alt="logo" className="logo-auxchamps" width={140}/>
          </h5>
          <div className="navigation-items">
              <nav className="d-flex justify-content-center">
                  <div className="navigation">
                      <Link className="text-navigation text-dark" to={`/magasin/3`}>Le marché</Link>
                      <Link className="text-navigation text-dark" to={`/infos`}>En savoir plus</Link>
                      {user && user.typeUser === "Client" && (
                          <>
                              <Link className="text-navigation text-dark text-arrondi" to={`/panier`}>
                                  <i className="fa-solid fa-cart-shopping"></i>
                              </Link>
                          </>

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

export default WithBar;