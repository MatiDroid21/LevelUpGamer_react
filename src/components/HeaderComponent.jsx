import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import logo from "../assets/img/LevelupGamer.png";

export default function HeaderComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [hora, setHora] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      setHora(
        `${ahora.getHours().toString().padStart(2, "0")}:${ahora
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
    };
    actualizarHora();
    const intervalo = setInterval(actualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm border-bottom">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="LevelUp Gamer logo"
            width="36"
            height="32"
            className="me-2"
          />
          <span className="fw-bold text-gradient">LevelUpGamer</span>
        </Link>
        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
            )}
            <li><Link className="nav-link" to="/noticias">Noticias</Link></li>
            <li><Link className="nav-link" to="/quienes-somos">Quiénes Somos</Link></li>
            <li><Link className="nav-link" to="/contacto">Contacto</Link></li>
            <li><Link className="nav-link" to="/perfil">Perfil</Link></li>
            {/* Panel administración solo para admin */}
            {isAuthenticated && user?.rolNombre?.toUpperCase() === "ADMIN" && (
              <li>
                <Link className="nav-link" to="/admin">Panel de Administración</Link>
              </li>
            )}
          </ul>
          <span className="nav-link me-3 fw-semibold">{hora}</span>
          {/* Botón para togglear tema */}
          <button
            className={`btn btn-sm me-2 ${theme === "dark" ? "btn-light" : "btn-dark"}`}
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
          {isAuthenticated ? (
            <>
              <span className="me-2 fw-bold text-success">
                👤 {user?.correo || "Usuario"}
              </span>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link className="btn btn-outline-success btn-sm" to="/login">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
