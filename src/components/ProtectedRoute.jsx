import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRole }) => {
    const { user } = useContext(AuthContext);

    // If no user is logged in, redirect to the respective login page or home
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Role-Based Routing
    if (allowedRole && user.role !== allowedRole) {
        // If a student tries to access faculty dashboard (or vice versa)
        const redirectPath = user.role === 'student' ? '/student-dashboard' : '/faculty-dashboard';
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};
