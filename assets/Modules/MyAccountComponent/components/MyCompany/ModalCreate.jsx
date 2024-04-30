import React, {useState} from "react";
import {useAuth} from "../../../../Context/AuthContext.jsx";
import {createSociete} from "../../../../Api/Societe.js";
import {toast} from "react-toastify";

function ModalCreate() {
    const {currentUser} = useAuth();

    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [street, setStreet] = useState("");

    console.log(currentUser)



    const [data, setData] = useState({
        nom: "",
        statutJuridique: "",
        siret: "",
        adresseSiege: city + " " + zip + " " + street,
        certified: false,
        dirigeant: currentUser.id
    });
    const handleChange = (e) => {
        setData({...data, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSociete(data)
            .then(response => {
                toast("Votre entreprise a été ajoutée avec succès !", { type: "success" });
            });
        } catch (error) {
            console.error(error);
            toast("Une erreur s'est produite lors de l'ajout de votre entreprise", { type: "error" });
        }
    }

console.log(data)
  return (
    <div>
      <h5>Ajouter une entreprise</h5>
        <div className="alert alert-warning">
            Pour information, lorsque vous ajoutez une entreprise, vous devez attendre la validation de l'administrateur pour que votre entreprise soit visible sur la plateforme.
        </div>
        <p>Remplissez les informations ci-dessous pour inscrire une entreprise</p>

        <h6>Informations sur l'entreprise</h6>
        <div className="row">
            <form onSubmit={e => handleSubmit(e)}>
            <div className="col-md-12">
                <label htmlFor="name">Nom de la société</label>
                <input type="text" className="form-control" id="nom" onChange={e => handleChange(e)}/>
            </div>
            <div className="col-md-12">
                <label htmlFor="statut-juridique">Statut juridique</label>
                <select className="form-control" id="statutJuridique" onChange={e => handleChange(e)}>
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
                <input type="text" className="form-control" id="siret" onChange={e => handleChange(e)}/>
            </div>
            <h6>Adresse du siège</h6>
            <div className="col-md-12">
                <label htmlFor="street">Rue</label>
                <input type="text" className="form-control" id="street" onChange={e => setStreet(e.target.value)}/>
            </div>
            <div className="col-md-6">
                <label htmlFor="zip">Code postal</label>
                <input type="text" className="form-control" id="zip" onChange={e => setZip(e.target.value)}/>
            </div>
            <div className="col-md-6">
                <label htmlFor="city">Ville</label>
                <input type="text" className="form-control" id="city" onChange={e => setCity(e.target.value)}/>
            </div>
            <div className="col-md-12">
                <input type="checkbox" id="certified" onChange={e => handleChange(e)}/>
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