import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
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
                    <Link className="nav-link" to="/admin/users">
                        <i className="bi bi-person-fill"></i>
                        <span>Usuarios</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/books">
                        <i className="bi bi-book-fill"></i>
                        <span>Libros</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/categories">
                        <i className="bi bi-tags-fill"></i>
                        <span>Categorías</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/loans">
                        <i className="bi bi-clipboard-check"></i>
                        <span>Préstamos</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/statistics">
                        <i className="bi bi-bar-chart-line"></i>
                        <span>Estadísticas</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
