import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import logo from "../assets/img/LevelupGamer.png";
import Swal from "sweetalert2";

export default function HeaderComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [hora, setHora] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [carritoCount, setCarritoCount] = useState(0);

  // Actualizar hora cada segundo
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

  // Cargar usuario cada vez que cambie isAuthenticated o user
  useEffect(() => {
    if (isAuthenticated && user) {
      // Si hay autenticación, usar el user del contexto primero
      setUsuarioActual(user);
    } else {
      // Si no hay autenticación en el contexto, revisar localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUsuarioActual(userData);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUsuarioActual(null);
        }
      } else {
        setUsuarioActual(null);
      }
    }
  }, [isAuthenticated, user]); // Se ejecuta cada vez que cambia el estado de autenticación

  // Actualizar contador del carrito
  useEffect(() => {
    const actualizarCarrito = () => {
      const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
      const totalItems = carrito.reduce((sum, item) => sum + (item.cantidad || 1), 0);
      setCarritoCount(totalItems);
    };

    actualizarCarrito();

    // Escuchar cambios en el carrito
    window.addEventListener("storage", actualizarCarrito);
    window.addEventListener("carritoActualizado", actualizarCarrito);

    return () => {
      window.removeEventListener("storage", actualizarCarrito);
      window.removeEventListener("carritoActualizado", actualizarCarrito);
    };
  }, []);

  // Aplicar tema con variables CSS y data-bs-theme
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    // Limpiar todo
    logout(); // Llamar al logout del contexto
    localStorage.removeItem("user");
    localStorage.removeItem("carrito");
    setUsuarioActual(null);
    
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión correctamente",
      timer: 2000,
      showConfirmButton: false
    });

    navigate("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Calcular nivel del usuario
  const calcularNivel = (puntos) => {
    if (puntos < 100) return { nivel: "Bronce", color: "#CD7F32", icono: "🥉" };
    if (puntos < 500) return { nivel: "Plata", color: "#C0C0C0", icono: "🥈" };
    if (puntos < 1000) return { nivel: "Oro", color: "#FFD700", icono: "🥇" };
    if (puntos < 2500) return { nivel: "Platino", color: "#E5E4E2", icono: "💎" };
    return { nivel: "Diamante", color: "#B9F2FF", icono: "💠" };
  };

  const nivelInfo = usuarioActual ? calcularNivel(usuarioActual.puntos || 0) : null;

  // Verificar si es usuario DUOC
  const esDuocUser = usuarioActual?.correo?.toLowerCase().includes("@duocuc.cl");

  // Determinar si está realmente autenticado
  const estaAutenticado = isAuthenticated || usuarioActual !== null;

  return (
    <nav className="navbar navbar-expand-lg shadow-sm border-bottom sticky-top bg-body-tertiary">
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
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-fill"></i> Home
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                <i className="bi bi-bag-fill"></i> Productos
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/noticias">
                <i className="bi bi-newspaper"></i> Noticias
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/quienes-somos">
                <i className="bi bi-info-circle-fill"></i> Quiénes Somos
              </Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">
                <i className="bi bi-envelope-fill"></i> Contacto
              </Link>
            </li>

            {/* Links adicionales si está autenticado */}
            {estaAutenticado && (
              <li className="nav-item">
                <Link className="nav-link" to="/canjes">
                  <i className="bi bi-gift-fill text-warning"></i> Canjes
                </Link>
              </li>
            )}
          </ul>

          {/* Sección derecha */}
          <div className="d-flex align-items-center gap-2">
            {/* Reloj */}
            <span className="nav-link me-2 fw-semibold d-none d-lg-block">
              <i className="bi bi-clock"></i> {hora}
            </span>

            {/* Carrito de compras */}
            {estaAutenticado && (
              <Link 
                to="/productos" 
                className="btn btn-outline-primary btn-sm position-relative me-2"
                title="Ver carrito"
              >
                <i className="bi bi-cart3"></i>
                {carritoCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {carritoCount}
                    <span className="visually-hidden">items en carrito</span>
                  </span>
                )}
              </Link>
            )}

            {/* Botón para togglear tema */}
            <button
              className={`btn btn-sm ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"}`}
              onClick={toggleTheme}
              title={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Usuario autenticado */}
            {estaAutenticado && usuarioActual ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-success btn-sm dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i>
                  <span className="d-none d-md-inline">
                    {usuarioActual.nombre?.split(" ")[0] || "Usuario"}
                  </span>
                  {/* Badge de nivel */}
                  {nivelInfo && (
                    <span 
                      className="badge" 
                      style={{ 
                        backgroundColor: nivelInfo.color,
                        color: "#000"
                      }}
                    >
                      {nivelInfo.icono} {nivelInfo.nivel}
                    </span>
                  )}
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="userDropdown">
                  {/* Header del menú */}
                  <li className="dropdown-header">
                    <div className="d-flex flex-column">
                      <span className="fw-bold">{usuarioActual.nombre}</span>
                      <small className="text-muted">{usuarioActual.correo}</small>
                      {esDuocUser && (
                        <span className="badge bg-info mt-1">
                          <i className="bi bi-award-fill"></i> Usuario DUOC (20% OFF)
                        </span>
                      )}
                    </div>
                  </li>
                  
                  <li><hr className="dropdown-divider" /></li>

                  {/* Puntos y nivel */}
                  <li className="dropdown-item-text">
                    <div className="d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-star-fill text-warning"></i> Puntos:</span>
                      <span className="badge bg-warning text-dark fw-bold">
                        {usuarioActual.puntos || 0}
                      </span>
                    </div>
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  {/* Enlaces del menú */}
                  <li>
                    <Link className="dropdown-item" to="/perfil">
                      <i className="bi bi-person-fill"></i> Mi Perfil
                    </Link>
                  </li>
                  
                  <li>
                    <Link className="dropdown-item" to="/canjes">
                      <i className="bi bi-gift-fill"></i> Canjear Puntos
                    </Link>
                  </li>
                  
                  <li>
                    <button 
                      className="dropdown-item"
                      onClick={() => {
                        const codigoReferido = usuarioActual.codigoReferido || "LEVELUP";
                        navigator.clipboard.writeText(codigoReferido);
                        
                        const Toast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 2000,
                          timerProgressBar: true,
                        });
                        
                        Toast.fire({
                          icon: 'success',
                          title: '¡Código copiado!'
                        });
                      }}
                    >
                      <i className="bi bi-clipboard"></i> Copiar código referido
                      <br />
                      <small className="text-muted">
                        {usuarioActual.codigoReferido || "LEVELUP"}
                      </small>
                    </button>
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  {/* Cerrar sesión */}
                  <li>
                    <button 
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              /* Botones para usuarios no autenticados */
              <div className="d-flex gap-2">
                <Link className="btn btn-outline-success btn-sm" to="/login">
                  <i className="bi bi-box-arrow-in-right"></i> Iniciar sesión
                </Link>
                <Link className="btn btn-success btn-sm d-none d-md-inline" to="/register">
                  <i className="bi bi-person-plus-fill"></i> Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
