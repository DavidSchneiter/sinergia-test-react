import { FunctionComponent, useState } from "react";
import { useColaborators } from "../../provider/ColaboratorContext";

// Componente para el buscador de usuarios y la lista ordenada de ellos
const Filter: FunctionComponent = () => {
    const { colaborators, setSelectedColaborator } = useColaborators()
    // const [filteredPeople, setFilteredPeople] = useState<Colaborador[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPeople = colaborators.filter((person) =>
        person.apellido.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return (
        <div
            style={{
                padding: "10px",
            }}
        >
            <input
                type="text"
                placeholder="Buscar por nombre o apellido"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <ul style={{ listStyle: "none", padding: 0 }}>
                {filteredPeople.map((person) => (
                    <li
                        key={person.email} onClick={() => setSelectedColaborator(person)}
                        style={{
                            padding: "10px 15px",
                            margin: "5px 0",
                            backgroundColor: "#007bff", // Color del botón
                            color: "#fff",
                            borderRadius: "5px",
                            cursor: "pointer",
                            textAlign: "center",
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#0056b3")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#007bff")
                        }
                    >
                        {person.nombre} {person.apellido}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filter;
