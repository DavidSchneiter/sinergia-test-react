import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { Colaborador } from "../interfaces/formData";
import api from "../api/axios";
import axios from "axios";

interface ColaboratorContextType {
    colaborators: Colaborador[];
    selectedColaborator: Colaborador | null;
    setSelectedColaborator: (colaborador: Colaborador | null) => void;
    fetchColaborators: () => Promise<void>;
    saveColaborator: (colaborador: Colaborador) => Promise<void>;
    deleteColaborator: (colaborador: Colaborador) => Promise<void>;
    errors: string[];
    formData: Colaborador
    setFormData: (value: React.SetStateAction<Colaborador>) => void
    resetFormData: () => void;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    
}

export const ColaboratorContext = createContext<ColaboratorContextType | undefined>(undefined);

export const useColaborators = (): ColaboratorContextType => {
    const context = useContext(ColaboratorContext);
    if (!context)
        throw new Error("useColaborators debe ser usado dentro de un AuthProvider");
    return context;
};

interface ColaboratorProviderProps {
    children: ReactNode;
}

export const ColaboratorProvider: React.FC<ColaboratorProviderProps> = ({ children }) => {
    const [colaborators, setColaborators] = useState<Colaborador[]>([]);
    const [selectedColaborator, setSelectedColaborator] = useState<Colaborador | null>(null);
    const [errors, setErrors] = useState<string[]>([])
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Colaborador>({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        genero: null,
        inicioAusencia: null,
        finAusencia: null,
        inactivo: false,
        tareas: [],
        asignaciones: [],
    })
    const resetFormData = () => {
        setFormData({
            nombre: "",
            apellido: "",
            telefono: "",
            email: "",
            genero: null,
            inicioAusencia: null,
            finAusencia: null,
            inactivo: false,
            tareas: [],
            asignaciones: [],
        });
        setSelectedColaborator(null);
        setIsEditing(true);
        setErrors([]);
    }


    

    const fetchColaborators = async () => {
        const response = await api.get("/colaboradores");
        setColaborators(response.data);
    };

    const saveColaborator = async (colaborador: Colaborador) => {
        try {
            if (colaborador.id) {
                await api.put(`/colaboradores/${colaborador.id}`, colaborador);
            } else {
                await api.post("/colaboradores", colaborador);
            }
            setErrors([])
            resetFormData();
            fetchColaborators();
            
        } catch (error) {
            // console.error("Error en registro:", error);
            if (axios.isAxiosError(error) && error.response) {
                // Retorna el array de errores si existe
                if (typeof error.response.data === 'string'){
                  setErrors([error.response.data]);
                  return;
                }
                if (error && typeof error === "object") {
                    setErrors(
                        Object.values(error.response.data) || [error.message]
                    );
                }
            }
        }
    };

    const deleteColaborator = async (colaborador: Colaborador) => {
        try {
            await api.delete(`/colaboradores/${colaborador.id}`);
            resetFormData();
            fetchColaborators();
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchColaborators();
    }, []);

    const value = {
        colaborators,
        selectedColaborator,
        setSelectedColaborator,
        fetchColaborators,
        saveColaborator,
        deleteColaborator,
        errors,
        formData,
        setFormData,
        resetFormData,
        isEditing,
        setIsEditing
    };
    return (
        <ColaboratorContext.Provider value={value}>
            {children}
        </ColaboratorContext.Provider>
    );
};
