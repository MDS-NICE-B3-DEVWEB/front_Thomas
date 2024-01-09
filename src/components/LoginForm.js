import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { Link } from 'react-router-dom';


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await axios({
        method: 'get',
        url: 'http://64.226.74.198:8000/api/login',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          email: email,
          password: password
        }
      });
      if (response.data.status_code === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        setErrorMessage(response.data.status_message);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Connexion</h1>
      <div className="input-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="form-input" />
      </div>
      <div className="input-group">
        <label htmlFor="password" className="form-label">Mot de passe</label>
        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="form-input" />
      </div>
      <button type="submit">Se connecter</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        Pas encore inscrit ? <Link to="/register">Inscription</Link>
      </p>
    </form>
  );
}

export default LoginForm;