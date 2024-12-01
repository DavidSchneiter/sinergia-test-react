export interface Colaborador {
    id?: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    genero: string | null;
    inicioAusencia: Date | null;
    finAusencia: Date | null;
    inactivo: boolean;
    tareas: string[];
    asignaciones: Asignacion[]
}

export interface Asignacion {
    name: string;
}

export interface FormRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
