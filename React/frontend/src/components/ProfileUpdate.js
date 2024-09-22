// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ token }) => {
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch the profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/profile/', {
                    headers: { 'Authorization': token },
                });
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile');
            }
        };
        fetchProfile();
    }, [token]);

    // Handle form inputs
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.put('http://127.0.0.1:8000/profile/', profile, {
                headers: { 'Authorization': token },
            });
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={profile.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={profile.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Profile;
