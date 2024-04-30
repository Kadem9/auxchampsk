import React, { useState } from "react";
import {useAuth} from "../../Context/AuthContext.jsx";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            await login(email, password);
        } catch (error) {
            setError("La connexion a échoué. Veuillez vérifier votre email et mot de passe.");
        }
    };

    return (
        <div id="login" className="bg-container container-fluid p-4">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h3>Formulaire de connexion</h3>
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="form-group">
                                    <label>Adresse mail</label>
                                    <input type="email" className="form-control" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label>Mot de passe</label>
                                    <input type="password" className="form-control" placeholder="Enter password" onChange={e => setPassword(e.target.value)}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Se connecter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
