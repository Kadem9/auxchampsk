import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import Menu from "../Router/Menu.jsx";
import AppRouter from "../Router/AppRouter.jsx";
import {AuthProvider} from "../../Context/AuthContext.jsx";

export function index() {
    const root = document.getElementById("more-info");
    if (root) {
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <AuthProvider>
                <BrowserRouter>
                    <Menu />
                    <AppRouter />
                </BrowserRouter>
                </AuthProvider>
            </React.StrictMode>
        );
    }
}
