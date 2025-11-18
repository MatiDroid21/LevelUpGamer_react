import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

export default function LoginComponent() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const validarLogin = async (event) => {
    event.preventDefault();
    const res = await login(correo, contrasena);
    if (!res.ok) {
      Swal.fire({ title: "Error", text: res.message, icon: "error" });
      return;
    }
    Swal.fire({
      title: "Bienvenido!",
      text: `Hola ${res.user?.nombre || res.user?.email || "Usuario"}`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => navigate("/"));
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center fw-bold mb-3">Iniciar sesión</h2>
        <form role="form" onSubmit={validarLogin}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="********"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Ingresar
          </button>
          <p className="mt-3 text-center">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-decoration-none">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
