import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext.jsx";

const MagasinContext = createContext();

export const MagasinProvider = ({ children }) => {
    const { user } = useUser();
    const [magasins, setMagasins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allMagasins, setAllMagasins] = useState([]);

    useEffect(() => {
        if (user) {
            fetchMagasins(user.id);
        }
    }, [user]);

    const fetchMagasins = async (userId) => {
        try {
            const response = await fetch(`/api/magasins?user=${userId}`);
            if (!response.ok) {
                throw new Error("Impossible de récupérer les magasins.");
            }
            const data = await response.json();
            setMagasins(data);
            setLoading(false);
        } catch (error) {
            console.error("Erreur lors de la récupération des magasins:", error);
        }
    };

    const fetchAllMagasins = async () => {
        try {
            const response = await fetch(`/api/magasins`);
            if (!response.ok) {
                throw new Error("Impossible de récupérer les magasins.");
            }
            const data = await response.json();
            setAllMagasins(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des magasins:", error);
        }
    }

    const createMagasin = async (magasin) => {
        try {
            const response = await fetch(`/api/magasins`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(magasin),
            });
            if (!response.ok) {
                throw new Error("Impossible de créer le magasin.");
            }
            const newMagasin = await response.json();
            setMagasins((prevMagasins) => [...prevMagasins, newMagasin]);
        } catch (error) {
            console.error("Erreur lors de la création du magasin:", error);
        }
    };

    const updateMagasin = async (magasin) => {
        try {
            const response = await fetch(`/api/magasins/${magasin.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(magasin),
            });
            if (!response.ok) {
                throw new Error("Impossible de mettre à jour le magasin.");
            }
            const updatedMagasin = await response.json();
            setMagasins((prevMagasins) =>
                prevMagasins.map((m) => (m.id === updatedMagasin.id ? updatedMagasin : m))
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour du magasin:", error);
        }
    };

    const value = {
        magasins,
        loading,
        createMagasin,
        updateMagasin,
        fetchAllMagasins,
        allMagasins,
    };

    return (
        <MagasinContext.Provider value={value}>
            {children}
        </MagasinContext.Provider>
    );
};

export const useMagasin = () => useContext(MagasinContext);
