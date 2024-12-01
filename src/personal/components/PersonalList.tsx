import { FunctionComponent, useState } from "react";
import Filter from "./Filter";
import ModalConfirmacion from "./ModalConfirmacion";
import { useColaborators } from "../../provider/ColaboratorContext";



// Componente que muestra la lista de usuarios y los botones para agregar o borrar colaboradores
const PersonalList: FunctionComponent = () => {
    const { selectedColaborator, deleteColaborator, resetFormData } = useColaborators();

    const [modalVisible, setModalVisible] = useState(false);
    const mostrarModal = () => setModalVisible(true);
    const ocultarModal = () => setModalVisible(false);
    
    // Funcion que eliminar el usuario seleccionado
    const eliminarPersona = () => {
        try {
            if (selectedColaborator) {
                deleteColaborator(selectedColaborator)
            }
                ocultarModal();
            } catch (error) {
                console.log(error)
            }
        }
    
    return (
        <div
            style={{
                width: "300px",
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
            >
                <button className="sidebar-link"  onClick={resetFormData} style={{ border: "none" }}>
                    <img src="./add-user.png" alt="Agregar usuario" />
                </button>

                <button className="sidebar-link" onClick={mostrarModal} style={{ border: "none" }} disabled={!selectedColaborator}>
                    <img src="./user.png" alt="Usuarios" />
                </button>
                <ModalConfirmacion
                        mensaje="¿Estás seguro de que deseas eliminar este elemento?"
                        onConfirmar={eliminarPersona}
                        onCancelar={ocultarModal}
                        visible={modalVisible}
                    />
            </div>
            <div>
                <h1
                    style={{
                        backgroundColor: "grey",
                        height: "30px",
                        padding: "5px",
                        borderRadius: "5px",
                        color: "white",
                        fontSize: "20px",
                    }}
                >
                    Buscar
                </h1>
                <Filter />
            </div>
        </div>
    );
};

export default PersonalList;
