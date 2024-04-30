import React, {useState} from "react";
import ModalCreate from "./ModalCreate.jsx";

function MyShop({}){
    const [pageCreate, setPageCreate] = useState(false);

    return(
        <div className="bg-navigation p-4">
            {!pageCreate ? (
                <>
                    <h5>Mes magasins</h5>
                    <p>Vous n'avez pas de magasin, souhaitez-vous créer votre propre magasin ?</p>
                    <button className="w-100 mt-2 bg-primary-color border border-0 p-2"
                            onClick={() => setPageCreate(true)}>C'est parti, je créer mon magasin !
                    </button>
                </>
            ) : (
                <ModalCreate/>
            )}
        </div>
    );
}

export default MyShop;
