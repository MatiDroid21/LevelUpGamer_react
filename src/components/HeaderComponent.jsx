import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/LevelupGamer.png";

export default function HeaderComponent() {
  const [hora, setHora] = useState("");
  const [modoOscuro, setModoOscuro] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || null);
  const navigate = useNavigate();

  // Actualizar hora
  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      const horas = String(ahora.getHours()).padStart(2, "0");
      const minutos = String(ahora.getMinutes()).padStart(2, "0");
      setHora(`${horas}:${minutos}`);
    };
    actualizarHora();
    const intervalo = setInterval(actualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  // Aplicar modo oscuro/claro
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute("data-bs-theme", modoOscuro ? "dark" : "light");
  }, [modoOscuro]);

  // Detectar cambio del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setModoOscuro(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Escuchar cambios en el usuario (login/logout)
  useEffect(() => {
    const actualizarUsuario = () => setUsuario(localStorage.getItem("usuario"));
    window.addEventListener("usuarioCambiado", actualizarUsuario);
    return () => window.removeEventListener("usuarioCambiado", actualizarUsuario);
  }, []);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" width="30" height="24" />
        </Link>

        {/* Botón responsive */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del navbar */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Menú principal */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>

            {/* Solo visible si hay usuario */}
            {usuario && (
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/quienes-somos">Quiénes Somos</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/noticias">Noticias</Link>
            </li>
          </ul>

          {/* Reloj */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <span className="nav-link active">{hora}</span>
            </li>
          </ul>

          {/* Usuario o Login */}
          <div className="d-flex align-items-center ms-3">
            {usuario ? (
              <>
                <span className="me-2 text-success fw-bold">👤 {usuario}</span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-outline-success btn-sm">
                Iniciar sesión
              </Link>
            )}
          </div>

          {/* Switch modo oscuro */}
          <div className="form-check form-switch text-nowrap ms-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="themeSwitch"
              checked={modoOscuro}
              onChange={() => setModoOscuro(!modoOscuro)}
            />
            <label className="form-check-label" htmlFor="themeSwitch">
              {modoOscuro ? "🌙" : "💡"}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}
