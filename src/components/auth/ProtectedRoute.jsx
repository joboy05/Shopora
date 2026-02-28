import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    
    if (!token || !userJson) {
        return <Navigate to="/login" replace />;
    }

    try {
        const user = JSON.parse(userJson);
        if (user.role !== 'ADMIN') {
            return <Navigate to="/login" replace />;
        }
    } catch (e) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
