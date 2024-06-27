import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext.jsx";

const SocieteContext = createContext();

export const SocieteProvider = ({ children }) => {
    const { user } = useUser();
    const [societes, setSocietes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [magasins, setMagasins] = useState([]);

    useEffect(() => {
        if (user) {
            fetchSocietes(user.id);
            fetchMagasins();
        }
    }, [user]);

    const fetchSocietes = async (userId) => {
        try {
            const response = await fetch(`/api/societes?dirigeant=${userId}`);
            if (!response.ok) {
                throw new Error("Impossible de récupérer les sociétés.");
            }
            const data = await response.json();
            setSocietes(data);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des sociétés:", error);
        }
    };

    const fetchMagasins = async () => {
        try {
            const response = await fetch(`/api/magasins`);
            if (!response.ok) {
                throw new Error("Impossible de récupérer les magasins.");
            }
            const data = await response.json();
            setMagasins(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des magasins:", error);
        }
    };

    const createSociete = async (societe) => {
        try {
            const response = await fetch(`/api/societes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(societe),
            });
            if (!response.ok) {
                throw new Error("Impossible de créer la société.");
            }
            const newSociete = await response.json();
            setSocietes((prevSocietes) => [...prevSocietes, newSociete]);
        } catch (error) {
            console.error("Erreur lors de la création de la société:", error);
        }
    };

    const updateSociete = async (societe) => {
        try {
            const response = await fetch(`/api/societes/${societe.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(societe),
            });
            if (!response.ok) {
                throw new Error("Impossible de mettre à jour la société.");
            }
            const updatedSociete = await response.json();
            setSocietes((prevSocietes) =>
                prevSocietes.map((s) => (s.id === updatedSociete.id ? updatedSociete : s))
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la société:", error);
        }
    };

    const canDeleteSociete = (id) => {
        const iri = `/api/societes/${id}`;
        const magasinsAssocies = magasins.filter((magasin) => magasin.societe === iri && magasin.status !== 4);
        return magasinsAssocies.length === 0;
    };

    const deleteSociete = async (id) => {
        if (!canDeleteSociete(id)) {
            throw new Error("Impossible de supprimer la société. Des magasins associés existent et ne sont pas supprimés.");
        }

        try {
            const response = await fetch(`/api/societes/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Impossible de supprimer la société.");
            }
            setSocietes((prevSocietes) => prevSocietes.filter((s) => s.id !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression de la société:", error);
        }
    };

    const value = {
        societes,
        loading,
        createSociete,
        updateSociete,
        deleteSociete,
        canDeleteSociete,
    };

    return (
        <SocieteContext.Provider value={value}>
            {children}
        </SocieteContext.Provider>
    );
};

export const useSociete = () => useContext(SocieteContext);
