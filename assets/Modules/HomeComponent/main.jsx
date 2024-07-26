import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Menu from "../Router/Menu.jsx";
import AppRouter from "../Router/AppRouter.jsx";
import { UserProvider } from "../../Context/UserContext.jsx";
import { SocieteProvider } from "../../Context/SocieteContext.jsx";
import { MagasinProvider } from "../../Context/MagasinContext.jsx";
import { ProductProvider } from "../../Context/ProductContext.jsx";
import { CategoryProvider } from "../../Context/CategoryContext.jsx";
import { CartProvider } from "../../Context/CartContext.jsx";
import {ProfileEditProvider} from "../../Context/ProfileEditContext.jsx";

export function index() {
    const root = document.getElementById("home");
    const dataUser = root ? root.getAttribute("data-user") : null;

    if (root) {
        ReactDOM.createRoot(root).render(
            <React.StrictMode>
                <BrowserRouter>
                    <UserProvider userId={dataUser}>
                        <CartProvider>
                            <SocieteProvider userId={dataUser}>
                                <MagasinProvider>
                                    <ProductProvider>
                                        <CategoryProvider>
                                            <ProfileEditProvider>
                                                <Menu theme={"home-page"} />
                                                <AppRouter />
                                            </ProfileEditProvider>
                                        </CategoryProvider>
                                    </ProductProvider>
                                </MagasinProvider>
                            </SocieteProvider>
                        </CartProvider>
                    </UserProvider>
                </BrowserRouter>
            </React.StrictMode>
        );
    }
}
