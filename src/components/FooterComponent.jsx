import React from "react";
import "../styles/footer.css";

export default function FooterComponent() {
    return (
        <footer className="footer text-center text-lg-start mt-5">
            <div className="container p-4">
                <div className="row">
                    {/* Columna 1 */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5 className="fw-bold text-accent">Level-Up Gamer</h5>
                        <p className="footer-text">
                            Tienda gamer chilena 🎮 especializada en consolas, accesorios,
                            PCs y sillas ergonómicas.
                            <br />
                            Despachos a todo Chile 🚚
                        </p>
                    </div>

                    {/* Columna 2 */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5 className="fw-bold text-accent">Enlaces útiles</h5>
                        <ul className="list-unstyled footer-links">
                            <li><a href="#!">Tienda</a></li>
                            <li><a href="#!">Envíos y devoluciones</a></li>
                            <li><a href="#!">Medios de pago</a></li>
                            <li><a href="#!">Soporte técnico</a></li>
                        </ul>
                    </div>

                    {/* Columna 3 */}
                    <div className="col-lg-4 col-md-12 mb-4">
                        <h5 className="fw-bold text-accent">Contacto</h5>
                        <ul className="list-unstyled footer-contact">
                            <li className="footer-text"><i className="bi bi-envelope-fill me-2"></i> contacto@levelupgamer.cl</li>
                            <li className="footer-text"><i className="bi bi-phone-fill me-2"></i> +56 9 9999 9999</li>
                            <li className="footer-text"><i className="bi bi-truck me-2"></i> Envíos a todo Chile</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom text-center p-3">
                © 2025 <strong>Level-Up Gamer</strong> 🎮 | Todos los derechos reservados
            </div>
        </footer>
    );
}
