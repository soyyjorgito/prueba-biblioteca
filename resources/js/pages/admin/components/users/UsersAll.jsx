import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Config from "../../../../config/Config";
import AuthUser from "../../../auth/AuthUser"; 
import UserUpdate from "./UserUpdate"; // Modal de edición de usuario

const UsersAll = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState(""); 
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const [selectedUserId, setSelectedUserId] = useState(null); // Estado para el ID del usuario seleccionado
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Modal para confirmar eliminación
    const [userIdToDelete, setUserIdToDelete] = useState(null); // ID del usuario a eliminar

    const { getToken } = AuthUser();

    useEffect(() => {
        getUserAll();
    }, []);

    const getUserAll = async () => {
        const token = getToken();
        if (token) {
            try {
                const response = await Config.getUserAll(token);
                setUsers(response.data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleEditClick = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true); // Abre el modal de edición
    };

    const handleDeleteClick = (userId) => {
        setUserIdToDelete(userId);
        setShowDeleteConfirm(true); // Muestra el modal de confirmación de eliminación
    };

    const handleDeleteUser = async () => {
        try {
            const token = getToken();
            if (token) {
                await Config.deleteUser(userIdToDelete, token); // Llamada DELETE
                setUsers(users.filter(user => user.id !== userIdToDelete)); // Eliminar el usuario de la lista local
                setShowDeleteConfirm(false); // Cierra el modal de confirmación
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const refreshUsers = () => {
        getUserAll(); // Refrescar la lista de usuarios después de la actualización
    };

    return (
        <div className="d-flex mt-5">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <div className="card shadow-lg border-0 p-4">
                    <div className="card-header text-black text-center">
                        <h1 className="mb-0">Usuarios</h1>
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
                        </div>
                        <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() => handleEditClick(user.id)}
                                                >
                                                    <i className="bi bi-pencil-fill"></i> {/* Icono de editar */}
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() => handleDeleteClick(user.id)}
                                                >
                                                    <i className="bi bi-trash-fill"></i> {/* Icono de eliminar */}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No se encontraron usuarios.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de edición de usuario */}
            {showModal && (
                <UserUpdate
                    showModal={showModal}
                    setShowModal={setShowModal}
                    userId={selectedUserId}
                    refreshUsers={refreshUsers}
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
                                ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowDeleteConfirm(false)}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteUser}>
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

export default UsersAll;
