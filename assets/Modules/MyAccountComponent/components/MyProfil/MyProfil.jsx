import React, { useEffect, useState } from 'react';
import '../../assets/css/myProfil.css';
import { useParams, Link } from "react-router-dom";

function MyProfil() {
    const { id } = useParams(); // Récupération du paramètre id de l'URL
    const [fermier, setFermier] = useState(null);

    useEffect(() => {
        const fetchFermier = async () => {
            try {
                const response = await fetch(`/api/users/${id}`);
                if (response.ok) {
                    const fermier = await response.json();
                    setFermier(fermier);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des informations du fermier:", error);
            }
        };

        fetchFermier();
    }, [id]);

    return (
        <div className="information-fermer">
            <div className="image-section">
                {fermier ? (
                    <img src={`/uploads/pictureProfilUser/${fermier.pictureProfil}`} alt="Agriculteur" />
                ) : (
                    <img src="/assets/images/fermier.jpg" alt="Agriculteur" />
                )}
            </div>
            <div className="text-section">
                <h1>{fermier ? `${fermier.firstname} ${fermier.lastname}` : 'Nom de l\'utilisateur'}</h1>
                <p>{fermier ? fermier.ville : 'Ville'}</p>
                <p>⭐⭐⭐⭐⭐ (25 avis)</p>
                {fermier && fermier.presentation ? (
                    <div dangerouslySetInnerHTML={{ __html: fermier.presentation }} />
                ) : (
                    <p>Présentation non disponible.</p>
                )}
                <div className='section-button'>
                    <Link to={`/magasin/${id}`} className="btn">Voir son magasin</Link>
                    <button className="btn">Mettre un avis</button>
                </div>
            </div>
        </div>
    );
}

export default MyProfil;
