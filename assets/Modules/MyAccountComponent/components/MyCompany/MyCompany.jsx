import React, { useState } from "react";
import ModalCreate from "./ModalCreate.jsx";
import ModalEdit from "./ModalEdit.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus, faEdit, faTrash, faLocationDot, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import { useSociete } from "../../../../Context/SocieteContext.jsx";
import { toast } from "react-toastify";
import Modal from "../../../Utils/Modal.jsx";
import "../MyShop/css/MyShop.css";

function MyCompany() {
    const { societes, loading, createSociete, updateSociete, deleteSociete, canDeleteSociete } = useSociete();
    const [pageCreate, setPageCreate] = useState(false);
    const [editSociete, setEditSociete] = useState(null);

    const handleDelete = async (id) => {
        if (!canDeleteSociete(id)) {
            toast("Impossible de supprimer la société. Des magasins associés existent et ne sont pas supprimés.", { type: "error" });
            return;
        }

        try {
            await deleteSociete(id);
            toast("Société supprimée avec succès", { type: "success" });
        } catch (error) {
            toast("Erreur lors de la suppression de la société", { type: "error" });
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="bg-navigation p-4">
            {societes.length > 0 ? (
                <>
                    <div className="head d-flex align-items-center mb-3">
                        <h5 className="m-0 p-0">Mes sociétés</h5>
                        <button className="rounded bg-primary-color border border-0 ms-2" onClick={() => setPageCreate(true)}>
                            <FontAwesomeIcon icon={faPlus} /> Ajouter
                        </button>
                    </div>

                    <div className="row">
                        {societes.map((societe) => (
                            <div className="col-md-12" key={societe.id}>
                                <div className="card-shop bg-myshop mb-2">
                                    <div className="info-shop">
                                        <h5 className="mb-2">{societe.nom}</h5>
                                            <p className="p-icon-left">
                                                <FontAwesomeIcon icon={faCircleInfo} />
                                                {societe.statutJuridique}
                                            </p>
                                            <p className="p-icon-left">
                                                <FontAwesomeIcon className="mr-3" icon={faLocationDot} />
                                                {societe.adresseSiege}
                                            </p>
                                    </div>
                                        <div className="actions-shop">
                                            <button className="btn-edit"
                                                    onClick={() => setEditSociete(societe)}>
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </button>
                                            <button className="btn-delete" onClick={() => handleDelete(societe.id)}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>
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
                    <button className="w-100 mt-2 bg-primary-color border border-0 p-2" onClick={() => setPageCreate(true)}>
                        C'est parti, j'ajoute ma société !
                    </button>
                </>
            )}
            {pageCreate && (
                <Modal onClose={() => setPageCreate(false)}>
                    <ModalCreate onClose={() => setPageCreate(false)} onCreate={createSociete} />
                </Modal>
            )}
            {editSociete && (
                <Modal onClose={() => setEditSociete(null)}>
                    <ModalEdit societe={editSociete} onClose={() => setEditSociete(null)} onSave={updateSociete} />
                </Modal>
            )}
        </div>
    );
}

export default MyCompany;
