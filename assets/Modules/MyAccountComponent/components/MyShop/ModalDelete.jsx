import React from "react";
import { toast } from "react-toastify";
import Modal from "../../../Utils/Modal.jsx";

function ModalDelete({ magasin, onClose, onDelete }) {
    const handleConfirm = async () => {
        try {
            await onDelete(magasin.id);
            toast("Patientez, les admins vont analyser votre demande.", { type: "info" });
            onClose();
        } catch (error) {
            toast("Une erreur s'est produite lors de la demande de suppression", { type: "error" });
        }
    };

    return (
        <Modal onClose={onClose}>
            <div>
                <h5>Demande de suppression de magasin</h5>
                <p>Êtes-vous sûr de vouloir demander la suppression de votre magasin ? Cette action doit être approuvée par les administrateurs.</p>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary me-2" onClick={onClose}>Annuler</button>
                    <button className="btn btn-danger" onClick={handleConfirm}>Confirmer</button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalDelete;
