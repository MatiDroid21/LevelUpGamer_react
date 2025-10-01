export default function Footer() {
    return (
        <footer id="footer" className="text-center text-lg-start mt-5">
            <div className="container p-4">
                <div className="row">
                    {/* Columna 1 */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5 className="fw-bold">Level-Up Gamer</h5>
                        <p>
                            Tienda online gamer en Chile 🎮
                            Consolas, accesorios, computadores y sillas especializadas.
                            Despachos a todo el país 🚚.
                        </p>
                    </div>

                    {/* Columna 2 */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <h5 className="fw-bold">Links útiles</h5>
                        <ul className="list-unstyled">
                            <li><a href="#">Tienda</a></li>
                            <li><a href="#">Envíos y devoluciones</a></li>
                            <li><a href="#">Medios de pago</a></li>
                            <li><a href="#">Soporte técnico</a></li>
                        </ul>
                    </div>

                    {/* Columna 3 */}
                    <div className="col-lg-4 col-md-12 mb-4">
                        <h5 className="fw-bold">Contacto</h5>
                        <ul className="list-unstyled">
                            <li><i className="bi bi-envelope"></i> contacto@levelupgamer.cl</li>
                            <li><i className="bi bi-phone"></i> +56 9 9999 9999</li>
                            <li><i className="bi bi-truck"></i> Despacho a todo Chile</li>
                        </ul>

                        {/* Redes */}
                        <div className="mt-3">
                            <a className="btn btn-social btn-floating m-1" href="#"><i className="bi bi-facebook"></i></a>
                            <a className="btn btn-social btn-floating m-1" href="#"><i className="bi bi-instagram"></i></a>
                            <a className="btn btn-social btn-floating m-1" href="#"><i className="bi bi-tiktok"></i></a>
                            <a className="btn btn-social btn-floating m-1" href="#"><i className="bi bi-discord"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center p-3 footer-bottom">
                © 2025 <strong>Level-Up Gamer</strong> 🎮 | Todos los derechos reservados
            </div>
        </footer>
    );
}
