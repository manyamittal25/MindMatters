import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('access_token');

        if (token) {
            // Store the token in localStorage or a state management library
            localStorage.setItem('jwtToken', token);

            // Redirect to a specific page (e.g., dashboard, home, or protected route)
            navigate('/'); // Change '/protected' to the route you want to redirect to
        } else {
            // Handle the case where no token is returned
            console.error('No access token found');
            navigate('/'); // Redirect to home or another fallback route
        }
    }, [navigate]);

    return <div>Processing...</div>;
};

export default AuthCallback;
