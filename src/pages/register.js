import { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/registrarseForm.css";

export default function RegisterComponent() {
    // Estados locales
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Validación
    const validarRegistro = (e) => {
        e.preventDefault();

        if (!nombre || !correo || !direccion || !password || !confirmPassword) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios.",
                icon: "error",
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                title: "Error",
                text: "Las contraseñas no coinciden.",
                icon: "error",
            });
            return;
        }

        // Si todo está correcto
        Swal.fire({
            title: "¡Registro exitoso!",
            text: "Tu cuenta ha sido creada correctamente 🎮",
            icon: "success",
        });

        // Limpiar formulario
        setNombre("");
        setCorreo("");
        setDireccion("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
            <div className="form-box text-center p-4 rounded shadow-lg bg-body-tertiary">
                <h2 className="fw-bold mb-2">Crea tu cuenta</h2>
                <p>Únete a LevelUpGamer 🚀</p>

                <form onSubmit={validarRegistro}>
                    {/* Nombre */}
                    <div className="mb-3 text-start">
                        <label htmlFor="name" className="form-label">Nombre completo</label>
                        <div className="input-group">
                            <div className="input-group-text">
                                <i className="fa-solid fa-user fa-fade" style={{ color: "#39FF14" }}></i>
                            </div>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Ej: Mati Droid"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Correo */}
                    <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                        <div className="input-group">
                            <div className="input-group-text">
                                <i className="fa-solid fa-at fa-fade" style={{ color: "#39FF14" }}></i>
                            </div>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="correo@ejemplo.com"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Dirección */}
                    <div className="mb-3 text-start">
                        <label htmlFor="address" className="form-label">Dirección</label>
                        <div className="input-group">
                            <div className="input-group-text">
                                <i className="fa-solid fa-location-dot fa-fade" style={{ color: "#39FF14" }}></i>
                            </div>
                            <input
                                type="text"
                                id="address"
                                className="form-control"
                                placeholder="Calle 123, Santiago"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div className="mb-3 text-start">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <div className="input-group">
                            <div className="input-group-text">
                                <i className="fa-solid fa-key fa-fade" style={{ color: "#39FF14" }}></i>
                            </div>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="***********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Confirmar contraseña */}
                    <div className="mb-3 text-start">
                        <label htmlFor="confirm-password" className="form-label">Confirmar contraseña</label>
                        <div className="input-group">
                            <div className="input-group-text">
                                <i className="fa-solid fa-key fa-fade" style={{ color: "#39FF14" }}></i>
                            </div>
                            <input
                                type="password"
                                id="confirm-password"
                                className="form-control"
                                placeholder="***********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Botón */}
                    <button type="submit" className="btn btn-gamer w-100">
                        Registrarse
                    </button>
                </form>

                <p className="mt-3">
                    ¿Ya tienes cuenta?{" "}
                    <a href="/login" className="text-decoration-none text-success">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    );
}
