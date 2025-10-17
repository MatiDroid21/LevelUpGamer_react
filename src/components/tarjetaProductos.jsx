import { useState } from "react";

export default function ProductCard({ producto, agregarAlCarrito }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={producto.imagen} className="card-img-top img-container" alt={producto.nombre} />
        <div className="card-body d-flex flex-column">
          <h5>{producto.nombre}</h5>
          <p>{producto.descripcion}</p>
          <p><strong>Precio:</strong> ${producto.precio.toLocaleString("es-CL")}</p>
          <button className="btn btn-primary mt-auto" onClick={() => setModalOpen(true)}>
            Ver detalles
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="modal d-block" tabIndex="-1" onClick={() => setModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{producto.nombre}</h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body text-center">
                <img src={producto.imagen} className="img-fluid mb-3" alt={producto.nombre} />
                <p>{producto.descripcion}</p>
                <strong className="text-success">${producto.precio.toLocaleString("es-CL")}</strong>
              </div>
              <div className="modal-footer justify-content-center">
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cerrar</button>
                <button className="btn btn-success" onClick={() => { agregarAlCarrito(producto); setModalOpen(false); }}>
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
