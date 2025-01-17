import React from "react";
const Footer = () => {
    return (
        <footer className="bg-dark text-center text-light py-3 mt-5" style={{ backgroundColor: '#3E5C48' }}>
            <div className="container">
                <p className="mb-0" style={{ fontFamily: 'Georgia, serif' }}>
                    <strong>Prueba Técnica Biblioteca Laravel y React JS</strong> - Diseñado por <span className="fw-bold" style={{ fontFamily: 'Georgia, serif' }}>Jorge Eslava</span>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
