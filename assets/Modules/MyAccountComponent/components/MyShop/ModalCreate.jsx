import {useSociete} from "../../../../Context/SocieteContext.jsx";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../../../Context/AuthContext.jsx";
import {toast} from "react-toastify";
function ModalCreate() {
    const {societe} = useSociete();


    console.log(societe);
  return (
    <div>
      <h5>Création du magasin</h5>
        <div className="alert alert-warning">
            Pour information, la création d'un magasin est soumise à validation par nos équipes. Vous serez informé par mail de la validation de votre magasin.
        </div>
        <p>Remplissez les informations ci-dessous pour vous inscrire en tant que fournisseur.</p>

        <h6>Informations sur le magasin</h6>
        <div className="row">
            <div className="col-md-12">
                <label htmlFor="name">Nom du magasin</label>
                <input type="text" className="form-control" id="name"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="date">Date de démarrage d'activité</label>
                <input type="date" className="form-control" id="date"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="address">Adresse du magasin</label>
                <input type="text" className="form-control" id="address"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="description">Description du magasin</label>
                <textarea className="form-control" id="description"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="logo">Logo du magasin</label>
                <input type="file" className="form-control" id="logo"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="siret">Numéro de SIRET</label>
                <input type="text" className="form-control" id="siret"/>
            </div>
            <h6>Adresse du magasin</h6>
            <div className="col-md-12">
                <label htmlFor="street">Rue</label>
                <input type="text" className="form-control" id="street"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="zip">Code postal</label>
                <input type="text" className="form-control" id="zip"/>
            </div>
            <div className="col-md-6">
                <label htmlFor="city">Ville</label>
                <input type="text" className="form-control" id="city"/>
            </div>
            <div className="col-md-12">
                <input type="checkbox" id="certified"/>
                <label htmlFor="certified">Je certifie que les informations fournies sont exactes</label>
            </div>
            <div className="col-md-12">
                <input type="checkbox" id="cgu"/>
                <label htmlFor="cgu">J'accepte les conditions générales d'utilisation</label>
            </div>
            <div className="col-md-12">
                <button className="w-100 mt-2 bg-primary-color border border-0 p-2">Créer mon magasin</button>
            </div>
        </div>
    </div>
  );
}

export default ModalCreate;