import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faFileImage, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function PageHome() {
  return (
      <div className="bg-navigation p-4">
          <h5>Bienvenue sur votre espace personnel</h5>
            <p>Vous pouvez ici gérer vos informations personnelles et celles de votre société</p>
            <p>Vous pouvez également consulter les informations de votre magasin</p>
      </div>
  );
}

export default PageHome;