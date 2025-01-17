import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Config from "../../../../config/Config";
import AuthUser from "../../../auth/AuthUser";
import LoanUpdate from "./LoansUpdate";
import LoansAdd from "./LoansAdd";

const LoansList = () => {
    const [loans, setLoans] = useState([]);
    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedLoanId, setSelectedLoanId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [loanIdToDelete, setLoanIdToDelete] = useState(null);

    const { getToken } = AuthUser();

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        const token = getToken();
        if (token) {
            try {
                const response = await Config.getLoans(token); // Llamada al backend para obtener los préstamos
                setLoans(response.data);
            } catch (error) {
                console.error("Error al obtener los préstamos:", error);
            }
        }
    };

    const filteredLoans = loans.filter((loan) =>
        loan.user.name.toLowerCase().includes(search.toLowerCase()) ||
        loan.book.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleEditClick = (loanId) => {
        setSelectedLoanId(loanId);
        setShowEditModal(true);
    };

    const handleDeleteClick = (loanId) => {
        setLoanIdToDelete(loanId);
        setShowDeleteConfirm(true);
    };

    const handleDeleteLoan = async () => {
        try {
            const token = getToken();
            if (token) {
                await Config.deleteLoans(loanIdToDelete, token); // Llamada para eliminar préstamo
                setLoans(loans.filter((loan) => loan.id !== loanIdToDelete)); // Actualizar lista local
                setShowDeleteConfirm(false);
            }
        } catch (error) {
            console.error("Error al eliminar el préstamo:", error);
        }
    };

    const refreshLoans = () => {
        fetchLoans(); // Refrescar la lista de préstamos
    };

    return (
        <div className="d-flex mt-5">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <div className="card shadow-lg border-0 p-4">
                    <div className="card-header text-black text-center">
                        <h1 className="mb-0">Préstamos</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-4 d-flex justify-content-between align-items-center">
                            <input
                                type="text"
                                className="form-control w-50"
                                placeholder="Buscar por título..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                className="btn btn-success"
                                onClick={() => setShowAddModal(true)}
                            >
                                <i className="bi bi-plus-circle"></i> Agregar préstamo
                            </button>
                        </div>
                        <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Usuario</th>
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
                                            <td>{loan.user.name}</td>
                                            <td>{loan.book.title}</td>
                                            <td>{loan.loan_date}</td>
                                            <td>{loan.return_date}</td>
                                            <td>{loan.status === "returned" ? "Devuelto" : "Pendiente"}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning me-2"
                                                    onClick={() => handleEditClick(loan.id)}
                                                >
                                                    <i className="bi bi-pencil-fill"></i> {/* Icono de editar */}
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDeleteClick(loan.id)}
                                                >
                                                    <i className="bi bi-trash-fill"></i> {/* Icono de eliminar */}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No se encontraron préstamos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal para agregar préstamo */}
            {showAddModal && (
                <LoansAdd
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    refreshLoans={fetchLoans}
                />
            )}

            {/* Modal de edición */}
            {showEditModal && (
                <LoanUpdate
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    loanId={selectedLoanId}
                    refreshLoans={refreshLoans}
                />
            )}

            {/* Modal de confirmación de eliminación */}
            {showDeleteConfirm && (
                <div className="modal fade show" style={{ display: 'block' }} id="deleteConfirmModal" tabIndex="-1" role="dialog" aria-labelledby="deleteConfirmModalLabel" aria-hidden="false">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteConfirmModalLabel">Confirmación de Eliminación</h5>
                            </div>
                            <div className="modal-body">
                                ¿Estás seguro de que deseas eliminar este préstamo? Esta acción no se puede deshacer.
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowDeleteConfirm(false)}
                                >
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteLoan}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoansList;
