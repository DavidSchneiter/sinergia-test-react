import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "../auth/pages/Login";
import RegisterPage from "../auth/pages/Register";
import HomePage from "../home/pages/HomePage";
import PersonalPage from "../personal/PersonalPage";
import CalendarPage from "../calendar/pages/CalendarPage";
import { useAuth } from "../provider/AuthContext";

const RouterApp: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user) setIsAuthenticated(true);
        console.log(user)
    }, [user]);


    return (
        <Router>
            <Routes>
                {/* Rutas Públicas */}
                <Route element={<PublicRoute />}>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* Rutas Privadas */}
                <Route
                    element={<PrivateRoute isAuthenticated={isAuthenticated} />}
                >
                    <Route path="/" element={<HomePage />} />
                    <Route path="/personal" element={<PersonalPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                </Route>

                {/* Redirección por defecto */}
                <Route
                    path="*"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/" />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default RouterApp;
