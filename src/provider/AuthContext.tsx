import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { FormRegister } from "../interfaces/formData";
import api from "../api/axios";

interface User {
    id: number;
    name: string;
    email: string;
}

// Tipos para los valores del contexto
interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (user: FormRegister) => Promise<void>;
    errors: string[];
    isRegistered: boolean;
}

// Inicializamos el contexto con valores por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para acceder al contexto
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    return context;
};

// Props para el AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Componente Provider que gestiona el estado y provee el contexto
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);

    const [errors, setErrors] = useState<string[]>([]);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);

            const response = await api.post<User>("/auth/login", {
                email,
                password,
            });
            setUser(response.data);
        } catch (error) {
            // console.error("Error en registro:", error);
            if (axios.isAxiosError(error) && error.response) {
                // Retorna el array de errores si existe
                if (typeof error.response.data === "string") {
                    setErrors([error.response.data]);
                    return;
                }
                if (error && typeof error === "object") {
                    setErrors(
                        Object.values(error.response.data) || [error.message]
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async (user: FormRegister) => {
        try {
            setLoading(true);
            const response = await api.post<User>("/auth/register", user);
            setIsRegistered(true);
            setUser(response.data);
        } catch (error) {
            console.error("Error en registro:", error);
            if (axios.isAxiosError(error) && error.response) {
                // Retorna el array de errores si existe
                if (typeof error.response.data === "string") {
                    setErrors([error.response.data]);
                    return;
                }
                if (error && typeof error === "object") {
                    setErrors(
                        Object.values(error.response.data) || [error.message]
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => setUser(null);

    const value = {
        user,
        loading,
        login,
        logout,
        register,
        errors,
        isRegistered,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
