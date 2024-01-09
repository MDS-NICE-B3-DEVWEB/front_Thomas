import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisterForm.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            console.log({ name, email, password, role });
            const response = await axios.post('http://64.226.74.198:8000/api/register', { name, email, password, role }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status_code === 200) {
                navigate('/login');
            } else {
                setErrorMessage(response.data.status_message);
            }
        } catch (error) {
            setErrorMessage("Une erreur est survenue lors de l'inscription");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <h1>Inscription</h1>
            <div className="input-group">
                <label htmlFor="name" className="form-label">Nom</label>
                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required className="form-input" />
            </div>
            <div className="input-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="form-input" />
            </div>

            <div className="input-group">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="form-input" />
            </div>

            <div className="input-group">
                <label htmlFor="role" className="form-label">Rôle </label>
                <select id="role" value={role} onChange={e => setRole(e.target.value)} required className="form-input">
                    <option value="">Sélectionnez un rôle</option>
                    <option value="Artist">Artiste</option>
                    <option value="Beatmaker">Beatmaker</option>
                </select>
            </div>
            <button type="submit" className="form-button">S'inscrire</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>
                Vous êtes déjà inscrit ? <Link to="/login">Connexion</Link>
            </p>
        </form>
    );
}

export default RegisterForm;