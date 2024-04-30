function StepAgriculteurInfo({handleUserData, nextStep, previousStep}) {
    return (
        <div className="row">
            <div className="col-md-12">
                <h5>Informations sur l'agriculteur</h5>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="agriculteur-name">Nom de l'entreprise</label>
                    <input type="text" className="form-control" id="agriculteur-name" name="agriculteur-name"
                           placeholder="Nom de l'exploitation"
                           onChange={(e) => handleUserData({nameOfCompany: e.target.value})}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="agriculteur-siret">Numéro de SIRET</label>
                    <input type="text" className="form-control" id="agriculteur-siret" name="agriculteur-siret"
                           placeholder="Numéro de SIRET"
                           onChange={(e) => handleUserData({siretNumber: e.target.value})}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="agriculteur-ape">Adresse du siège</label>
                    <input type="text" className="form-control" id="agriculteur-ape" name="agriculteur-ape"
                           placeholder="Code APE" onChange={(e) => handleUserData({addressSiege: e.target.value})}/>
                </div>
            </div>

            <div className="col-md-12">
                <button className="btn btn-primary" onClick={nextStep}>Valider le formulaire</button>
                <button className="btn btn-secondary" onClick={previousStep}>Précédent</button>
            </div>
        </div>
    )
}

export default StepAgriculteurInfo;