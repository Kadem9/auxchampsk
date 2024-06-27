import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import Menu from "../Router/Menu.jsx";
import AppRouter from "../Router/AppRouter.jsx";

export function index() {
    const root = document.getElementById("register");
    if (root) {
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <BrowserRouter>
                    <Menu theme={"theme-page"} />
                    <AppRouter />
                </BrowserRouter>
            </React.StrictMode>
        );
    }
}
