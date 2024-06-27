import "./assets/css/style.css";
import Header from "./components/Header.jsx";
import {useUser} from "../../Context/UserContext.jsx";

function App({}) {
    return (
        <div id="index">
            <Header />
        </div>
    );
}

export default App;