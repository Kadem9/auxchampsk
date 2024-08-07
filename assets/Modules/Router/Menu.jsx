import {Link, useLocation} from 'react-router-dom';
import React, {useEffect} from "react";
import "./css/style.css";
import WithOutBar from "./Theme/WithOutBar.jsx";
import WithBar from "./Theme/WithBar.jsx";

function Menu({ theme }) {
    let location = useLocation();
    useEffect(() => {

    }, [location]);
    return (
        <>
            {location.pathname === "/" || location.pathname === "/infos" ? (
                <WithOutBar />
            ) : (
                <WithBar />
            )
            }
        </>
    );
}

export default Menu;
