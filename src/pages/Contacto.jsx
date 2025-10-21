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
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { nombre, email, tipoMensaje, mensaje } = formData;

        // Validar campos vacíos
        if (!nombre.trim() || !email.trim() || !tipoMensaje || !mensaje.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos ⚠️",
                text: "Por favor, completa todos los campos antes de enviar.",
                confirmButtonColor: "#ffb703",
            });
            return;
        }

        // Validar formato de correo
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
            <section className="hero text-center py-5">
                <div className="container">
                    <h1 className="fw-bold mb-3">📩 Contáctanos</h1>
                    <p className="lead">
                        ¿Tienes dudas o necesitas ayuda? Escríbenos y nuestro equipo gamer
                        responderá a la velocidad de la luz 🚀
                    </p>
                </div>
            </section>

            {/* FORMULARIO */}
            <section className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit} className="form-gamer shadow-lg p-4 rounded">
                            {/* Nombre */}
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">
                                    👤 Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="form-control"
                                    placeholder="Tu nombre gamer"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Correo */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    📧 Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="tuemail@ejemplo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Tipo de mensaje */}
                            <div className="mb-3">
                                <label htmlFor="tipoMensaje" className="form-label">
                                    📌 Tipo de mensaje
                                </label>
                                <select
                                    id="tipoMensaje"
                                    className="form-select"
                                    value={formData.tipoMensaje}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="Consulta">Consulta</option>
                                    <option value="Sugerencia">Sugerencia</option>
                                    <option value="Reclamo">Reclamo</option>
                                </select>
                            </div>

                            {/* Mensaje */}
                            <div className="mb-3">
                                <label htmlFor="mensaje" className="form-label">
                                    💬 Mensaje
                                </label>
                                <textarea
                                    id="mensaje"
                                    rows="4"
                                    className="form-control"
                                    placeholder="Escribe tu mensaje aquí..."
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            {/* Botón */}
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
