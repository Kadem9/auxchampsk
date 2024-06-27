import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Menu from "../Router/Menu.jsx";
import { UserProvider } from "../../Context/UserContext.jsx";

export function index() {
    const root = document.getElementById("shop-market");
    const dataUser = root ? root.getAttribute("data-user") : null;

    if (root) {
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <BrowserRouter>
                    <UserProvider userId={dataUser}>
                                <Menu theme={"home-page"} />
                                <AppRouter />
                    </UserProvider>
                </BrowserRouter>
            </React.StrictMode>
        );
    }
}
