import {Routes, Route} from 'react-router-dom';
import App from "../HomeComponent/App.jsx";
import MoreInfoApp from "../MoreInfoComponent/App.jsx";
import Register from "../RegisterComponent/App.jsx";
import Login from "../LoginComponent/App.jsx";
import {AuthProvider} from "../../Context/AuthContext.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MyAccount from "../MyAccountComponent/App.jsx";

function AppRouter({}) {

    return (
        <AuthProvider>
            <ToastContainer/>
        <Routes>
            <Route path={`/`} element={<App/>}/>
            <Route path={`/infos`} element={<MoreInfoApp/>}/>
            <Route path={`/inscription`} element={<Register/>}/>
            <Route path={`/connexion`} element={<Login/>}/>
            <Route path="/mon-compte/*" element={<MyAccount />} />
        </Routes>
        </AuthProvider>
    );
}
export default AppRouter;
