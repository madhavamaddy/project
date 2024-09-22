import React from 'react';
import axios from 'axios';

const Logout = ({ setToken }) => {
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                // Make a POST request to the Django logout endpoint
                await axios.post('http://localhost:8000/logout/', {}, {
                    headers: {
                        Authorization: token  // Send the token in the Authorization header
                    }
                });

                // If successful, remove token from localStorage and clear it from state
                localStorage.removeItem('token');  // Clear token from localStorage
                setToken(null);  // Clear token in parent component state
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
