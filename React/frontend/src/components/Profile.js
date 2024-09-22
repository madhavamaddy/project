// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileUpdate from './ProfileUpdate'

const Profile = ({ token }) => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/prof/', {
                    headers: { 'Authorization': token },
                });
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile');
            }
        };
        fetchProfile();
    }, [token]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Profile</h2>
            {profile ? (
                <div>
                    <p>First Name: {profile.first_name}</p>
                    <p>Last Name: {profile.last_name}</p>
                    <p>Email: {profile.email}</p>
                    
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
