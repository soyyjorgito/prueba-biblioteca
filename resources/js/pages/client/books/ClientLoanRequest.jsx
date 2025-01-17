import React, { useEffect, useState } from "react";
import Config from "../../../config/Config";
import AuthUser from "../../auth/AuthUser";

const ClientLoanRequest = ({ showModal, setShowModal, bookId, refreshBooks }) => {
    const [bookDetails, setBookDetails] = useState(null);
    const [loanDates, setLoanDates] = useState({
        loan_date: "",
        return_date: "",
    });
    const { getToken, user } = AuthUser(); // Obtener el usuario actual del contexto

    // Obtener los detalles del libro
    useEffect(() => {
        if (bookId) {
            fetchBookDetails();
        }
    }, [bookId]);

    const fetchBookDetails = async () => {
        try {
            const token = getToken();
            const response = await Config.getBooksById(bookId, token); // Suponiendo que existe un endpoint para obtener un libro por ID
            setBookDetails(response.data);
        } catch (error) {
            console.error("Error al obtener los detalles del libro:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoanDates((prevDates) => ({ ...prevDates, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loanDates.loan_date || !loanDates.return_date) {
            alert("Por favor, seleccione las fechas de préstamo y devolución.");
            return;
        }

        try {
            const token = getToken();
            const newLoan = {
                user_id: user.id, // Usuario autenticado
                book_id: bookId,
                loan_date: loanDates.loan_date,
                return_date: loanDates.return_date,
                status: "pending", // Estado inicial del préstamo
            };

            // Enviar solicitud de préstamo
            await Config.addLoans(newLoan, token);

            // Actualizar el stock del libro
            await Config.borrowBooks(bookId, token); // Reducir el stock en 1

            alert("Préstamo solicitado con éxito.");
            setShowModal(false);
            refreshBooks(); // Refrescar la lista de libros
        } catch (error) {
            console.error("Error al solicitar el préstamo:", error);
            alert("Ocurrió un error al solicitar el préstamo.");
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
                        <h5 className="modal-title">Solicitar Préstamo</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        ></button>
                    </div>
                    {bookDetails ? (
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Título del Libro</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookDetails.title}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Autor</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookDetails.author}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Fecha de Préstamo</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="loan_date"
                                        value={loanDates.loan_date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Fecha de Devolución</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="return_date"
                                        value={loanDates.return_date}
                                        onChange={handleInputChange}
                                        required
                                    />
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
                                    Solicitar Préstamo
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="modal-body text-center">
                            <p>Cargando detalles del libro...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientLoanRequest;
