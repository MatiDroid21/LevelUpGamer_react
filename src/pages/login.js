import { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function LoginComponent() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const validarLogin = (event) => {
    event.preventDefault();

    if (!correo && !contrasena) {
      Swal.fire({
        title: "Error!",
        text: "Debes ingresar tu correo y contraseña",
        icon: "error",
      });
    } else if (!correo) {
      Swal.fire({
        title: "Error!",
        text: "Debes ingresar tu correo",
        icon: "error",
      });
    } else if (!contrasena) {
      Swal.fire({
        title: "Error!",
        text: "Debes ingresar tu contraseña",
        icon: "error",
      });
    } else {
      // Guardar usuario en localStorage
      localStorage.setItem("usuario", correo);
      
      // 🔔 Disparar evento para notificar al HeaderComponent
      window.dispatchEvent(new Event("usuarioCambiado"));

      Swal.fire({
        title: "Bienvenido!",
        text: correo,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/"); // redirige a Home
      });
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center fw-bold mb-3">Iniciar sesión</h2>
        <form onSubmit={validarLogin}>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="********"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">Iniciar sesión</button>

          <p className="mt-3 text-center">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-decoration-none">Regístrate aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
