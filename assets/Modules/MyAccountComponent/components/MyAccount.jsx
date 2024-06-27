import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { faEnvelope, faFileImage, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import {useUser} from "../../../Context/UserContext.jsx";

function InformationsAccount() {
    const { user, updateUser } = useUser();
    const [formData, setFormData] = useState({
        email: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        profilePicture: null,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || "",
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                phoneNumber: user.phoneNumber || "",
                profilePicture: null,
            });
        }
    }, [user]);

    const handleChange = (event) => {
        const { id, value, files } = event.target;
        if (files) {
            setFormData((prevData) => ({ ...prevData, [id]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [id]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedUser = {
            ...user,
            email: formData.email,
            firstname: formData.firstname,
            lastname: formData.lastname,
            phoneNumber: formData.phoneNumber,
        };

        try {
            await updateUser(updatedUser);
            toast("Vos informations ont été mises à jour avec succès !", { type: "success" });
        } catch (error) {
            console.error("Erreur lors de la mise à jour des détails de l'utilisateur:", error);
            toast("Erreur lors de la mise à jour des informations.", { type: "error" });
        }
    };

    return (
        <div className="bg-navigation p-4">
            <h5>Mon compte</h5>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-2">
                        <FontAwesomeIcon className="me-1 icon-color" icon={faEnvelope} />
                        <label className="mb-1" htmlFor="email">Adresse mail</label>
                        <input type="text" className="form-control" id="email" value={formData.email} onChange={handleChange} disabled />
                    </div>
                    <div className="col-md-6 mb-2">
                        <FontAwesomeIcon className="me-1 icon-color" icon={faFileImage} />
                        <label className="mb-1" htmlFor="profilePicture">Photo de profil</label>
                        <input type="file" className="form-control" id="profilePicture" onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-2">
                        <FontAwesomeIcon className="me-1 icon-color" icon={faUser} />
                        <label className="mb-1" htmlFor="firstname">Prénom</label>
                        <input type="text" className="form-control" id="firstname" value={formData.firstname} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-2">
                        <FontAwesomeIcon className="me-1 icon-color" icon={faUser} />
                        <label className="mb-1" htmlFor="lastname">Nom</label>
                        <input type="text" className="form-control" id="lastname" value={formData.lastname} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-2">
                        <FontAwesomeIcon className="me-1 icon-color" icon={faPhone} />
                        <label className="mb-1" htmlFor="phoneNumber">Téléphone</label>
                        <input type="tel" className="form-control" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className="w-100 mt-2 bg-primary-color border border-0 p-1">Modifier</button>
            </form>
        </div>
    );
}

export default InformationsAccount;
