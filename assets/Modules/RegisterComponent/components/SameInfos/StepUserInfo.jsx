import React, {useState} from 'react';

function StepUserInfo({handleUserData, nextStep, previousStep, userData}){
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!userData.firstname) newErrors.nom = "Le nom est requis";
        if (!userData.lastname) newErrors.prenom = "Le prénom est requis";
        if (!userData.email) newErrors.email = "L'email est requis";
        if (!userData.phoneNumber) newErrors.telephone = "Le téléphone est requis";
        if (!userData.plainPassword || userData.plainPassword.length < 6) newErrors.plainPassword = "Mot de passe trop court (6 caractères minimum)";
        if (userData.plainPassword !== userData.password_confirmation) newErrors.password_confirmation = "Les mots de passe ne correspondent pas";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            nextStep();
        }
    };

    const handleChange = (e) => {
        handleUserData({ [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    return(
        <div className="row">
            {userData.typeUser === "Agriculteur" && (
                <div className="col-md-6 col-12">
                    <div className="form-group">
                        <label htmlFor="picture">Photo de profil</label>
                        <input type="file" className="form-control" id="picture" name="picture" onChange={(e) => handleUserData({pictureProfil: e.target.files[0]})}/>
                        {errors.picture && <p style={{color: 'red'}}>{errors.picture}</p>}
                    </div>
                </div>
            )}
            <div className="col-md-6 col-12">
                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" className="form-control" id="nom" name="nom" onChange={(e) => handleUserData({lastname: e.target.value})}/>
                    {errors.nom && <p style={{color: 'red'}}>{errors.nom}</p>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" className="form-control" id="prenom" name="prenom" onChange={(e) => handleUserData({firstname: e.target.value})}/>
                    {errors.prenom && <p style={{color: 'red'}}>{errors.prenom}</p>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={(e) => handleUserData({email: e.target.value})}/>
                    {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="telephone">Téléphone</label>
                    <input type="text" className="form-control" id="telephone" name="telephone" onChange={(e) => handleUserData({phoneNumber: e.target.value})}/>
                    {errors.telephone && <p style={{color: 'red'}}>{errors.telephone}</p>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={(e) => handleUserData({plainPassword: e.target.value})}/>
                    {errors.password && <p style={{color: 'red'}}>{errors.plainPassword}</p>}
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="password_confirmation">Confirmation du mot de passe</label>
                    <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" onChange={(e) => handleUserData({password_confirmation: e.target.value})}/>
                    {errors.password_confirmation && <p style={{color: 'red'}}>{errors.password_confirmation}</p>}
                </div>
            </div>
            <div className="col-md-12">
                <button className="btn btn-primary" onClick={handleSubmit}>Suivant</button>
                <button className="btn btn-secondary" onClick={previousStep}>Précédent
                </button>
            </div>
        </div>
    )
}

export default StepUserInfo;