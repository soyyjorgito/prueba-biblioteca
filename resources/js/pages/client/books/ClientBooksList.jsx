import React, { useEffect, useState } from "react";
import ClientSidebar from "../ClientSidebar";
import Config from "../../../config/Config";
import AuthUser from "../../auth/AuthUser";
import ClientLoanRequest from "./ClientLoanRequest";

const ClientBooksList = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(""); // Filtro por categoría
    const [categories, setCategories] = useState([]); // Lista de categorías
    const [showModal, setShowModal] = useState(false); // Control del modal
    const [selectedBookId, setSelectedBookId] = useState(null); // Libro seleccionado

    const { getToken } = AuthUser();

    useEffect(() => {
        getBooks();
        getCategories();
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

    const getCategories = async () => {
        const token = getToken();
        if (token) {
            try {
                const response = await Config.getCategories(token); // Endpoint para obtener categorías
                setCategories(response.data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        }
    };

    const filteredBooks = books
        .filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
        .filter((book) => (categoryFilter ? book.category?.name === categoryFilter : true));

    const openLoanModal = (bookId) => {
        setSelectedBookId(bookId); // Establecer el libro seleccionado
        setShowModal(true); // Mostrar el modal
    };

    return (
        <div className="d-flex mt-5">
            <ClientSidebar />
            <div className="flex-grow-1 p-4">
                <div className="card shadow-lg border-0 p-4">
                    <div className="card-header text-black text-center">
                        <h1 className="mb-0">Libros Disponibles</h1>
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
                            <select
                                className="form-control w-25"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">Filtrar por categoría</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
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
                                            <td>{book.stock > 0 ? book.stock : "No disponible"}</td>
                                            <td>
                                                {book.stock > 0 ? (
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => openLoanModal(book.id)}
                                                    >
                                                        <i className="bi bi-hand-thumbs-up"></i> Solicitar préstamo
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-secondary"
                                                        disabled
                                                    >
                                                        No disponible
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No se encontraron libros disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de solicitud de préstamo */}
            {showModal && (
                <ClientLoanRequest
                    showModal={showModal}
                    setShowModal={setShowModal}
                    bookId={selectedBookId}
                    refreshBooks={getBooks} // Refrescar la lista de libros después de una solicitud
                />
            )}
        </div>
    );
};

export default ClientBooksList;
