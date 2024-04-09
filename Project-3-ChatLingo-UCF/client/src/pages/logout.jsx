import React, { useEffect } from 'react';
import Auth from '../utils/auth';

const Logout = () => {
    useEffect(() => {
        Auth.logout();
        // Redirect user after logout if necessary
    }, []);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

export default Logout;
