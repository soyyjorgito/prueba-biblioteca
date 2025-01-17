import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Config from "../../../../config/Config";
import AuthUser from "../../../auth/AuthUser";
import BookUpdate from "./BookUpdate";
import BookAdd from "./BookAdd";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [bookIdToDelete, setBookIdToDelete] = useState(null);

    const { getToken } = AuthUser();

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        const token = getToken();
        if (token) {
            try {
                const response = await Config.getBooks(token);
                setBooks(response.data);
            } catch (error) {
                console.error("Error al obtener los libros:", error);
            }
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleEditClick = (bookId) => {
        setSelectedBookId(bookId);
        setShowModal(true);
    };

    const handleDeleteClick = (bookId) => {
        setBookIdToDelete(bookId);
        setShowDeleteConfirm(true);
    };

    const handleDeleteBook = async () => {
        try {
            const token = getToken();
            if (token) {
                await Config.deleteBooks(bookIdToDelete, token);
                setBooks(books.filter(book => book.id !== bookIdToDelete));
                setShowDeleteConfirm(false);
            }
        } catch (error) {
            console.error("Error al eliminar el libro:", error);
        }
    };

    const refreshBooks = () => {
        getBooks();
    };

    return (
        <div className="d-flex mt-5">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <div className="card shadow-lg border-0 p-4">
                    <div className="card-header text-black text-center">
                        <h1 className="mb-0">Libros</h1>
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
                                <i className="bi bi-plus-circle"></i> Agregar libro
                            </button>
                        </div>
                        <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Autor</th>
                                    <th>Categoría</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.length > 0 ? (
                                    filteredBooks.map((book) => (
                                        <tr key={book.id}>
                                            <td>{book.id}</td>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.category?.name || "Sin categoría"}</td>
                                            <td>{book.stock}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() => handleEditClick(book.id)}
                                                >
                                                    <i className="bi bi-pencil-fill"></i>
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => handleDeleteClick(book.id)}
                                                >
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No se encontraron libros.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de edición de libro */}
            {showModal && (
                <BookUpdate
                    showModal={showModal}
                    setShowModal={setShowModal}
                    bookId={selectedBookId}
                    refreshBooks={refreshBooks}
                />
            )}

            {/* Modal de agregar libro */}
            {showAddModal && (
                <BookAdd
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    refreshBooks={refreshBooks}
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
                                ¿Estás seguro de que deseas eliminar este libro? Esta acción no se puede deshacer.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowDeleteConfirm(false)}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteBook}>
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

export default BooksList;
