import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Config from "../../../../config/Config";
import AuthUser from "../../../auth/AuthUser";
import CategoryUpdate from "./CategoryUpdate"; // Modal de edición de categoría
import CategoryAdd from "./CategoryAdd";

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false); // Estado para mostrar el modal
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Estado para el ID de la categoría seleccionada
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Modal para confirmar eliminación
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null); // ID de la categoría a eliminar

    const { getToken } = AuthUser();

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const token = getToken();
        if (token) {
            try {
                const response = await Config.getCategories(token);
                setCategories(response.data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        }
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleEditClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setShowModal(true); // Abre el modal de edición
    };

    const handleDeleteClick = (categoryId) => {
        setCategoryIdToDelete(categoryId);
        setShowDeleteConfirm(true); // Muestra el modal de confirmación de eliminación
    };

    const handleDeleteCategory = async () => {
        try {
            const token = getToken();
            if (token) {
                await Config.deleteCategory(categoryIdToDelete, token); // Llamada DELETE
                setCategories(categories.filter(category => category.id !== categoryIdToDelete)); // Eliminar la categoría de la lista local
                setShowDeleteConfirm(false); // Cierra el modal de confirmación
            }
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
        }
    };

    const refreshCategories = () => {
        getCategories(); // Refrescar la lista de categorías después de la actualización
    };

    return (
        <div className="d-flex mt-5">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <div className="card shadow-lg border-0 p-4">
                    <div className="card-header text-black text-center">
                        <h1 className="mb-0">Categorías</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-4 d-flex justify-content-between align-items-center">
                            <input
                                type="text"
                                className="form-control w-50"
                                placeholder="Buscar por nombre..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button
                                className="btn btn-success"
                                onClick={() => setShowAddModal(true)}
                            >
                                <i className="bi bi-plus-circle"></i> Agregar categoría
                            </button>
                        </div>
                        <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((category) => (
                                        <tr key={category.id}>
                                            <td>{category.id}</td>
                                            <td>{category.name}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() => handleEditClick(category.id)}
                                                >
                                                    <i className="bi bi-pencil-fill"></i> {/* Icono de editar */}
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => handleDeleteClick(category.id)}
                                                >
                                                    <i className="bi bi-trash-fill"></i> {/* Icono de eliminar */}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No se encontraron categorías.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de edición de categoría */}
            {showModal && (
                <CategoryUpdate
                    showModal={showModal}
                    setShowModal={setShowModal}
                    categoryId={selectedCategoryId}
                    refreshCategories={refreshCategories}
                />
            )}
            {/* Modal de agregar categoría */}
            {showAddModal && (
                <CategoryAdd
                    showModal={showAddModal}
                    setShowModal={setShowAddModal}
                    refreshCategories={refreshCategories}
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
                                ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowDeleteConfirm(false)}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteCategory}>
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

export default CategoriesList;
