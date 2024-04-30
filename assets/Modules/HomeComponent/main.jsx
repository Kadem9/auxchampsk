import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import Menu from "../Router/Menu.jsx";
import AppRouter from "../Router/AppRouter.jsx";
import {AuthProvider} from "../../Context/AuthContext.jsx";

export function index() {
    const root = document.getElementById("home");
    if (root) {
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <BrowserRouter>
                    <AuthProvider>
                    <Menu theme={"home-page"}/>
                    <AppRouter />
                    </AuthProvider>
                </BrowserRouter>
            </React.StrictMode>
        );
    }
}
