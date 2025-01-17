import React, { useEffect, useState } from 'react';
import Config from '../../../../config/Config';
import AuthUser from '../../../auth/AuthUser';

const BookUpdate = ({ showModal, setShowModal, bookId, refreshBooks }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [stock, setStock] = useState(0);
    const [categories, setCategories] = useState([]);
    const { getToken } = AuthUser();

    // Obtener libro por ID
    useEffect(() => {
        if (bookId) {
            const getBookById = async () => {
                try {
                    const token = getToken();
                    const response = await Config.getBooksById(bookId, token);
                    const book = response.data;
                    setTitle(book.title);
                    setAuthor(book.author);
                    setCategoryId(book.category_id);
                    setStock(book.stock);
                } catch (error) {
                    console.error("Error al obtener libro:", error);
                }
            };
            getBookById();
        }
    }, [bookId]);

    // Obtener categorías disponibles
    useEffect(() => {
        const getCategories = async () => {
            try {
                const token = getToken();
                const response = await Config.getCategories(token);
                setCategories(response.data);
            } catch (error) {
                console.error("Error al obtener categorías:", error);
            }
        };
        getCategories();
    }, []);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();
            await Config.updateBooks(bookId, { title, author, category_id: categoryId, stock }, token);
            setShowModal(false); // Cerrar el modal
            refreshBooks(); // Actualizar la lista de libros
        } catch (error) {
            console.error("Error al actualizar el libro:", error);
        }
    };

    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            tabIndex="-1"
            aria-hidden={!showModal}
            style={{ display: showModal ? 'block' : 'none' }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Libro</h5>
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
                                <label htmlFor="title" className="form-label">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="author" className="form-label">Autor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Categoría</label>
                                <select
                                    className="form-control"
                                    id="category"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="stock"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                    min="0"
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
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookUpdate;
