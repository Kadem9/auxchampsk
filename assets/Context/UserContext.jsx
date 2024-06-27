import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ userId, children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (userId) {
            findUser(userId);
        }
    }, [userId]);

    const findUser = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}`);
            if (!response.ok) {
                throw new Error("Impossible de récupérer les informations de l'utilisateur.");
            }
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails de l'utilisateur:", error);
        }
    };

    const updateUser = async (updatedUser) => {
        try {
            const response = await fetch(`/api/users/${updatedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error("Impossible de mettre à jour les informations de l'utilisateur.");
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Erreur lors de la mise à jour des détails de l'utilisateur:", error);
        }
    };

    const value = {
        user,
        findUser,
        updateUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
