import React from "react";
import AuthUser from "../pages/auth/AuthUser";
import { Link, useNavigate } from "react-router-dom";
import Config from "../config/Config";

const Navbar = () => {

    const { getRole, getToken, getLogout } = AuthUser();
    const navigate = useNavigate();

    const logoutUser = () => {
        const token = getToken(); 

        if (!token) {
            console.error("No se encontró el token.");
            return;
        }

        Config.getLogout({}, token) 
            .then(response => {
                getLogout(); 
                console.log(response.data);
                navigate("/login");
            })
            .catch(error => {
                console.error("No se pudo cerrar la sesión:", error.response?.data || error.message);
            });
    }

    const renderLinks = () => {
        if (getToken()) {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/${getRole()}`} style={{ fontFamily: 'Georgia, serif', color: '#F1E3D3' }}>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={logoutUser}>
                            <i className="bi bi-box-arrow-right"  ></i> Cerrar sesión
                        </a>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            <i className="bi bi-box-arrow-in-right"></i> Iniciar sesión
                        </Link>
                    </li>
                </>
            )
        }
    }

    return (
        <nav className="bg-dark navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to="/" style={{ fontFamily: 'Georgia, serif', color: '#F1E3D3' }}>
                    <i className="bi bi-book"></i>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {renderLinks()}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
