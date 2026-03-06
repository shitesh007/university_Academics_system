import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null
    );

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
        try {
            const response = await fetch(`${API_URL}/token/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.status === 200) {
                const decoded = jwtDecode(data.access);
                setAuthTokens(data);
                setUser(decoded);
                localStorage.setItem('authTokens', JSON.stringify(data));
                toast.success(`Welcome back, ${decoded.name}! 👋`);
                // Role-based redirect
                navigate(decoded.role === 'faculty' ? '/faculty-dashboard' : '/student-dashboard');
                return { success: true };
            } else {
                toast.error('Invalid credentials. Please try again.');
                return { success: false };
            }
        } catch (err) {
            toast.error('Connection error. Is the server running?');
            return { success: false };
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        toast.success('You have been logged out successfully.');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
