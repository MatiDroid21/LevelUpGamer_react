import { useState, useEffect } from "react";
import Swal from "sweetalert2";


export default function ResenaProducto({ productoId, productoNombre }) {
    const [resenas, setResenas] = useState([]);
    const [nuevaResena, setNuevaResena] = useState({
        calificacion: 5,
        comentario: ""
    });
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        // Cargar usuario
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUsuario(JSON.parse(storedUser));
        }

        // Cargar reseñas del producto
        const resenasGuardadas = localStorage.getItem(`resenas_${productoId}`);
        if (resenasGuardadas) {
            setResenas(JSON.parse(resenasGuardadas));
        }
    }, [productoId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!usuario) {
            Swal.fire({
                icon: "warning",
                title: "Inicia sesión",
                text: "Debes iniciar sesión para dejar una reseña",
                confirmButtonColor: "#9b59b6"
            });
            return;
        }

        if (!nuevaResena.comentario.trim()) {
            Swal.fire({
                icon: "error",
                title: "Comentario vacío",
                text: "Por favor escribe un comentario",
                confirmButtonColor: "#e74c3c"
            });
            return;
        }

        const resena = {
            id: Date.now(),
            usuario: usuario.nombre,
            calificacion: nuevaResena.calificacion,
            comentario: nuevaResena.comentario,
            fecha: new Date().toLocaleDateString()
        };

        const nuevasResenas = [...resenas, resena];
        setResenas(nuevasResenas);
        localStorage.setItem(`resenas_${productoId}`, JSON.stringify(nuevasResenas));

        // Otorgar 10 puntos por dejar reseña
        const puntosActuales = usuario.puntos || 0;
        const usuarioActualizado = { ...usuario, puntos: puntosActuales + 10 };
        localStorage.setItem("user", JSON.stringify(usuarioActualizado));
        setUsuario(usuarioActualizado);

        Swal.fire({
            icon: "success",
            title: "¡Reseña publicada!",
            html: "Gracias por tu opinión. <b>+10 puntos</b> 🎮",
            confirmButtonColor: "#2ecc71"
        });

        setNuevaResena({ calificacion: 5, comentario: "" });
    };

    const promedioCalificacion = resenas.length > 0
        ? (resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length).toFixed(1)
        : 0;

    return (
        <div className="resenas-container mt-4">
            <h4 className="fw-bold mb-3">
                <i className="bi bi-star-fill text-warning"></i> Reseñas y Calificaciones
            </h4>

            {/* Resumen de calificación */}
            {resenas.length > 0 && (
                <div className="alert alert-info d-flex align-items-center mb-3">
                    <div className="me-3">
                        <h2 className="mb-0">{promedioCalificacion}</h2>
                        <div>
                            {[...Array(5)].map((_, i) => (
                                <i 
                                    key={i} 
                                    className={`bi bi-star${i < Math.round(promedioCalificacion) ? '-fill' : ''} text-warning`}
                                ></i>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="mb-0"><strong>{resenas.length}</strong> reseñas</p>
                    </div>
                </div>
            )}

            {/* Formulario de nueva reseña */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Deja tu reseña</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Calificación</label>
                            <div className="rating-stars">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <i
                                        key={star}
                                        className={`bi bi-star${star <= nuevaResena.calificacion ? '-fill' : ''} text-warning`}
                                        style={{ fontSize: "1.5rem", cursor: "pointer", marginRight: "5px" }}
                                        onClick={() => setNuevaResena({ ...nuevaResena, calificacion: star })}
                                    ></i>
                                ))}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Comentario</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Comparte tu experiencia con este producto..."
                                value={nuevaResena.comentario}
                                onChange={(e) => setNuevaResena({ ...nuevaResena, comentario: e.target.value })}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            <i className="bi bi-send-fill"></i> Publicar reseña (+10 puntos)
                        </button>
                    </form>
                </div>
            </div>

            {/* Lista de reseñas */}
            <div className="resenas-lista">
                {resenas.length === 0 ? (
                    <p className="text-muted">No hay reseñas todavía. ¡Sé el primero en opinar!</p>
                ) : (
                    resenas.map(resena => (
                        <div key={resena.id} className="card mb-3">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 className="mb-1 fw-bold">{resena.usuario}</h6>
                                        <div className="mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <i 
                                                    key={i} 
                                                    className={`bi bi-star${i < resena.calificacion ? '-fill' : ''} text-warning`}
                                                ></i>
                                            ))}
                                        </div>
                                    </div>
                                    <small className="text-muted">{resena.fecha}</small>
                                </div>
                                <p className="mb-0">{resena.comentario}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
