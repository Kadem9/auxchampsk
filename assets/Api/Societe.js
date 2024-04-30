import {URL_API} from "../config.js";

export const createSociete = async (data) => {
    // je transforme user en IRI
    data.dirigeant = `/api/users/${data.dirigeant}`;
    const response = await fetch(`${URL_API}/societes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export const findSocieteByDirigeant = async (dirigeant) => {
    const response = await fetch(`${URL_API}/societes?dirigeant=${dirigeant}`);
    return await response.json();
}