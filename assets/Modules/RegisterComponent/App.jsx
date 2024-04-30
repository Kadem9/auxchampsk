import "./assets/css/style.css";
import React, {useState} from "react";
import StepGeneral from "./components/StepGeneral.jsx";
import NavigationBreadCrumb from "./components/NavigationBreadCrumb.jsx";
import StepUserInfo from "./components/SameInfos/StepUserInfo.jsx";
import StepAgriculteurInfo from "./components/Agriculteurs/StepAgriculteurInfo.jsx";
import StepClientInfo from "./components/Client/StepClientInfo.jsx";
import {CreateUser} from "../../Api/User.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function Register({}) {
    let navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({}); // je stocke les données de l'utilisateur

    const nextStep = () => setStep(step + 1);
    const previousStep = () => step > 1 && setStep(step - 1); // on ne peut pas revenir en dessous de l'étape 1

    const handleUserData = (newData) => {
        setUserData({ ...userData, ...newData });
    };

    const handleSubmitForm = () => {
        CreateUser(userData).then(r => {
                navigate("/connexion");
                toast("Votre compte a bien été créé, vous pouvez maintenant vous connecter !", {
                    type: "success",
                })
        }
        )
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <StepGeneral handleUserData={handleUserData} nextStep={nextStep} />;
            case 2:
                return <StepUserInfo handleUserData={handleUserData} nextStep={nextStep} previousStep={previousStep} userData={userData} />;
            case 3:
                if (userData.typeUser === "Agriculteur") {
                    return <StepAgriculteurInfo handleUserData={handleUserData} nextStep={handleSubmitForm} previousStep={previousStep}  />;
                } else {
                    return <StepClientInfo handleUserData={handleUserData} nextStep={nextStep} previousStep={previousStep} />;
                }
            default:
                return <div>Fin du formulaire</div>;
        }
    };

    console.log(userData)

    return (
        <div id="register" className="bg-container container-fluid p-4">
            <h4>Formulaire d'inscription</h4>
            <p className="user-has-account">J'ai déjà un compte, je souhaite me connecter !</p>
            <div className="row">
                <div className="col-md-12 justify-content-center">
                    <NavigationBreadCrumb/>
                </div>
                <div className="col-md-12">
                    {renderStep()}
                </div>
            </div>


        </div>
    );
}

export default Register;