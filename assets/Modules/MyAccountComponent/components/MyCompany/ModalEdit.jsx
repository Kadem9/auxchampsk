import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function ModalEdit({ societe, onClose, onSave }) {
    const [data, setData] = useState({
        id: societe.id,
        nom: societe.nom,
        statutJuridique: societe.statutJuridique,
        siret: societe.siret,
        adresseSiege: societe.adresseSiege,
        certified: societe.certified,
    });

    useEffect(() => {
        setData({
            id: societe.id,
            nom: societe.nom,
            statutJuridique: societe.statutJuridique,
            siret: societe.siret,
            adresseSiege: societe.adresseSiege,
            certified: societe.certified,
        });
    }, [societe]);

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
            await onSave(data);
            toast("Votre entreprise a été mise à jour avec succès !", { type: "success" });
            onClose();
        } catch (error) {
            console.error(error);
            toast("Une erreur s'est produite lors de la mise à jour de votre entreprise", { type: "error" });
        }
    };

    return (
        <div>
            <h5>Modifier une entreprise</h5>
            <div className="alert alert-warning">
                Pour information, lorsque vous modifiez une entreprise, vous devez attendre la validation de l'administrateur pour que les modifications soient visibles sur la plateforme.
            </div>
            <p>Modifiez les informations ci-dessous pour mettre à jour une entreprise</p>

            <h6>Informations sur l'entreprise</h6>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        <label htmlFor="nom">Nom de la société</label>
                        <input type="text" className="form-control" id="nom" value={data.nom} onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="statutJuridique">Statut juridique</label>
                        <select className="form-control" id="statutJuridique" value={data.statutJuridique} onChange={handleChange} required>
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
                        <input type="text" className="form-control" id="siret" value={data.siret} onChange={handleChange} required />
                    </div>
                    <h6>Adresse du siège</h6>
                    <div className="col-md-12">
                        <label htmlFor="adresseSiege">Adresse du siège</label>
                        <input type="text" className="form-control" id="adresseSiege" value={data.adresseSiege} onChange={handleChange} required />
                    </div>
                    <div className="col-md-12">
                        <input type="checkbox" id="certified" checked={data.certified} onChange={handleChange} />
                        <label htmlFor="certified">Je certifie que les informations fournies sont exactes</label>
                    </div>
                    <div className="col-md-12">
                        <button className="w-100 mt-2 bg-primary-color border border-0 p-2">Modifier ma société</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEdit;
