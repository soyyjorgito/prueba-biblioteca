import axios from "axios";

const base_api_url = "http://localhost:8000/api/v1"; // Ruta

export default {
    // Registros y autenticación
    getRegister: (data) => axios.post(`${base_api_url}/auth/register`, data),
    getLogin: (data) => axios.post(`${base_api_url}/auth/login`, data),
    // Cerrar sesión
    getLogout: (data, token) => axios.post(`${base_api_url}/auth/logout`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),

    // Obtiene los usuarios
    getUserAll: (token) => {
        return axios.get(`${base_api_url}/admin/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    // Obtener usuario por ID
    getUserById: (userId, token) => axios.get(`${base_api_url}/admin/users/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }),

    // Función para agregar un usuario
    addUser: (userData, token) => axios.post(`${base_api_url}/admin/users`, userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }),
    // Actualizar usuario
    updateUser: (userId, data, token) => {
        return axios.put(`${base_api_url}/admin/users/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    // Borrar usuario
    deleteUser: (id, token) => axios.delete(`${base_api_url}/admin/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }),

    // Categorias

    // Obtener categoría
    getCategories: (token) => {
        return axios.get(`${base_api_url}/admin/categories`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    // Obtener categoria por ID

    getCategoryById: (categoryId, token) => axios.get(`${base_api_url}/admin/categories/${categoryId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }),

    // Función para agregar categoría
    addCategory: (categoryData, token) => axios.post(`${base_api_url}/admin/categories`, categoryData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }),

    // Función para editar categoría
    updateCategory: (categoryId, data, token) => {
        return axios.put(`${base_api_url}/admin/categories/${categoryId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    // Función para borrar categoría
    deleteCategory: (id, token) => axios.delete(`${base_api_url}/admin/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }),

    // Libros

    // Función para obtener libros
    getBooks: (token) => {
        return axios.get(`${base_api_url}/admin/books`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    // Función para buscar libro por ID
    getBooksById: (booksId, token) => axios.get(`${base_api_url}/admin/books/${booksId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }),

    // Función para agregar libros
    addBooks: (booksData, token) => axios.post(`${base_api_url}/admin/books`, booksData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }),

    // Función para editar libros
    updateBooks: (booksId, data, token) => {
        return axios.put(`${base_api_url}/admin/books/${booksId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    // Función para borrar categoría
    deleteBooks: (id, token) => axios.delete(`${base_api_url}/admin/books/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }),

    borrowBooks: (id, token) => axios.post(`${base_api_url}/books/${id}/borrow`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }),
    returnBooks: (id, token) => axios.post(`${base_api_url}/books/${id}/return`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }),

    // Prestamos

    
    // Función para obtener prestamos
    getLoans: (token) => {
        return axios.get(`${base_api_url}/admin/loans`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    // Función para buscar libro por ID
    getLoansById: (loansId, token) => axios.get(`${base_api_url}/admin/loans/${loansId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }),

    // Función para editar prestamo
    updateLoans: (loansId, data, token) => {
        return axios.put(`${base_api_url}/admin/loans/${loansId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    // Función para agregar prestamos
    addLoans: (loansData, token) => axios.post(`${base_api_url}/admin/loans`, loansData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }),


    // Función para borrar prestamo
    deleteLoans: (id, token) => axios.delete(`${base_api_url}/admin/loans/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }),

    // Estadísticas
    // Libros más prestados
    getMostBorrowedBooks: (token) => {
        return axios.get(`${base_api_url}/statistics/most-borrowed-books`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    // Usuarios más activos
    getMostActiveUsers: (token) => {
        return axios.get(`${base_api_url}/statistics/most-active-users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    // Prestamos por categoría
    getLoansByCategory: (token) => {
        return axios.get(`${base_api_url}/statistics/loans-by-category`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    // Prestamos promedio
    getAverageLoans: (token) => {
        return axios.get(`${base_api_url}/statistics/average-loans-per-user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
};
