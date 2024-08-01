import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('access_token');
        const userName = params.get('userName');

        if (token && userName) {
            // Store the token and userName in localStorage
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userName', userName);

            // Redirect to home or any other page
            navigate('/');
        } else {
            // Handle the case where no token is returned
            console.error('No access token or userName found');
            navigate('/');
        }
    }, [navigate]);

    return <div>Processing...</div>;
};

export default AuthCallback;
