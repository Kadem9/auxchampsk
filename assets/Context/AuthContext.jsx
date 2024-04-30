import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const fetchUserDetails = async (email) => {
        try {
            const response = await fetch(`/api/me/${email}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error("Impossible de récupérer les informations de l'utilisateur.");
            }

            const userData = await response.json();
            setCurrentUser(userData); 
        } catch (error) {
            console.error("Erreur lors de la récupération des détails de l'utilisateur:", error);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('/authentication_token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Problème d'authentification");
            }

            const data = await response.json();
            setToken(data.token);
            localStorage.setItem('token', data.token);

            const decoded = jwtDecode(data.token); 
            await fetchUserDetails(decoded.email);

            navigate('/'); // Redirection après la connexion réussie
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/connexion');
    };

    const updateUser = async (updates) => {
        try {
            const response = await fetch(`/api/users/${currentUser.id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/merge-patch+json',
                },
                body: JSON.stringify(updates),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erreur HTTP: ${response.status}, ${errorData.detail}`);
            }

            const updatedUser = await response.json();
            setCurrentUser(prev => ({ ...prev, ...updates }));
        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations de l'utilisateur:", error);
        }
    };


    const value = { currentUser, token, login, logout, updateUser };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
