import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AuthLayout = () => {
    const { logout } = useAuth();

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default AuthLayout;
