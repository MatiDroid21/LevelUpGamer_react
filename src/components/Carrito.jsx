import { useNavigate } from "react-router-dom";

export default function Cart({ carrito, eliminarDelCarrito, total, descuento, totalConDescuento }) {
  const navigate = useNavigate();

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      alert("Carrito vacío. Agrega productos antes de continuar.");
      return;
    }

    navigate("/checkout", {
      state: { carrito, total, totalConDescuento, descuento }
    });
  };


  return (
    <div className="mt-5">
      <h3>🛒 Carrito de Compras</h3>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul className="list-group">
          {carrito.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{item.nombre}</strong> x {item.cantidad}
              </div>
              <div>
                <span className="me-3">
                  ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {carrito.length > 0 && (
        <div className="text-end mt-3">
          <strong>Total: ${total.toLocaleString("es-CL")}</strong>
          {descuento > 0 && (
            <div className="text-success">
              Total con 20% de dscto estudiante DUOCUC: ${totalConDescuento.toLocaleString("es-CL")}
            </div>
          )}

          <button className="btn btn-success mt-2" onClick={finalizarCompra}>
            Ir a Pagar
          </button>
        </div>
      )}
    </div>
  );
}
