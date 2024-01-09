import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Home() {
    const navigate = useNavigate();
    const [beats, setBeats] = useState(null); // Corrected here

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        } else {
            axios.get('http://64.226.74.198:8000/api/beats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setBeats(response.data); // Corrected here
            }).catch(error => {
                console.error("Error fetching beats info", error); // Corrected error message
                navigate('/login');
            });
        }
    }, [navigate]);

    console.log(beats);

    return (
        <div>
            <h1>Home</h1>
            {/* You can map over the beats and display them here */}
        </div>
    );
}

export default Home;