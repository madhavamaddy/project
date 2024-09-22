// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';
import Logout from './components/Logout';
import Register from './components/Register';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <div className="App">
            {!token ? (
                <Login setToken={setToken} />
            ) : (
                <>
                    <Profile token={token} />
                    
                    <Logout setToken={setToken} />
                </>
            )}
        </div>
    );
}

export default App;

