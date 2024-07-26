import { Routes, Route } from 'react-router-dom';
import App from "../HomeComponent/App.jsx";
import MoreInfoApp from "../MoreInfoComponent/App.jsx";
import Register from "../RegisterComponent/App.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MyAccount from "../MyAccountComponent/App.jsx";
import ManageShop from "../MyAccountComponent/components/MyShop/ManageShop.jsx";
import ShopPage from "../ShopPage/ShopPage.jsx";
import {ProductProvider} from "../../Context/ProductContext.jsx";
import {CartProvider} from "../../Context/CartContext.jsx";
import Cart from "../MyAccountComponent/components/Cart/Cart.jsx";
import HomePageSearch from "../HomeSearchShop/HomePageSearch.jsx";
import MyProfil from "../MyAccountComponent/components/MyProfil/MyProfil.jsx";

function AppRouter() {
    return (
        <>
            <ToastContainer />
            <CartProvider>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/infos" element={<MoreInfoApp />} />
                <Route path="/inscription" element={<Register />} />
                <Route path="/connexion" />
                <Route path="/mon-compte/*" element={<MyAccount />} />
                <Route path="/mon-compte/magasin/:id/*" element={<ManageShop />} />
                <Route path="/profil/fermier/:id" element={<MyProfil />} />
                <Route path="/magasin/:id" element={
                    <ProductProvider>
                        <ShopPage />
                    </ProductProvider>
                } />
                <Route path="/panier" element={
                    <Cart />
                } />
                <Route path="/trouver-magasin" element={<HomePageSearch/>}/>
            </Routes>
            </CartProvider>
        </>
    );
}

export default AppRouter;
