import React, {useEffect, useState} from "react";
import ModalCreate from "./ModalCreate.jsx";
import {useAuth} from "../../../../Context/AuthContext.jsx";
import {findSocieteByDirigeant} from "../../../../Api/Societe.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function MyCompany({}){
    const [pageCreate, setPageCreate] = useState(false);
    const [societe, setSociete] = useState([{}]);
    const {currentUser} = useAuth();

    useEffect( () => {
        findSocieteByDirigeant(currentUser.id)
            .then(response => {
                setSociete(response)
            })

    }, []);
    console.log(societe)
    return(
        <div className="bg-navigation p-4">
            {societe ? (
                <>
                    <div className="head d-flex align-items-center mb-3">
                        <h5 className="m-0 p-0">Mes sociétés</h5>
                        <button className="rounded bg-primary-color border border-0 ms-2" onClick={() => setPageCreate(true)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>

                    <div className="row">
                        {societe.map((societe) => (
                            <div className="col-md-6" key={societe.id}>
                            <div className="card mb-2">
                                    <div className="card-body">
                                        <h6>{societe.nom}</h6>
                                        <p>{societe.statutJuridique}</p>
                                        <p>{societe.adresseSiege}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h5>Mes sociétés</h5>
                    <p>Vous n'avez pas de société, souhaitez-vous ajouter votre société ?</p>
                    <button className="w-100 mt-2 bg-primary-color border border-0 p-2"
                            onClick={() => setPageCreate(true)}>C'est parti, j'ajoute ma société !
                    </button>
                </>
            )}
            {
                pageCreate ? (
                    <>
                        <ModalCreate/>
                    </>
                ) : null}
        </div>
    )
        ;
}

export default MyCompany;
