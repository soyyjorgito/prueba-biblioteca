import React from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import AuthUser from "../pages/auth/AuthUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ClientSidebar from "../pages/client/ClientSidebar";
const ClientLayout = () => {

    const { getRole } = AuthUser()
    const navigate = useNavigate()

    useEffect(() => {
        if(getRole()!="client")
        {
            navigate("/")
        }
    },[])

    const isDashboard = location.pathname === "/client";

    return (
        <div className="d-flex">
            {/* Mostrar Sidebar solo en el Dashboard */}
            {isDashboard && <ClientSidebar />}

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

export default ClientLayout