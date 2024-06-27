import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import Menu from "../Router/Menu.jsx";
import AppRouter from "../Router/AppRouter.jsx";

export function index() {
    const root = document.getElementById("more-info");
    if (root) {
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <BrowserRouter>
                    <Menu />
                    <AppRouter />
                </BrowserRouter>
            </React.StrictMode>
        );
    }
}
