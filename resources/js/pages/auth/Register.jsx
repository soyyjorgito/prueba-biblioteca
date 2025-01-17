import React, { useEffect, useState } from "react";
import Config from "../../config/Config";
import { useNavigate, Link } from "react-router-dom";
import AuthUser from "./AuthUser";

const Register = () => {
    const { getToken } = AuthUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Verificar si ya ingresó al sistema
    useEffect(() => {
        if (getToken()) {
            navigate("/")
        }
    }, [])

    // Manejar registro
    const handleSubmit = async (e) => {
        e.preventDefault();
        Config.getRegister({ name, email, password }).then(({ data }) => {
            if (data.success) {
                navigate("/login")
            }
        })
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row justify-content-center w-100">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg rounded">
                        <div className="card-header text-dark text-center">
                            <h3>Registrarse</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label" style={{ fontFamily: 'Georgia, sans-serif' }}>
                                        Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Escribe tu nombre"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        style={{ fontFamily: 'Georgia, sans-serif' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label" style={{ fontFamily: 'Georgia, sans-serif' }}>
                                        Correo Electrónico
                                    </label>
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
                                    <label htmlFor="password" className="form-label" style={{ fontFamily: 'Georgia, sans-serif' }}>
                                        Contraseña
                                    </label>
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
                                <div className="text-center">
                                <button type="submit" className="btn btn-dark w-100 mb-3">Registrarse</button>
                                </div>
                            </form>
                            <div className="card-footer text-center">
                                <p className="mb-2">¿Ya tienes una cuenta?</p>
                                <Link to="/login" className="btn btn-outline-dark" style={{ fontFamily: 'Georgia, sans-serif' }}>
                                    Iniciar sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
