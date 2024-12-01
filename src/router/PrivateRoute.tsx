import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ColaboratorProvider } from "../provider/ColaboratorContext";

interface PrivateRouteProps {
    isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
    return isAuthenticated ? (
        <ColaboratorProvider>
            <Outlet />
        </ColaboratorProvider>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
