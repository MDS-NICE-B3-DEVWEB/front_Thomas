// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('http://64.226.74.198:8000/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setUser(response.data);
            }).catch(error => {
                console.error("Error fetching user info", error);
                localStorage.removeItem('token'); // Remove invalid token
                setUser(null); // Reset user state
            });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null); // Reset user state
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <div className="topnav" id="myTopnav">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            {user && user.roles && user.roles[0] && (
                <div>
                    {` ${user.name}`}
                    {`${user.roles[0].name}`}
                    {/* Actions spécifiques en fonction du rôle */}
                    {user.roles[0].name === 'beatmaker' && (
                        <button onClick={() => console.log('Action réservée aux Beatmakers')}>
                            Action Beatmaker
                        </button>
                    )}
                    {user.roles[0].name === 'artist' && (
                        <button onClick={() => console.log('Action réservée aux Artistes')}>
                            Action Artiste
                        </button>
                    )}
                    {/* Bouton de déconnexion */}
                    <button onClick={handleLogout}>Déconnexion</button>
                </div>
            )}
            {!user && <button onClick={handleLogout}>Déconnexion</button>}
        </div>
    );
}

export default Navbar;