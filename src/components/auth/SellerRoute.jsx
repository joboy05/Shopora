import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Protects routes reserved for SELLER (Entreprise) role.
 * - SELLER → access granted
 * - ADMIN → also allowed (admins can see everything)
 * - USER / unauthenticated → redirected to /login
 */
const SellerRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');

    if (!token || !userJson) {
        return <Navigate to="/login" replace />;
    }

    try {
        const user = JSON.parse(userJson);
        if (user.role !== 'SELLER' && user.role !== 'ADMIN') {
            return <Navigate to="/store" replace />;
        }
    } catch (e) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default SellerRoute;
