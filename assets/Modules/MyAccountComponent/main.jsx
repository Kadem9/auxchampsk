import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Menu from "../Router/Menu.jsx";
import AppRouter from "../Router/AppRouter.jsx";
import { UserProvider } from "../../Context/UserContext.jsx";

export function index() {
    const root = document.getElementById("my-account");
    const dataUser = root ? root.getAttribute("data-user") : null;
    if (root) {
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <BrowserRouter>
                    <UserProvider userId={dataUser}>
                        <Menu theme={"other-page"} />
                        <AppRouter />
                    </UserProvider>
                </BrowserRouter>
            </React.StrictMode>
        );
    }
}
