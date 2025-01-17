import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div className="bg-dark text-white text-center py-5">
                <h1>Bienvenido a la Biblioteca Virtual</h1>
                <p className="mt-3">
                    Explora miles de libros desde la comodidad de tu hogar. Descubre categorías, géneros y más.
                </p>
            </div>

            <div className="container my-5">
                <h2 className="text-center mb-4">Categorías Destacadas</h2>
                <div className="row text-center">
                    <div className="col-md-3 mb-4">
                        <div className="card h-100 shadow">
                            <div className="card-body">
                                <h5 className="card-title">Ficción</h5>
                                <p className="card-text">Sumérgete en mundos imaginarios llenos de aventuras y emociones.</p>
                                <Link to="/register" className="btn btn-primary">
                                    Explorar
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card h-100 shadow">
                            <div className="card-body">
                                <h5 className="card-title">Ciencia</h5>
                                <p className="card-text">Aprende sobre los últimos descubrimientos y avances científicos.</p>
                                <Link to="/register" className="btn btn-primary">
                                    Explorar
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card h-100 shadow">
                            <div className="card-body">
                                <h5 className="card-title">Historia</h5>
                                <p className="card-text">Viaja al pasado y descubre los eventos que moldearon el mundo.</p>
                                <Link to="/register" className="btn btn-primary">
                                    Explorar
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <div className="card h-100 shadow">
                            <div className="card-body">
                                <h5 className="card-title">Tecnología</h5>
                                <p className="card-text">Mantente al día con las innovaciones y tendencias tecnológicas.</p>
                                <Link to="/register" className="btn btn-primary">
                                    Explorar
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Libros Más Populares</h2>
                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 shadow">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu4vwkvHsfzm2qnterTvyd1ZKKo_4jCzvTbA&s"
                                    className="card-img-top img-fluid"
                                    alt="Libro 1"
                                    style={{ maxHeight: "500px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">El Gran Gatsby</h5>
                                    <p className="card-text">Autor: F. Scott Fitzgerald</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 shadow">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd24LPozI4tGh1jHJ0CB6a4r6in39jH3b_Jw&s"
                                    className="card-img-top img-fluid"
                                    alt="Libro 2"
                                    style={{ maxHeight: "500px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">1984</h5>
                                    <p className="card-text">Autor: George Orwell</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 shadow">
                                <img
                                    src="https://imagessl3.casadellibro.com/a/l/s5/23/9788499926223.webp"
                                    className="card-img-top img-fluid"
                                    alt="Libro 3"
                                    style={{ maxHeight: "500px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Sapiens</h5>
                                    <p className="card-text">Autor: Yuval Noah Harari</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-dark text-white text-center py-5">
                <h2>¡Empieza tu viaje literario hoy mismo!</h2>
                <p className="mt-3">
                    Accede a un catálogo infinito de libros. Lee, aprende y explora como nunca antes.
                </p>
                <Link to="/register" className="btn btn-light">
                    Registrarse
                </Link>
            </div>
        </div>
    );
};

export default Home;
