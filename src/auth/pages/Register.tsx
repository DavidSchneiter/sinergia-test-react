import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/auth.css";
import { FormRegister } from "../../interfaces/formData";
import { useAuth } from "../../provider/AuthContext";

// El registro 

const RegisterPage: FunctionComponent = () => {
    const { register, loading, errors, isRegistered } = useAuth();
    const [formRegister, setFormRegister] = useState<FormRegister>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormRegister((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // Crea un nuevo usuario
        await register(formRegister);
    };
    useEffect(() => {
        if (isRegistered) {
          navigate('/'); // Redirigir después de registrarse
        }
      }, [isRegistered, navigate]);

    return (
        <div className="login-container">
            {errors.length > 0 && (
                <ul style={{ color: "red" }}>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={handleRegister}>
                <h1>Registro</h1>
                <div className="input-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="firstName"
                        value={formRegister.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Apellido</label>
                    <input
                        type="text"
                        placeholder="Apellido"
                        name="lastName"
                        value={formRegister.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formRegister.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        value={formRegister.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading} className="login-btn">
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
                <div className="signup-link">
                    <Link to={"/login"}> Login </Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
