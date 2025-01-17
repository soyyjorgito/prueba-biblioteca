import React from "react";
import Sidebar from "./Sidebar"; // Importamos el Sidebar// Importamos el Navbar

const Dashboard = () => {
    return (
        <>


            <div className="d-flex mt-5">  {/* Añadimos margin-top para que no se solape con el Navbar */}
                {/* Sidebar */}
                <Sidebar />
                {/* Contenido Principal */}
                <div className="flex-grow-1 p-4">
                    <div className="card shadow-lg border-0 p-4">
                        <div className="card-header text-black text-center">
                            <h1 className="mb-0">Panel de Administración</h1>
                        </div>
                        <div className="card-body text-center">
                            <p className="text-muted mb-4">
                                Administra usuarios, libros, categorías, préstamos y estadísticas desde este panel.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
