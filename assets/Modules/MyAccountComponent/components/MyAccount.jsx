import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faEnvelope, faFileImage, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../../Context/AuthContext.jsx";
import {toast} from "react-toastify";


function InformationsAccount({}){
    const {currentUser, updateUser } = useAuth();

    const handleChange = async (event) => {
        event.preventDefault();

        // Collecter les valeurs des champs
        const firstname = event.target.firstname.value;
        const lastname = event.target.lastname.value;
        const telephone = event.target.telephone.value;

        // Appeler updateUser avec les nouvelles informations
        await updateUser({ firstname, lastname, phoneNumber: telephone });
        toast("Vos informations ont été mises à jour avec succès !", { type: "success" });
    };

    return(
       <div className="bg-navigation p-4">
           <h5>Mon compte</h5>
           <form onSubmit={event => handleChange(event)}>
               <div className="row">
                   <div className="col-md-6 mb-2">
                       <FontAwesomeIcon className="me-1 icon-color" icon={faEnvelope}/>
                       <label className="mb-1" htmlFor="email">Adresse mail</label>
                       <input type="text" className="form-control" id="email" defaultValue={currentUser.email} disabled/>
                   </div>
                   <div className="col-md-6 mb-2">
                       <FontAwesomeIcon className="me-1 icon-color" icon={faFileImage}/>
                       <label className="mb-1" htmlFor="file">Photo de profil</label>
                       <input type="file" className="form-control" id="file"/>
                   </div>
                   <div className="col-md-6 mb-2">
                       <FontAwesomeIcon className="me-1 icon-color" icon={faUser}/>
                       <label className="mb-1" htmlFor="firstname">Prénom</label>
                       <input type="text" className="form-control" id="firstname" defaultValue={currentUser.firstname}/>
                   </div>
                   <div className="col-md-6 mb-2">
                       <FontAwesomeIcon className="me-1 icon-color" icon={faUser}/>
                       <label className="mb-1" htmlFor="lastname">Nom</label>
                       <input type="text" className="form-control" id="lastname" defaultValue={currentUser.lastname}/>
                   </div>
                   <div className="col-md-6 mb-2">
                       <FontAwesomeIcon className="me-1 icon-color" icon={faPhone}/>
                       <label className="mb-1" htmlFor="telephone">Téléphone</label>
                       <input type="text" className="form-control" id="telephone" defaultValue={currentUser.phoneNumber}/>
                   </div>
               </div>
                <button type="submit" className="w-100 mt-2 bg-primary-color border border-0 p-1">Modifier</button>
           </form>
       </div>

    )
}

export default InformationsAccount;