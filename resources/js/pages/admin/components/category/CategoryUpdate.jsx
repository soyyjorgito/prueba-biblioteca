import React, { useEffect, useState } from 'react';
import Config from '../../../../config/Config';
import AuthUser from '../../../auth/AuthUser';

const CategoryUpdate = ({ showModal, setShowModal, categoryId, refreshCategories }) => { 
    const [name, setName] = useState("");
    const { getToken } = AuthUser();

    // Obtener categoría por ID
    useEffect(() => {
        if (categoryId) {
            const getCategoryById = async () => {
                try {
                    const token = getToken(); 
                    const response = await Config.getCategoryById(categoryId, token);
                    setName(response.data.name);
                } catch (error) {
                    console.error("Error al obtener categoría:", error);
                }
            };
            getCategoryById();
        }
    }, []);  

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();  
            await Config.updateCategory(categoryId, { name }, token);
            setShowModal(false); 
            refreshCategories();
        } catch (error) {
            console.error("Error al actualizar la categoría:", error);
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
                        <h5 className="modal-title">Editar Categoría</h5>
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

export default CategoryUpdate;
