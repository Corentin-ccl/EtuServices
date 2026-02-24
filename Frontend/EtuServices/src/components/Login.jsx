import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [askRegister, setAskRegister] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setAskRegister(false);

        if (!username || !password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: username, mot_de_passe: password }),
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (response.status === 404 && errorData.detail === "Utilisateur introuvable") {
                    setAskRegister(true);
                    throw new Error("Ce compte n'existe pas. Voulez-vous le créer ?");
                }
                if (response.status === 429) {
                    setPassword('');
                    throw new Error("🛑 " + errorData.detail);
                }

                throw new Error(errorData.detail || 'Erreur de connexion');
            }

            const data = await response.json();

            console.log(`Connexions restantes : ${data.connexions_restantes}`);

            onLogin(username, data.session_id);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async () => {
        setIsLoading(true);
        setError('');

        try {
            const regResponse = await fetch('http://localhost:8000/utilisateurs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: username, mot_de_passe: password }),
            });

            if (!regResponse.ok) {
                const errorData = await regResponse.json();
                throw new Error(errorData.detail || "Erreur lors de l'inscription");
            }

            const loginResponse = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: username, mot_de_passe: password }),
            });

            const data = await loginResponse.json();
            onLogin(username, data.session_id);

        } catch (err) {
            setError(err.message);
            setAskRegister(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <h2>Connexion</h2>

                    {error && <p className="error" style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

                    <div className="form-group">
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Votre nom d'utilisateur"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Votre mot de passe"
                            disabled={isLoading}
                        />
                    </div>

                    {askRegister ? (
                        <div style={{ marginTop: '15px', padding: '10px', border: '1px solid orange', borderRadius: '5px' }}>
                            <p style={{ marginBottom: '10px' }}>Confirmez-vous la création de ce compte ?</p>
                            <button type="button" onClick={handleRegister} disabled={isLoading} style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}>
                                Oui, m'inscrire
                            </button>
                            <button type="button" onClick={() => setAskRegister(false)} disabled={isLoading}>
                                Annuler
                            </button>
                        </div>
                    ) : (
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Chargement...' : 'Se connecter'}
                        </button>
                    )}

                    <div className="login-footer">
                        <p>Mot de passe oublié ? <a href="#">Réinitialiser</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}