import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/auth.css";
import { useAuth } from "../../provider/AuthContext";

const LoginPage: FunctionComponent = () => {
    const { login, loading, errors, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Un login a implementar
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await login(email, password);
        if (user) {
            navigate("/");
        }
    };
    useEffect(() => {
        if (user) {
          navigate('/'); // Redirigir después de registrarse
        }
      }, [user, navigate]);

    return (
        <div className="login-container">
            {errors.length > 0 && (
                <ul style={{ color: "red" }}>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        id="password"
                        name="password"
                        placeholder="Ingrese la contraseña"
                    />
                </div>

                <button type="submit" disabled={loading} className="login-btn">
                    {loading ? "Iniciando..." : "Iniciar sesión"}
                </button>
                <div className="signup-link">
                    <Link to={"/register"}> Registro </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
