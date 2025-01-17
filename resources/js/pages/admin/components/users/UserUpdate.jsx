import React, { useEffect, useState } from 'react';
import Config from "../../../../config/Config"; 
import AuthUser from '../../../auth/AuthUser';

const UserUpdate = ({ showModal, setShowModal, userId, refreshUsers }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const { getToken } = AuthUser();

    // Obtener usuario por ID
    useEffect(() => {
        if (userId) {
            console.log("Obteniendo datos del usuario con ID:", userId);
            const getUserById = async () => {
                try {
                    const token = getToken();  // Asegúrate de pasar el token
                    const response = await Config.getUserById(userId, token);
                    console.log("Datos del usuario:", response.data);
                    setName(response.data.name);
                    setEmail(response.data.email);
                } catch (error) {
                    console.error("Error al obtener usuario:", error);
                }
            };
            getUserById();
        }
    }, []);  


    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        
        try {
            const token = getToken();  
            await Config.updateUser(userId, { name, email }, token);
            setShowModal(false); 
            refreshUsers();
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
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
                        <h5 className="modal-title">Editar Usuario</h5>
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
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserUpdate;
