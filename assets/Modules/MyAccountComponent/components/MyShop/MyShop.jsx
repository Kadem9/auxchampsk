import React, { useState } from "react";
import ModalCreate from "./ModalCreate.jsx";
import ModalDelete from "./ModalDelete.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClock, faCheckCircle, faBan, faTrashAlt, faTimesCircle, faQuestionCircle, faStore } from "@fortawesome/free-solid-svg-icons";
import { useMagasin } from "../../../../Context/MagasinContext.jsx";
import Modal from "../../../Utils/Modal.jsx";
import { Link } from "react-router-dom";
import "./css/MyShop.css";

const statusMessages = {
    0: { text: "En attente d'activation", icon: faClock, color: "warning" },
    1: { text: "Activé", icon: faCheckCircle, color: "success" },
    2: { text: "Désactivé", icon: faBan, color: "secondary" },
    3: { text: "En attente de suppression", icon: faTimesCircle, color: "warning" },
    4: { text: "Supprimé", icon: faTrashAlt, color: "danger" }
};

function MyShop() {
    const { magasins, loading, createMagasin, updateMagasin } = useMagasin();
    const [pageCreate, setPageCreate] = useState(false);
    const [deleteMagasin, setDeleteMagasin] = useState(null);
    const handleDelete = async (id) => {
        const magasinToUpdate = magasins.find((magasin) => magasin.id === id);
        if (magasinToUpdate) {
            magasinToUpdate.status = 3;
            await updateMagasin(magasinToUpdate);
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    const getStatusMessage = (status) => {
        return statusMessages[status] || { text: "Statut inconnu", icon: faQuestionCircle, color: "dark" };
    };

    return (
        <div className="bg-navigation p-4">
            {magasins.length > 0 ? (
                <>
                    <div className="head d-flex align-items-center mb-3">
                        <h5 className="m-0 p-0">Mes magasins</h5>
                        <button className="rounded bg-primary-color border border-0 ms-2" onClick={() => setPageCreate(true)}>
                            <FontAwesomeIcon icon={faPlus} /> Créer
                        </button>
                    </div>
                    <div className="row">
                        {magasins.map((magasin) => {
                            const statusMessage = getStatusMessage(magasin.status);
                            return (
                                <div className="col-md-12 " key={magasin.id}>
                                    <div className="card-shop bg-myshop mb-2">
                                        <div className="info-shop">
                                            <h5 className="mb-2">
                                                {magasin.nom}
                                                <p className={`badge-shop badge bg-${statusMessage.color}`}>
                                                    <FontAwesomeIcon icon={statusMessage.icon}/> {statusMessage.text}
                                                </p>
                                            </h5>
                                            <p className="description-shop">{magasin.description}</p>
                                        </div>
                                        <div className="actions-shop">

                                        <Link to={`/mon-compte/magasin/${magasin.id}`}
                                                  className="acced-shop">
                                                Accéder au magasin
                                            </Link>
                                                {magasin.status === 1 && ( // Afficher le bouton de suppression uniquement si le magasin est activé
                                                    <button className="delete-shop"
                                                            onClick={() => setDeleteMagasin(magasin)}>
                                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                                    </button>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <>
                    <h5>Mes magasins</h5>
                    <p>Vous n'avez pas de magasin, souhaitez-vous créer votre propre magasin ?</p>
                    <button className="w-100 mt-2 bg-primary-color border border-0 p-2"
                            onClick={() => setPageCreate(true)}>
                        C'est parti, je crée mon magasin !
                    </button>
                </>
            )}
            {pageCreate && (
                <Modal onClose={() => setPageCreate(false)}>
                    <ModalCreate onClose={() => setPageCreate(false)} onCreate={createMagasin} />
                </Modal>
            )}
            {deleteMagasin && (
                <ModalDelete
                    magasin={deleteMagasin}
                    onClose={() => setDeleteMagasin(null)}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}

export default MyShop;
