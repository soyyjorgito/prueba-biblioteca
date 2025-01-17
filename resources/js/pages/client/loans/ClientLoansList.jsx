import React, { useEffect, useState } from "react";
import ClientSidebar from "../ClientSidebar";
import Config from "../../../config/Config";
import AuthUser from "../../auth/AuthUser";

const ClientLoansList = () => {
    const [loans, setLoans] = useState([]);
    const [search, setSearch] = useState("");
    const { getToken, user } = AuthUser(); // Obtener el cliente logueado

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        const token = getToken();
        if (token) {
            try {
                const response = await Config.getLoans(token); // Obtener todos los préstamos
                // Filtrar préstamos para mostrar solo los del cliente logueado
                const clientLoans = response.data.filter((loan) => loan.user.id === user.id);
                setLoans(clientLoans);
            } catch (error) {
                console.error("Error al obtener los préstamos:", error);
            }
        }
    };

    const handleReturnBook = async (loanId) => {
        try {
            const token = getToken();
    
            if (token) {
                // Obtener los datos del préstamo actual desde el backend
                const response = await Config.getLoansById(loanId, token); // Asegúrate de tener este endpoint
                const loan = response.data;
    
                if (loan.status === "pending") {
                    // Cambiar el estado del préstamo a 'returned'
                    loan.status = "returned";
    
                    // Actualizar el préstamo en la base de datos
                    await Config.updateLoans(loanId, loan, token);
    
                    // Incrementar el stock del libro asociado al préstamo
                    await Config.returnBooks(loan.book_id, token);
    
                    alert("Préstamo devuelto con éxito.");
                    fetchLoans(); // Refrescar la lista de préstamos
                } else {
                    alert("Este préstamo ya ha sido devuelto.");
                }
            }
        } catch (error) {
            console.error("Error al devolver el préstamo:", error);
            alert("Hubo un error al procesar la devolución.");
        }
    };
    

    const filteredLoans = loans.filter(
        (loan) =>
            loan.book.title.toLowerCase().includes(search.toLowerCase()) ||
            loan.loan_date.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="d-flex mt-5">
            <ClientSidebar />
            <div className="flex-grow-1 p-4">
                <div className="card shadow-lg border-0 p-4">
                    <div className="card-header text-black text-center">
                        <h1 className="mb-0">Mis Préstamos</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-4 d-flex justify-content-between align-items-center">
                            <input
                                type="text"
                                className="form-control w-50"
                                placeholder="Buscar por título o fecha..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Libro</th>
                                    <th>Fecha de Préstamo</th>
                                    <th>Fecha de Devolución</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLoans.length > 0 ? (
                                    filteredLoans.map((loan) => (
                                        <tr key={loan.id}>
                                            <td>{loan.id}</td>
                                            <td>{loan.book.title}</td>
                                            <td>{loan.loan_date}</td>
                                            <td>{loan.return_date || "No asignada"}</td>
                                            <td>{loan.status === "returned" ? "Devuelto" : "Pendiente"}</td>
                                            <td>
                                                {loan.status !== "returned" ? (
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => handleReturnBook(loan.id, loan.book.id)}
                                                    >
                                                        <i className="bi bi-arrow-return-left"></i> Devolver
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-secondary" disabled>
                                                        Devuelto
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No tienes préstamos registrados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientLoansList;
