import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { PubHeader } from './components/PubHeader';
import { Home } from './pages/Home';
import { StuLogin } from './pages/Student/StuLogin';
import { FacLogin } from './pages/Faculty/FacLogin';
import { StuDash } from './pages/Student/StuDash';
import { FacDash } from './pages/Faculty/FacDash';
import { ProtectedRoute } from './components/ProtectedRoute';

function AppRoutes() {
    const { user } = useContext(AuthContext);
    const [dark, setDark] = useState(false);
    const toggleDark = () => setDark(p => !p);

    useEffect(() => {
        document.documentElement.setAttribute('data-dark', dark ? '1' : '0');
    }, [dark]);

    const isPublicPage = !user;

    return (
        <div className={`app-wrapper`}>
            {isPublicPage && <PubHeader dark={dark} toggleDark={toggleDark} />}
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={!user ? <Home /> : <Navigate to={user.role === 'faculty' ? '/faculty-dashboard' : '/student-dashboard'} replace />} />
                <Route path="/student-login" element={!user ? <StuLogin /> : <Navigate to="/student-dashboard" replace />} />
                <Route path="/faculty-login" element={!user ? <FacLogin /> : <Navigate to="/faculty-dashboard" replace />} />

                {/* Protected: Students only */}
                <Route
                    path="/student-dashboard"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StuDash dark={dark} toggleDark={toggleDark} />
                        </ProtectedRoute>
                    }
                />

                {/* Protected: Faculty only */}
                <Route
                    path="/faculty-dashboard"
                    element={
                        <ProtectedRoute allowedRole="faculty">
                            <FacDash dark={dark} toggleDark={toggleDark} />
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}
