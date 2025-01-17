import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Config from "../../../../config/Config";
import AuthUser from "../../../auth/AuthUser";

const StatisticsList = () => {
    const [mostBorrowedBooks, setMostBorrowedBooks] = useState([]);
    const [mostActiveUsers, setMostActiveUsers] = useState([]);
    const [loansByCategory, setLoansByCategory] = useState([]);
    const [averageLoans, setAverageLoans] = useState(null);

    const { getToken } = AuthUser();

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        const token = getToken();
        if (token) {
            try {
                const booksResponse = await Config.getMostBorrowedBooks(token);
                const usersResponse = await Config.getMostActiveUsers(token);
                const categoriesResponse = await Config.getLoansByCategory(token);
                const averageResponse = await Config.getAverageLoans(token);

                setMostBorrowedBooks(booksResponse.data);
                setMostActiveUsers(usersResponse.data);
                setLoansByCategory(categoriesResponse.data);
                setAverageLoans(averageResponse.data.average_loans);
            } catch (error) {
                console.error("Error al obtener las estadísticas:", error);
            }
        }
    };

    return (
        <div className="d-flex mt-5">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <div className="card shadow-lg border-0 p-4">
                    <div className="card-header text-black text-center">
                        <h1 className="mb-0">Estadísticas de la Biblioteca</h1>
                    </div>
                    <div className="card-body">
                        {/* Promedio de libros prestados por usuario */}
                        <div className="mb-4">
                            <h4>Promedio de libros prestados por usuario</h4>
                            <p className="fs-5">{averageLoans || "Cargando..."}</p>
                        </div>

                        {/* Libros más prestados */}
                        <div className="mb-4">
                            <h4>Libros Más Prestados</h4>
                            <table className="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Autor</th>
                                        <th>Total Préstamos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostBorrowedBooks.length > 0 ? (
                                        mostBorrowedBooks.map((book) => (
                                            <tr key={book.book_id}>
                                                <td>{book.book.title}</td>
                                                <td>{book.book.author}</td>
                                                <td>{book.total_loans}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">Cargando...</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Usuarios más activos */}
                        <div className="mb-4">
                            <h4>Usuarios Más Activos</h4>
                            <table className="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Total Préstamos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mostActiveUsers.length > 0 ? (
                                        mostActiveUsers.map((user) => (
                                            <tr key={user.user_id}>
                                                <td>{user.user.name}</td>
                                                <td>{user.user.email}</td>
                                                <td>{user.total_loans}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">Cargando...</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Préstamos por categoría */}
                        <div className="mb-4">
                            <h4>Préstamos por Categoría</h4>
                            <table className="table table-striped text-center">
                                <thead>
                                    <tr>
                                        <th>Categoría</th>
                                        <th>Total Préstamos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loansByCategory.length > 0 ? (
                                        loansByCategory.map((category, index) => (
                                            <tr key={index}>
                                                <td>{category.name}</td>
                                                <td>{category.total_loans}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2">Cargando...</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsList;