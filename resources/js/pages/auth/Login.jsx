import React, { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { useNavigate, Link } from "react-router-dom";
import Config from "../../config/Config";

const Login = () => {
    const { getToken, setToken } = AuthUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Verificar si ya ingresó al sistema
    useEffect(() => {
        if (getToken()) {
            navigate("/");
        }
    }, []);

    // Manejar login
    const handleLogin = async (e) => {
        e.preventDefault();
        await axios.get('/sanctum/csrf-cookie').then((response) => {
            Config.getLogin({ email, password }).then((data) => {
                if (data.data.success) {
                    setToken(
                        data.data.user,
                        data.data.token,
                        data.data.user.roles[0].name
                    ); // Guardar la información del usuario
                    navigate("/"); // Redirige al inicio
                } else {
                    setErrorMessage(data.message || "Error en las credenciales");
                }
            });
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row justify-content-center w-100">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg rounded">
                        <div className="card-header text-dark text-center">
                            <h3>Iniciar Sesión</h3>
                        </div>
                        <div className="card-body">
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label" style={{ fontFamily: 'Georgia, sans-serif' }}>Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Escribe tu correo"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{ fontFamily: 'Georgia, sans-serif' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label" style={{ fontFamily: 'Georgia, sans-serif' }}>Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Escribe tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{ fontFamily: 'Georgia, sans-serif' }}
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark w-100 mb-3">Iniciar Sesión</button>
                            </form>
                            <div className="card-footer text-center">
                                <p className="mb-2">¿Todavía no tienes una cuenta?</p>
                                <Link to="/register" className="btn btn-outline-dark">
                                    Registrarse
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
