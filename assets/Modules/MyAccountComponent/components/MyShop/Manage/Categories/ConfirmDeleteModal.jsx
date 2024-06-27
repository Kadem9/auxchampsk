import React from "react";
import Modal from "../../../../../Utils/Modal.jsx";

function ConfirmDeleteModal({ onClose, onConfirm, categoryName }) {
    return (
        <Modal onClose={onClose}>
            <div>
                <h5>Confirmation de suppression</h5>
                <p>Êtes-vous sûr de vouloir supprimer la catégorie "{categoryName}" ? Les produits associés ne seront plus visibles par les utilisateurs.</p>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-secondary me-2" onClick={onClose}>Annuler</button>
                    <button className="btn btn-danger" onClick={onConfirm}>Supprimer</button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmDeleteModal;
