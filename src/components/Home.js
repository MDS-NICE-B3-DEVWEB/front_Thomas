import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("No token found, redirecting to login");
            navigate('/login');
            return;
        }
    
        axios.get('http://64.226.74.198:8000/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setUser(response.data);
        }).catch(error => {
            console.error("Error fetching user info", error);
            navigate('/login');
        });
    }, [navigate]);


    return (
        <div>
            <h1>Home</h1>
            <p>Bienvenue {user && user.name}</p>
        </div>
    );
}

export default Home;