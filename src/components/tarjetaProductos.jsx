import { useState } from "react";

// Componente Precio formateado
function Precio({ valor }) {
  return <strong className="text-success">${valor.toLocaleString("es-CL")}</strong>;
}

export default function ProductCard({ producto, agregarAlCarrito }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleComprar = () => {
    agregarAlCarrito(producto);
    setModalOpen(false);
  };

  return (
    <div className="col-md-4 mb-4">
      {/* Tarjeta */}
      <div className="card h-100 shadow-sm">
        <img
          src={producto.imagen}
          className="card-img-top img-container"
          alt={producto.nombre}
          loading="lazy"
        />
        <div className="card-body d-flex flex-column">
          <h5>{producto.nombre}</h5>
          <p>{producto.descripcion}</p>
          <p><Precio valor={producto.precio} /></p>
          <button className="btn btn-primary mt-auto" onClick={() => setModalOpen(true)}>
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
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{producto.nombre}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={producto.imagen}
                  className="img-fluid mb-3"
                  alt={producto.nombre}
                  loading="lazy"
                />
                <p>{producto.descripcion}</p>
                <Precio valor={producto.precio} />
              </div>
              <div className="modal-footer justify-content-center">
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cerrar
                </button>
                <button className="btn btn-success" onClick={handleComprar}>
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
