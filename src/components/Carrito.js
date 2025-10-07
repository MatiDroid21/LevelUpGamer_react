import Swal from "sweetalert2";

export default function Cart({ carrito, eliminarDelCarrito, total, descuento, totalConDescuento, setCarrito }) {
  const realizarCompra = () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "Carrito vacío",
        text: "Agrega productos antes de comprar.",
        icon: "info",
      });
      return;
    }

    const totalFinal = descuento > 0 ? totalConDescuento : total;

    Swal.fire({
      title: "¡Compra realizada!",
      html: `
        <p>Gracias por tu compra 🛍️</p>
        <p><strong>Total pagado:</strong> $${totalFinal.toLocaleString("es-CL")}</p>
        ${descuento > 0 ? "<p class='text-success'>(Descuento DUOCUC aplicado ✅)</p>" : ""}
      `,
      icon: "success",
      confirmButtonText: "Aceptar",
    });

    // Vaciar carrito después de la compra
    setCarrito([]);
    localStorage.removeItem("carrito");
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
        <>
          <div className="mt-3 text-end">
            <strong>Total: ${total.toLocaleString("es-CL")}</strong>
            {descuento > 0 && (
              <div className="text-success">
                Total con 20% de dscto estudiante DUOCUC: $
                {totalConDescuento.toLocaleString("es-CL")}
              </div>
            )}
          </div>

          <div className="text-end mt-3">
            <button className="btn btn-success" onClick={realizarCompra}>
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}
