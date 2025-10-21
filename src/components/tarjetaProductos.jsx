import { useState, useEffect } from "react";

// Componente Precio formateado
function Precio({ valor }) {
  return (
    <strong className="text-success">
      ${valor.toLocaleString("es-CL")}
    </strong>
  );
}

export default function ProductCard({ producto, agregarAlCarrito }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Detecta el modo oscuro global desde localStorage
  useEffect(() => {
    const temaGuardado = localStorage.getItem("theme");
    setDarkMode(temaGuardado === "dark");

    // Observa cambios de tema (cuando el usuario cambia desde el header)
    const observer = new MutationObserver(() => {
      setDarkMode(document.body.classList.contains("bg-dark"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleComprar = () => {
    agregarAlCarrito(producto);
    setModalOpen(false);
  };

  return (
    <div className="col-md-4 mb-4">
      {/* Tarjeta */}
      <div
        className={`card h-100 shadow-sm ${
          darkMode ? "bg-dark text-light border-light" : "bg-light text-dark"
        }`}
      >
        <img
          src={producto.imagen}
          className="card-img-top img-container"
          alt={producto.nombre}
          loading="lazy"
          style={{
            objectFit: "cover",
            height: "220px",
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5>{producto.nombre}</h5>
          <p className="flex-grow-1">{producto.descripcion}</p>
          <p><Precio valor={producto.precio} /></p>
          <button
            className={`btn mt-auto ${
              darkMode ? "btn-outline-light" : "btn-primary"
            }`}
            onClick={() => setModalOpen(true)}
          >
            Ver detalles
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="modal d-block"
          tabIndex="-1"
          onClick={() => setModalOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`modal-content ${
                darkMode ? "bg-dark text-light border-light" : ""
              }`}
            >
              <div className="modal-header border-0">
                <h5 className="modal-title">{producto.nombre}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setModalOpen(false)}
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={producto.imagen}
                  className="img-fluid mb-3 rounded"
                  alt={producto.nombre}
                  loading="lazy"
                />
                <p>{producto.descripcion}</p>
                <Precio valor={producto.precio} />
              </div>
              <div className="modal-footer justify-content-center border-0">
                <button
                  className={`btn ${
                    darkMode ? "btn-outline-light" : "btn-secondary"
                  }`}
                  onClick={() => setModalOpen(false)}
                >
                  Cerrar
                </button>
                <button
                  className={`btn ${
                    darkMode ? "btn-success" : "btn-success"
                  }`}
                  onClick={handleComprar}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
