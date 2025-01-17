import React from "react";
import { Link } from "react-router-dom";

const ClientSidebar = () => {
    return (
        <div className="sidebar-bg">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <i className="bi bi-house-door"></i>
                        <span>Inicio</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/client/books">
                        <i className="bi bi-book-fill"></i>
                        <span>Libros</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/client/loans">
                        <i className="bi bi-clipboard-check"></i>
                        <span>Mis préstamos</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ClientSidebar;
