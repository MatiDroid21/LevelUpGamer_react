import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../styles/checkout.css"; // Opcional: para estilos extra

export default function Checkout() {
    const [carrito, setCarrito] = useState([]);
    const [descuento, setDescuento] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalConDescuento, setTotalConDescuento] = useState(0);

    useEffect(() => {
        const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(guardado);

        const usuario = localStorage.getItem("usuario");
        const desc = usuario?.endsWith("@duocuc.cl") ? 0.2 : 0;
        setDescuento(desc);

        const t = guardado.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        setTotal(t);
        setTotalConDescuento(t - t * desc);
    }, []);

    const finalizarCompra = () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: "Carrito vacío",
                text: "No hay productos para pagar.",
                icon: "info"
            });
            return;
        }

        Swal.fire({
            title: "¡Compra realizada!",
            html: `
                <p>Gracias por tu compra 🛍️</p>
                <p><strong>Total pagado:</strong> $${(descuento > 0 ? totalConDescuento : total).toLocaleString("es-CL")}</p>
                ${descuento > 0 ? "<p class='text-success'>(Descuento DUOCUC aplicado)</p>" : ""}
            `,
            icon: "success",
            confirmButtonText: "Aceptar"
        }).then(() => {
            localStorage.removeItem("carrito");
            setCarrito([]);
            setTotal(0);
            setTotalConDescuento(0);
        });
    };

    if (carrito.length === 0) {
        return (
            <div className="container my-5">
                <h1>Carrito vacío</h1>
                <p>No hay productos para pagar.</p>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1>Detalle de la compra 🛒</h1>

            <ul className="list-group mb-3">
                {carrito.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img 
                                src={item.imagen} 
                                alt={item.nombre} 
                                style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "15px", borderRadius: "5px" }} 
                            />
                            <div>
                                <span>{item.nombre}</span><br />
                                <small className="text-muted">Cantidad: {item.cantidad}</small>
                            </div>
                        </div>
                        <span>${(item.precio * item.cantidad).toLocaleString("es-CL")}</span>
                    </li>
                ))}
            </ul>

            <div className="text-end mb-3">
                <strong>Total: ${total.toLocaleString("es-CL")}</strong>
                {descuento > 0 && (
                    <div className="text-success">
                        Total con descuento: ${totalConDescuento.toLocaleString("es-CL")}
                    </div>
                )}
            </div>

            <div className="text-end">
                {/* <button className="btn btn-success" onClick={finalizarCompra}>
                    Finalizar compra
                </button> */}
                <button className="btn btn-success" onClick={finalizarCompra}>
                    Finalizar compra
                </button>
            </div>
        </div>
    );
}
