import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FooterComponent from "../components/FooterComponent";
import "../styles/contacto.css";

export default function Contacto() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        tipoMensaje: "",
        mensaje: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { nombre, email, tipoMensaje, mensaje } = formData;

        // Validaciones
        if (!nombre || !email || !tipoMensaje || !mensaje) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos ⚠️",
                text: "Por favor, completa todos los campos antes de enviar.",
            });
            return;
        }

        // Validación simple de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: "error",
                title: "Correo inválido ❌",
                text: "Por favor, ingresa un correo electrónico válido.",
                confirmButtonColor: "#9b59b6",
            });
            return;
        }

        // Éxito
        Swal.fire({
            icon: "success",
            title: "Mensaje enviado 🎮",
            text: "¡Gracias por contactarnos! Te responderemos pronto.",
            confirmButtonColor: "#63E6BE",
        });

        // Reiniciar formulario
        setFormData({
            nombre: "",
            email: "",
            tipoMensaje: "",
            mensaje: "",
        });
    };

    return (
        <>
            {/* HERO */}
            <section className="hero">
                <h1 className="fw-bold mb-3">📩 Contáctanos</h1>
                <p>
                    ¿Tienes dudas o necesitas ayuda? Escríbenos y nuestro equipo gamer
                    responderá a la velocidad de la luz 🚀
                </p>
            </section>

            {/* FORMULARIO */}
            <section className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form
                            onSubmit={handleSubmit}
                            className="form-gamer"
                            data-testid="contacto-form"
                        >
                            <div className="mb-3">
                                <label htmlFor="nombre">👤 Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Tu nombre gamer"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email">📧 Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="tuemail@ejemplo.com"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tipoMensaje">📌 Tipo de mensaje</label>
                                <select
                                    className="form-select"
                                    id="tipoMensaje"
                                    value={formData.tipoMensaje}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Consulta">Consulta</option>
                                    <option value="Sugerencia">Sugerencia</option>
                                    <option value="Reclamo">Reclamo</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="mensaje">💬 Mensaje</label>
                                <textarea
                                    className="form-control"
                                    id="mensaje"
                                    rows="4"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    placeholder="Escribe tu mensaje aquí..."
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-gamer w-100 py-2 fw-bold">
                                Enviar mensaje 🚀
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <FooterComponent />
        </>
    );
}
