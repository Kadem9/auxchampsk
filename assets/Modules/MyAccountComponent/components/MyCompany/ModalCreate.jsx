import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSociete } from "../../../../Context/SocieteContext.jsx";
import {useUser} from "../../../../Context/UserContext.jsx";

function ModalCreate({ onClose, onCreate }) {
    const {user} = useUser();
    const { createSociete } = useSociete();
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [street, setStreet] = useState("");
    const [data, setData] = useState({
        nom: "",
        statutJuridique: "",
        siret: "",
        adresseSiege: "",
        certified: false,
        dirigeant: "/api/users/" + user.id
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            adresseSiege: `${street} ${zip} ${city}`,
        }));
    }, [city, zip, street]);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSociete(data);
            toast("Votre entreprise a été ajoutée avec succès !", { type: "success" });
            onClose();
        } catch (error) {
            console.error(error);
            toast("Une erreur s'est produite lors de l'ajout de votre entreprise", { type: "error" });
        }
    };

    return (
        <div>
            <h5>Ajouter une entreprise</h5>
            <div className="alert alert-warning">
                Pour information, lorsque vous ajoutez une entreprise, vous devez attendre la validation de l'administrateur pour que votre entreprise soit visible sur la plateforme.
            </div>
            <p>Remplissez les informations ci-dessous pour inscrire une entreprise</p>

            <h6>Informations sur l'entreprise</h6>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="nom">Nom de la société</label>
                        <input type="text" className="form-control" id="nom" onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="statutJuridique">Statut juridique</label>
                        <select className="form-control" id="statutJuridique" onChange={handleChange} required>
                            <option value="SAS">SAS</option>
                            <option value="SARL">SARL</option>
                            <option value="SA">SA</option>
                            <option value="SNC">SNC</option>
                            <option value="EURL">EURL</option>
                            <option value="EI">EI</option>
                            <option value="SASU">SASU</option>
                            <option value="SCOP">SCOP</option>
                            <option value="SCIC">SCIC</option>
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="siret">Numéro de SIRET</label>
                        <input type="text" className="form-control" id="siret" onChange={handleChange} required />
                    </div>
                    <h6>Adresse du siège</h6>
                    <div className="col-md-12">
                        <label htmlFor="street">Rue</label>
                        <input type="text" className="form-control" id="street" onChange={(e) => setStreet(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="zip">Code postal</label>
                        <input type="text" className="form-control" id="zip" onChange={(e) => setZip(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city">Ville</label>
                        <input type="text" className="form-control" id="city" onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div className="col-md-12">
                        <input type="checkbox" id="certified" onChange={handleChange} />
                        <label htmlFor="certified">Je certifie que les informations fournies sont exactes</label>
                    </div>
                    <div className="col-md-12">
                        <button className="w-100 mt-2 bg-primary-color border border-0 p-2">Ajouter ma société</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalCreate;
