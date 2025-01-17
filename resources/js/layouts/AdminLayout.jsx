import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../pages/admin/Sidebar";
import Footer from "../components/Footer";
import AuthUser from "../pages/auth/AuthUser";

const AdminLayout = () => {
    const { getRole } = AuthUser();
    const navigate = useNavigate();
    const location = useLocation(); // Obtenemos la ubicación actual de la ruta

    // Redirigir si no es admin
    useEffect(() => {
        if (getRole() !== "admin") {
            navigate("/");
        }
    }, [getRole, navigate]);

    // Verificar si estamos en el Dashboard
    const isDashboard = location.pathname === "/admin";

    return (
        <div className="d-flex">
            {/* Mostrar Sidebar solo en el Dashboard */}
            {isDashboard && <Sidebar />}

            {/* Contenido Principal */}
            <div className={`main-content d-flex flex-column w-100 ${isDashboard ? 'mt-0' : ''}`}>
                {/* Área de contenido */}
                <div className="container mt-5 flex-grow-1">
                    <Outlet />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AdminLayout;
