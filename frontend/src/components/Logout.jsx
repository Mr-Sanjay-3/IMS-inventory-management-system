import React from 'react';
import { useHistory } from 'react-router-dom'; // For redirecting after logout
import axios from 'axios';

const Logout = () => {
    const history = useHistory();

    const handleLogout = () => {
        // Remove JWT token from localStorage (or sessionStorage)
        localStorage.removeItem('authToken'); // Or sessionStorage.removeItem('authToken')

        // Send the logout request to the backend using Axios
        axios
            .post('http://localhost:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            })
            .then((response) => {
                if (response.data.message === 'Successfully logged out') {
                    console.log('User logged out successfully');
                }
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });

        // Redirect to the login page after logout
        history.push('/login');
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;