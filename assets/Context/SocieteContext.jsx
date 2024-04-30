import React, {createContext, useContext, useEffect, useState} from 'react';
import {findSocieteByDirigeant} from "../Api/Societe.js";

const SocieteContext = createContext();
export const useSociete = () => useContext(SocieteContext);
export const SocieteProvider = ({ children, user }) => {
    const [societe, setSociete] = useState([]);
    // je transforme user en IRI
    const userIRI = `/api/users/${user.id}`;

    useEffect(() => {
        findSocieteByDirigeant(userIRI)
            .then(setSociete)
            .catch(console.error)
    }, [user])


    return (
        <SocieteContext.Provider value={{ societe }}>
            {children}
        </SocieteContext.Provider>
    )
}

