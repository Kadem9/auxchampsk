import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import Menu from "../Router/Menu.jsx";
import AppRouter from "../Router/AppRouter.jsx";
import {AuthProvider, useAuth} from "../../Context/AuthContext.jsx";
import {SocieteProvider} from "../../Context/SocieteContext.jsx";

export function index() {
    const root = document.getElementById("my-account");
    const {currentUser} = useAuth();
    if (root) {
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <AuthProvider>
                    <SocieteProvider user={currentUser}>
                        <BrowserRouter>
                            <Menu />
                            <AppRouter />
                        </BrowserRouter>
                    </SocieteProvider>
                </AuthProvider>
            </React.StrictMode>
        );
    }
}
