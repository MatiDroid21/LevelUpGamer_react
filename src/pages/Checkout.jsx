import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../styles/checkout.css";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const navigate = useNavigate();

    const [carrito, setCarrito] = useState([]);
    const [descuento, setDescuento] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalConDescuento, setTotalConDescuento] = useState(0);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Leer carrito desde localStorage
        const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(guardado);

        // Leer usuario y calcular descuento DUOC UC de forma segura
        const storedUser = localStorage.getItem("user");
        const correo = storedUser ? JSON.parse(storedUser).email || "" : "";
        const desc = correo.toLowerCase().endsWith("@duocuc.cl") ? 0.2 : 0;
        setDescuento(desc);

        // Calcular totales (cuida que precio y cantidad sean números)
        const t = guardado.reduce(
            (acc, item) =>
                acc + (item.precio ? Number(item.precio) : 0) * (item.cantidad ? Number(item.cantidad) : 0),
            0
        );
        setTotal(t);
        setTotalConDescuento(t - t * desc);

        // Detectar modo oscuro actual
        const temaGuardado = localStorage.getItem("theme");
        setDarkMode(temaGuardado === "dark");

        // Escuchar cambios de tema en body
        const observer = new MutationObserver(() => {
            setDarkMode(document.body.classList.contains("bg-dark"));
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    const finalizarCompra = () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: "Carrito vacío",
                text: "No hay productos para pagar.",
                icon: "info",
                background: darkMode ? "#2c2c2c" : "#fff",
                color: darkMode ? "#eee" : "#000",
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
            confirmButtonText: "Aceptar",
            background: darkMode ? "#2c2c2c" : "#fff",
            color: darkMode ? "#eee" : "#000",
        }).then(() => {
            // Limpiar carrito
            localStorage.removeItem("carrito");
            setCarrito([]);
            setTotal(0);
            setTotalConDescuento(0);

            // Redirigir al home
            navigate("/");
        });
    };

    if (carrito.length === 0) {
        return (
            <div className={`container my-5 ${darkMode ? "text-light" : "text-dark"}`}>
                <h1>Carrito vacío</h1>
                <p>No hay productos para pagar.</p>
            </div>
        );
    }

    return (
        <div className={`container my-5 ${darkMode ? "text-light" : "text-dark"}`}>
            <h1>Detalle de la compra 🛒</h1>

            <ul className="list-group mb-3">
                {carrito.map((item) => (
                    <li
                        key={item.id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                            darkMode ? "bg-dark text-light border-secondary" : ""
                        }`}
                    >
                        <div className="d-flex align-items-center">
                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                    marginRight: "15px",
                                    borderRadius: "5px",
                                }}
                            />
                            <div>
                                <span>{item.nombre}</span>
                                <br />
                                <small className={`${darkMode ? "text-light" : "text-dark"}`}>
                                    Cantidad: {item.cantidad}
                                </small>
                            </div>
                        </div>
                        <span className={`${darkMode ? "text-light" : "text-dark"}`}>
                            ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                        </span>
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
                <button className="btn btn-success" onClick={finalizarCompra}>
                    Finalizar compra
                </button>
            </div>
        </div>
    );
}
