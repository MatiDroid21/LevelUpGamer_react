import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FooterComponent from "../components/FooterComponent";


export default function CanjesPage() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [historialCanjes, setHistorialCanjes] = useState([]);

    // Beneficios disponibles
    const beneficios = [
        {
            id: 1,
            titulo: "Descuento $5.000",
            descripcion: "Aplica $5.000 de descuento en tu próxima compra",
            puntosRequeridos: 100,
            icono: "bi-tag-fill",
            color: "#3498db"
        },
        {
            id: 2,
            titulo: "Descuento $10.000",
            descripcion: "Aplica $10.000 de descuento en tu próxima compra",
            puntosRequeridos: 200,
            icono: "bi-tag-fill",
            color: "#9b59b6"
        },
        {
            id: 3,
            titulo: "Envío Gratis",
            descripcion: "Envío gratis en tu próxima compra (cualquier monto)",
            puntosRequeridos: 150,
            icono: "bi-truck",
            color: "#2ecc71"
        },
        {
            id: 4,
            titulo: "Mouse Pad Gaming",
            descripcion: "Mouse pad gamer de regalo en tu próxima compra",
            puntosRequeridos: 300,
            icono: "bi-gift-fill",
            color: "#e74c3c"
        },
        {
            id: 5,
            titulo: "Descuento 15%",
            descripcion: "15% de descuento en toda tu compra",
            puntosRequeridos: 500,
            icono: "bi-percent",
            color: "#f39c12"
        },
        {
            id: 6,
            titulo: "Teclado Mecánico",
            descripcion: "Teclado mecánico Redragon Kumara de regalo",
            puntosRequeridos: 1000,
            icono: "bi-keyboard-fill",
            color: "#1abc9c"
        }
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            Swal.fire({
                icon: "warning",
                title: "No has iniciado sesión",
                confirmButtonColor: "#9b59b6"
            });
            navigate("/login");
            return;
        }
        
        const user = JSON.parse(storedUser);
        setUsuario(user);

        // Cargar historial de canjes
        const canjesGuardados = localStorage.getItem(`canjes_${user.correo}`);
        if (canjesGuardados) {
            setHistorialCanjes(JSON.parse(canjesGuardados));
        }
    }, [navigate]);

    const canjearBeneficio = (beneficio) => {
        const puntosActuales = usuario.puntos || 0;

        if (puntosActuales < beneficio.puntosRequeridos) {
            Swal.fire({
                icon: "error",
                title: "Puntos insuficientes",
                html: `Necesitas <b>${beneficio.puntosRequeridos}</b> puntos.<br>Tienes: <b>${puntosActuales}</b> puntos.`,
                confirmButtonColor: "#e74c3c"
            });
            return;
        }

        Swal.fire({
            title: "¿Confirmar canje?",
            html: `
                <p><b>${beneficio.titulo}</b></p>
                <p>${beneficio.descripcion}</p>
                <p class="text-danger"><b>Costo: ${beneficio.puntosRequeridos} puntos</b></p>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, canjear",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#2ecc71",
            cancelButtonColor: "#95a5a6"
        }).then((result) => {
            if (result.isConfirmed) {
                // Descontar puntos
                const nuevosPuntos = puntosActuales - beneficio.puntosRequeridos;
                const usuarioActualizado = { ...usuario, puntos: nuevosPuntos };
                
                localStorage.setItem("user", JSON.stringify(usuarioActualizado));
                setUsuario(usuarioActualizado);

                // Registrar canje
                const nuevoCanje = {
                    ...beneficio,
                    fecha: new Date().toLocaleDateString(),
                    usado: false
                };
                const nuevosCanjes = [...historialCanjes, nuevoCanje];
                setHistorialCanjes(nuevosCanjes);
                localStorage.setItem(`canjes_${usuario.correo}`, JSON.stringify(nuevosCanjes));

                Swal.fire({
                    icon: "success",
                    title: "¡Canje exitoso! 🎉",
                    html: `
                        <p>Has canjeado: <b>${beneficio.titulo}</b></p>
                        <p>Puntos restantes: <b>${nuevosPuntos}</b></p>
                    `,
                    confirmButtonColor: "#2ecc71"
                });
            }
        });
    };

    if (!usuario) return null;

    return (
        <>
            <div className="container my-5">
                <div className="text-center mb-4">
                    <h1 className="fw-bold">🎁 Canje de Puntos</h1>
                    <p className="lead">Tienes <span className="badge bg-success fs-5">{usuario.puntos || 0}</span> puntos disponibles</p>
                </div>

                {/* Grid de Beneficios */}
                <div className="row g-4 mb-5">
                    {beneficios.map(beneficio => (
                        <div key={beneficio.id} className="col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm hover-card">
                                <div className="card-body text-center">
                                    <div 
                                        className="rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                                        style={{ 
                                            width: "80px", 
                                            height: "80px", 
                                            backgroundColor: beneficio.color + "20",
                                            border: `3px solid ${beneficio.color}`
                                        }}
                                    >
                                        <i className={`bi ${beneficio.icono}`} style={{ fontSize: "2rem", color: beneficio.color }}></i>
                                    </div>
                                    <h5 className="fw-bold">{beneficio.titulo}</h5>
                                    <p className="text-muted small">{beneficio.descripcion}</p>
                                    <div className="mt-3">
                                        <span className="badge bg-warning text-dark fs-6">
                                            {beneficio.puntosRequeridos} puntos
                                        </span>
                                    </div>
                                    <button 
                                        className="btn btn-primary w-100 mt-3"
                                        style={{ backgroundColor: beneficio.color, borderColor: beneficio.color }}
                                        onClick={() => canjearBeneficio(beneficio)}
                                        disabled={(usuario.puntos || 0) < beneficio.puntosRequeridos}
                                    >
                                        {(usuario.puntos || 0) >= beneficio.puntosRequeridos ? (
                                            <>
                                                <i className="bi bi-check-circle-fill"></i> Canjear
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-lock-fill"></i> Insuficientes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Historial de Canjes */}
                <div className="card shadow">
                    <div className="card-header bg-dark text-white">
                        <h4 className="mb-0"><i className="bi bi-clock-history"></i> Mis Canjes</h4>
                    </div>
                    <div className="card-body">
                        {historialCanjes.length === 0 ? (
                            <p className="text-muted text-center">No has realizado canjes todavía.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Beneficio</th>
                                            <th>Puntos</th>
                                            <th>Fecha</th>
                                            <th>Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historialCanjes.map((canje, index) => (
                                            <tr key={index}>
                                                <td><i className={`bi ${canje.icono}`}></i> {canje.titulo}</td>
                                                <td><span className="badge bg-warning">{canje.puntosRequeridos}</span></td>
                                                <td>{canje.fecha}</td>
                                                <td>
                                                    <span className={`badge ${canje.usado ? 'bg-secondary' : 'bg-success'}`}>
                                                        {canje.usado ? 'Usado' : 'Disponible'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
}
