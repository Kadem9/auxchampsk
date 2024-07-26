import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSociete } from "../../../../Context/SocieteContext.jsx";
import { useUser } from "../../../../Context/UserContext.jsx";
import AddressAutocomplete from "./AddressAutoComplete.jsx";

function ModalCreate({ onClose, onCreate }) {
    const { societes, loading: loadingSocietes } = useSociete();
    const { user } = useUser();
    const [data, setData] = useState({
        nom: "",
        date: "",
        rue: "",
        ville: "",
        codePostal: "",
        description: "",
        logo: null,
        siret: "",
        societeId: "",
        latitude: null,
        longitude: null,
        certified: false,
        cgu: false,
        user: "/api/users/" + user.id,
    });

    const handleChange = (e) => {
        const { id, value, type, checked, files } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: type === "checkbox" ? checked : files ? files[0] : value,
        }));
    };

    const handleAddressSelected = (address) => {
        setData((prevData) => ({
            ...prevData,
            rue: address.rue,
            ville: address.ville,
            codePostal: address.codePostal,
            latitude: address.latitude,
            longitude: address.longitude,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const magasinData = {
            ...data,
            societe: `/api/societes/${data.societeId}`,
        };

        try {
            await onCreate(magasinData);
            toast("Votre magasin a été créé avec succès !", { type: "success" });
            onClose();
        } catch (error) {
            console.error(error);
            toast("Une erreur s'est produite lors de la création de votre magasin", { type: "error" });
        }
    };

    return (
        <div>
            <h5>Création du magasin</h5>
            <div className="alert alert-warning">
                Pour information, la création d'un magasin est soumise à validation par nos équipes. Vous serez informé par mail de la validation de votre magasin.
            </div>
            <p>Remplissez les informations ci-dessous pour vous inscrire en tant que fournisseur.</p>

            <h6>Informations sur le magasin</h6>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="nom">Nom du magasin</label>
                        <input type="text" className="form-control" id="nom" value={data.nom} onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="date">Date de démarrage d'activité</label>
                        <input type="date" className="form-control" id="date" value={data.date} onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="address">Ville du magasin</label>
                        <AddressAutocomplete onPlaceSelected={handleAddressSelected} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="rue">Rue</label>
                        <input type="text" className="form-control" id="rue" value={data.rue} onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="ville">Ville</label>
                        <input type="text" className="form-control" id="ville" value={data.ville} onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="codePostal">Code Postal</label>
                        <input type="text" className="form-control" id="codePostal" value={data.codePostal} onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="description">Description du magasin</label>
                        <textarea className="form-control" id="description" value={data.description} onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="siret">Numéro de SIRET</label>
                        <input type="text" className="form-control" id="siret" value={data.siret} onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="societeId">Entreprise</label>
                        <select className="form-control" id="societeId" value={data.societeId} onChange={handleChange} required>
                            <option value="">Sélectionnez une entreprise</option>
                            {!loadingSocietes && societes.map((societe) => (
                                <option key={societe.id} value={societe.id}>{societe.nom}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <input type="checkbox" id="certified" checked={data.certified} onChange={handleChange} />
                        <label htmlFor="certified">Je certifie que les informations fournies sont exactes</label>
                    </div>
                    <div className="col-md-12">
                        <input type="checkbox" id="cgu" checked={data.cgu} onChange={handleChange} />
                        <label htmlFor="cgu">J'accepte les conditions générales d'utilisation</label>
                    </div>
                    <div className="col-md-12">
                        <button className="w-100 mt-2 bg-primary-color border border-0 p-2">Créer mon magasin</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalCreate;
