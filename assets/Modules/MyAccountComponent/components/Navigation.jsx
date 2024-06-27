import {Link, NavLink, Route} from "react-router-dom";
import "../assets/css/navigation.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faCircleInfo, faGear, faShop} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../../Context/UserContext.jsx";

function Navigation({}){
    const {user} = useUser();

    return(
        <div className="bg-navigation">
            <div className="identification-users">
                <span></span>
                <h6>{user.firstname} {user.lastname}</h6>
            </div>
            <NavLink
                to='/mon-compte/informations-personnelles'
                className={({ isActive }) => isActive ? "bg-active" : "bg-not-active"}
            >
                <FontAwesomeIcon className="icon-navigation" icon={faCircleInfo} />
                Informations personnelles
            </NavLink>
            <NavLink
                to='/mon-compte/mon-magasin'
                className={({ isActive }) => isActive ? "bg-active" : "bg-not-active"}
            >
                <FontAwesomeIcon className="icon-navigation" icon={faShop} />
                Mon magasin
            </NavLink>
            <NavLink
                to='/mon-compte/societes'
                className={({ isActive }) => isActive ? "bg-active" : "bg-not-active"}
            >
                <FontAwesomeIcon className="icon-navigation" icon={faBuilding} />
                Ma société
            </NavLink>
            <NavLink
                to='/mon-compte/parametres'
                className={({ isActive }) => isActive ? "bg-active" : "bg-not-active"}
            >
                <FontAwesomeIcon className="icon-navigation" icon={faGear} />
                Paramètres
            </NavLink>
        </div>
    );
}

export default Navigation;