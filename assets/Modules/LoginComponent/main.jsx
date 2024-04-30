import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import Menu from "../Router/Menu.jsx";
import AppRouter from "../Router/AppRouter.jsx";
import {AuthProvider} from "../../Context/AuthContext.jsx";

export function index() {
    const root = document.getElementById("login");
    if (root) {
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <AuthProvider>
                <BrowserRouter>
                    <Menu theme={"theme-page"} />
                    <AppRouter />
                </BrowserRouter>
                </AuthProvider>
            </React.StrictMode>
        );
    }
}
