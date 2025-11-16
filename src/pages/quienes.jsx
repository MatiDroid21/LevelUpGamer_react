import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/quienes.css";
import FooterComponent from "../components/FooterComponent";

export default function QuienesSomos() {
    useEffect(() => {
        document.title = "LevelUpGamer - Quiénes Somos";
    }, []);

    return (
        <div>
            {/* MAIN */}
            <main>
                {/* HERO */}
                <section className="hero text-center py-5">
                    <h1>⚡ Quiénes Somos</h1>
                    <p>
                        LevelUpGamer es más que una tienda... somos una comunidad gamer en constante
                        evolución.
                    </p>
                </section>

                {/* MISION Y VISION */}
                <section className="seccion container text-center">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="card-gamer p-4 h-100">
                                <div className="icono mb-3">🎯</div>
                                <h2>Misión</h2>
                                <p>
                                    Proporcionar productos de alta calidad para gamers en todo Chile,
                                    ofreciendo una experiencia de compra única y personalizada, con un
                                    enfoque en la satisfacción del cliente y el crecimiento de la comunidad
                                    gamer.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card-gamer p-4 h-100">
                                <div className="icono mb-3">🚀</div>
                                <h2>Visión</h2>
                                <p>
                                    Ser la tienda online líder en productos para gamers en Chile, reconocida
                                    por su innovación, servicio al cliente excepcional y un programa de
                                    fidelización que recompense a nuestros clientes más fieles.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <FooterComponent />
        </div>
    );
}
