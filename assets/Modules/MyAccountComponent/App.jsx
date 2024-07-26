import "./assets/css/style.css";
import Navigation from "./components/Navigation.jsx";
import {Route, Routes, useLocation} from "react-router-dom";
import InformationsAccount from "./components/MyAccount.jsx";
import MyShop from "./components/MyShop/MyShop.jsx";
import PageHome from "./components/PageHome.jsx";
import MyCompany from "./components/MyCompany/MyCompany.jsx";
import EditMyProfil from "./components/MyProfil/EditMyProfil.jsx";
import {useUser} from "../../Context/UserContext.jsx";
function MyAccount({}) {
    return (
        <div className="container mt-4" id="my-account">
            <h4 className="mb-4 fw-bold">Mon compte</h4>
            <div className="row">
                <div className="col-md-3">
                    <Navigation/>
                </div>
                <div className="col-md-9">
                    <Routes>
                        <Route path="/" element={<PageHome/>}/>
                        <Route path="informations-personnelles" element={<InformationsAccount/>}/>
                        <Route path="mon-magasin" element={<MyShop/>}/>
                        <Route path="societes" element={<MyCompany/>}/>
                        <Route path="mon-profil" element={<EditMyProfil/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;