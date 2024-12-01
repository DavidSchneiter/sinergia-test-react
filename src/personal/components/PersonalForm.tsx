import { FunctionComponent, useEffect, useState } from "react";
import "../style/form.css";
import ModalConfirmacion from "./ModalConfirmacion";
import "react-datepicker/dist/react-datepicker.css";
import Licencia from "./Licencia";
import { useColaborators } from "../../provider/ColaboratorContext";
import { Asignacion, Colaborador } from "../../interfaces/formData";

const PersonalForm: FunctionComponent = () => {
    const {
        saveColaborator,
        selectedColaborator,
        setSelectedColaborator,
        errors,
        formData,
        setFormData,
        isEditing,
        setIsEditing,
    } = useColaborators();
    const [modalVisible, setModalVisible] = useState(false);
    const mostrarModal = () => setModalVisible(true);
    const ocultarModal = () => setModalVisible(false);
    
    const asignaciones: Asignacion[] = [
        { name: "Palabras de Apertura" },
        { name: "Temática" },
        { name: "Escenificación" },
        { name: "Palabras de Cierre" },
        { name: "Discursos" },
        { name: "Lector" },
        { name: "Ayudante" },
    ];
    useEffect(() => {
        if (selectedColaborator) {
            setFormData(selectedColaborator);
            setIsEditing(false);
        }
    }, [selectedColaborator]);

    const handleInactivoChange = () => {
        setIsEditing(!isEditing);
    };
    // Evento para cambiar el genero con un boton
    const handleGeneroChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            genero: value,
        }));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (group: "tareas", value: string) => {
        setFormData((prev) => ({
            ...prev,
            [group]: prev[group].includes(value)
                ? prev[group].filter((item) => item !== value)
                : [...prev[group], value],
        }));
    };
    const handleCheckboxChangeAsignaciones = (asignacion: Asignacion) => {
        setFormData((prev: Colaborador) => {
            const isSelected = prev.asignaciones.some(
                (a) => a.name === asignacion.name
            );

            return {
                ...prev,
                asignaciones: isSelected
                    ? prev.asignaciones.filter(
                          (a) => a.name !== asignacion.name
                      ) // Eliminar si ya estaba seleccionado
                    : [...prev.asignaciones, asignacion], // Agregar si no estaba seleccionado
            };
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        ocultarModal();
        await saveColaborator(formData);
        setSelectedColaborator(null);
    };

    return (
        <form className="form-container">
            <h2>📋 Datos Personales</h2>
            <div className="form-row">
                <input
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="input-field"
                    disabled={!isEditing}
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="input-field"
                    disabled={!isEditing}
                />
            </div>
            <div className="form-row">
                <input
                    type="tel"
                    placeholder="Celular"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="input-field"
                    disabled={!isEditing}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    disabled={!isEditing}
                />
            </div>
            {errors.length > 0 && (
                <ul style={{ color: "red" }}>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "40px",
                }}
            >
                <h3 style={{ marginRight: "20px", padding: "10px" }}>Género</h3>
                <div className="gender-buttons">
                    <input
                        type="radio"
                        id="masculino"
                        value="MASCULINO"
                        checked={isEditing && formData.genero === "MASCULINO"}
                        onChange={() => handleGeneroChange("MASCULINO")}
                        disabled={!isEditing}
                    />
                    <label htmlFor="masculino" className="gender-button">
                        Masculino
                    </label>

                    <input
                        type="radio"
                        id="femenino"
                        value="FEMENINO"
                        checked={isEditing && formData.genero === "FEMENINO"}
                        onChange={() => handleGeneroChange("FEMENINO")}
                        disabled={!isEditing}
                    />
                    <label htmlFor="femenino" className={"gender-button"}>
                        Femenino
                    </label>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    height: "100px",
                }}
            >
                <Licencia />
            </div>
            <div style={{ display: "flex", height: "350px" }}>
                <div
                    style={{
                        width: "70%",
                        paddingRight: "20px",
                        height: "300px",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "grey",
                            borderRadius: "5px",
                            height: "30px",
                            alignContent: "center",
                        }}
                    >
                        <h3 style={{ color: "white", marginLeft: "10px" }}>
                            Asignaciones
                        </h3>
                    </div>
                    <div
                        style={{
                            paddingLeft: "10px",
                            display: "flex",
                            height: "100%",
                            flexDirection: "column",
                            justifyContent: " space-evenly",
                        }}
                    >
                        {asignaciones.map((asignacion) => (
                            <label
                                key={asignacion.name}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "30px",
                                }}
                            >
                                <input
                                    style={{
                                        width: "20%",
                                        height: "15px",
                                    }}
                                    disabled={!isEditing}
                                    type="checkbox"
                                    checked={formData.asignaciones.some(
                                        (a) => a.name === asignacion.name
                                    )} // Verifica si está seleccionado
                                    onChange={() =>
                                        handleCheckboxChangeAsignaciones(
                                            asignacion
                                        )
                                    } 
                                />
                                <h5>{asignacion.name}</h5>
                            </label>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        width: "40%",
                        height: "300px",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#4caf50",
                            borderRadius: "5px",
                            height: "30px",
                            alignContent: "center",
                        }}
                    >
                        <h3 style={{ color: "white", marginLeft: "10px" }}>
                            Tareas Mecánicas
                        </h3>
                    </div>
                    <div
                        style={{
                            paddingLeft: "10px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: " space-evenly",
                        }}
                    >
                        {[
                            "Acomodador",
                            "Técnico de sonido",
                            "Audio",
                            "Video",
                            "Plataforma",
                        ].map((tarea) => (
                            <label
                                key={tarea}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "30px",
                                }}
                            >
                                <input
                                    style={{
                                        width: "20%",
                                        height: "15px",
                                    }}
                                    type="checkbox"
                                    disabled={!isEditing}
                                    checked={formData.tareas.includes(tarea)}
                                    onChange={() =>
                                        handleCheckboxChange("tareas", tarea)
                                    }
                                />
                                {tarea}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <h4>Guardar</h4>
                    <button
                        type="button"
                        onClick={mostrarModal}
                        className="sidebar-link"
                        style={{ border: "none" }}
                        disabled={!isEditing}
                    >
                        <img
                            src="./diskette.png"
                            alt="Guardar"
                            style={{ width: "50px", height: "50px" }}
                        />
                    </button>
                    <ModalConfirmacion
                        mensaje="¿Estás seguro de que deseas guardar este elemento?"
                        onConfirmar={handleSubmit}
                        onCancelar={ocultarModal}
                        visible={modalVisible}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <h4>Editar</h4>
                    <button
                        type="button"
                        className="sidebar-link"
                        style={{ border: "none" }}
                        onClick={handleInactivoChange}
                    >
                        <img
                            src="./edit.png"
                            alt="Editar"
                            style={{ width: "50px", height: "50px" }}
                        />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PersonalForm;
