import React, { useEffect, useState } from "react";
import Config from "../../../../config/Config";
import AuthUser from "../../../auth/AuthUser";

const LoanUpdate = ({ showModal, setShowModal, loanId, refreshLoans }) => {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [loan, setLoan] = useState({
        user_id: "",
        book_id: "",
        loan_date: "",
        return_date: "",
        status: "",
    });
    const { getToken } = AuthUser();

    // Obtener información del préstamo, usuarios y libros
    useEffect(() => {
        if (loanId) {
            fetchLoanById();
            fetchUsers();
            fetchBooks();
        }
    }, [loanId]);

    const fetchLoanById = async () => {
        try {
            const token = getToken();
            const response = await Config.getLoansById(loanId, token);
            setLoan({
                user_id: response.data.user_id,
                book_id: response.data.book_id,
                loan_date: response.data.loan_date,
                return_date: response.data.return_date,
                status: response.data.status,
            });
        } catch (error) {
            console.error("Error al obtener el préstamo:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const token = getToken();
            const response = await Config.getUserAll(token); // Obtener lista de usuarios
            setUsers(response.data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    const fetchBooks = async () => {
        try {
            const token = getToken();
            const response = await Config.getBooks(token); // Obtener lista de libros
            setBooks(response.data);
        } catch (error) {
            console.error("Error al obtener los libros:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoan((prevLoan) => ({ ...prevLoan, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();
            const bookId = loan.book_id;
            if (loan.status === "pending") {
                // Si el estado es 'pending', hacer el préstamo
                await Config.borrowBooks(bookId, token);
            } else if (loan.status === "returned") {
                // Si el estado es 'returned', hacer la devolución
                await Config.returnBooks(bookId, token);
            }
            await Config.updateLoans(loanId, loan, token); // Actualizar el préstamo
            setShowModal(false);
            refreshLoans();
        } catch (error) {
            console.error("Error al actualizar el préstamo:", error);
        }
    };

    return (
        <div
            className={`modal fade ${showModal ? "show" : ""}`}
            tabIndex="-1"
            aria-hidden={!showModal}
            style={{ display: showModal ? "block" : "none" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Préstamo</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        ></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="user_id" className="form-label">Usuario</label>
                                <select
                                    className="form-control"
                                    id="user_id"
                                    name="user_id"
                                    value={loan.user_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Seleccione un usuario</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="book_id" className="form-label">Libro</label>
                                <select
                                    className="form-control"
                                    id="book_id"
                                    name="book_id"
                                    value={loan.book_id}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Seleccione un libro</option>
                                    {books.map((book) => (
                                        <option key={book.id} value={book.id}>
                                            {book.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="loan_date" className="form-label">Fecha de Préstamo</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="loan_date"
                                    name="loan_date"
                                    value={loan.loan_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="return_date" className="form-label">Fecha de Devolución</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="return_date"
                                    name="return_date"
                                    value={loan.return_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Estado</label>
                                <select
                                    className="form-control"
                                    id="status"
                                    name="status"
                                    value={loan.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Seleccione el estado</option>
                                    <option value="pending">Pendiente</option>
                                    <option value="returned">Devuelto</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cerrar
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoanUpdate;
