import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext.jsx";

const ProfileEditContext = createContext();

export const ProfileEditProvider = ({ children }) => {
    const { user } = useUser();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            fetchProfile(user.id);
        }
    }, [user]);

    const fetchProfile = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}`);
            if (!response.ok) {
                throw new Error("Impossible de récupérer les informations de l'utilisateur.");
            }
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails de l'utilisateur:", error);
        }
    };

    const updateProfile = async (formData) => {
        try {
            const response = await fetch(`/api/edit/profil/${user.id}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Impossible de mettre à jour les informations de l'utilisateur.");
            }

            const data = await response.json();
            setProfile((prevProfile) => ({ ...prevProfile, ...data }));
        } catch (error) {
            console.error("Erreur lors de la mise à jour des détails de l'utilisateur:", error);
        }
    };

    const value = {
        profile,
        fetchProfile,
        updateProfile,
    };

    return (
        <ProfileEditContext.Provider value={value}>
            {children}
        </ProfileEditContext.Provider>
    );
};

export const useProfileEdit = () => useContext(ProfileEditContext);
