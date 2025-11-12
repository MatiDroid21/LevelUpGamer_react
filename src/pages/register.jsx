import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/registrarseForm.css";

export default function RegisterComponent() {
    const navigate = useNavigate();
    
    // Estados locales
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [rut, setRut] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [codigoReferido, setCodigoReferido] = useState("");

    // Función para validar formato de RUT chileno
    const validarRut = (rut) => {
        // Eliminar puntos y guión
        const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '');
        
        if (rutLimpio.length < 8) return false;
        
        const cuerpo = rutLimpio.slice(0, -1);
        const dv = rutLimpio.slice(-1).toUpperCase();
        
        // Calcular dígito verificador
        let suma = 0;
        let multiplicador = 2;
        
        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i)) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        
        const dvEsperado = 11 - (suma % 11);
        const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
        
        return dv === dvCalculado;
    };

    // Función para formatear RUT mientras se escribe
    const formatearRut = (valor) => {
        // Eliminar todo excepto números y K
        const rutLimpio = valor.replace(/[^0-9kK]/g, '');
        
        if (rutLimpio.length <= 1) return rutLimpio;
        
        // Separar cuerpo y dígito verificador
        const cuerpo = rutLimpio.slice(0, -1);
        const dv = rutLimpio.slice(-1);
        
        // Formatear con puntos
        let rutFormateado = '';
        for (let i = cuerpo.length - 1, j = 0; i >= 0; i--, j++) {
            if (j > 0 && j % 3 === 0) rutFormateado = '.' + rutFormateado;
            rutFormateado = cuerpo[i] + rutFormateado;
        }
        
        return `${rutFormateado}-${dv}`;
    };

    const handleRutChange = (e) => {
        const valor = e.target.value;
        const rutFormateado = formatearRut(valor);
        setRut(rutFormateado);
    };

    // Función para validar edad (18+)
    const validarEdad = (fecha) => {
        const hoy = new Date();
        const nacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        
        return edad;
    };

    // Validación principal
    const validarRegistro = (e) => {
        e.preventDefault();

        // 1. Validar campos obligatorios
        if (!rut || !nombre || !correo || !direccion || !password || !confirmPassword || !fechaNacimiento || !telefono) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos marcados con * son obligatorios.",
                icon: "error",
                confirmButtonColor: "#e74c3c"
            });
            return;
        }

        // 2. Validar formato de RUT
        if (!validarRut(rut)) {
            Swal.fire({
                title: "RUT inválido",
                text: "Por favor ingresa un RUT válido.",
                icon: "error",
                confirmButtonColor: "#e74c3c"
            });
            return;
        }

        // 3. Validar edad (18+)
        const edad = validarEdad(fechaNacimiento);
        if (edad < 18) {
            Swal.fire({
                title: "Edad insuficiente ⚠️",
                html: `
                    <p>Debes ser <b>mayor de 18 años</b> para registrarte en LevelUpGamer.</p>
                    <p>Edad actual: <b>${edad} años</b></p>
                `,
                icon: "error",
                confirmButtonColor: "#e74c3c"
            });
            return;
        }

        // 4. Validar formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            Swal.fire({
                title: "Correo inválido",
                text: "Por favor ingresa un correo electrónico válido.",
                icon: "error",
                confirmButtonColor: "#e74c3c"
            });
            return;
        }

        // 5. Validar longitud de contraseña
        if (password.length < 6) {
            Swal.fire({
                title: "Contraseña débil",
                text: "La contraseña debe tener al menos 6 caracteres.",
                icon: "error",
                confirmButtonColor: "#e74c3c"
            });
            return;
        }

        // 6. Validar coincidencia de contraseñas
        if (password !== confirmPassword) {
            Swal.fire({
                title: "Error",
                text: "Las contraseñas no coinciden.",
                icon: "error",
                confirmButtonColor: "#e74c3c"
            });
            return;
        }

        // 7. Validar formato de teléfono chileno
        const telefonoLimpio = telefono.replace(/\D/g, '');
        if (telefonoLimpio.length < 9) {
            Swal.fire({
                title: "Teléfono inválido",
                text: "Ingresa un número de teléfono válido (mínimo 9 dígitos).",
                icon: "error",
                confirmButtonColor: "#e74c3c"
            });
            return;
        }

        // 8. Validar código de referido si existe
        if (codigoReferido.trim()) {
            // Verificar si el código existe (simulado con localStorage)
            const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
            const referidoValido = usuarios.find(u => u.codigoReferido === codigoReferido.toUpperCase());
            
            if (!referidoValido) {
                Swal.fire({
                    title: "Código inválido",
                    text: "El código de referido ingresado no existe.",
                    icon: "warning",
                    confirmButtonColor: "#f39c12"
                });
                return;
            }
        }

        // 9. Generar código de referido único para el nuevo usuario
        const nuevoCodigoReferido = "LEVELUP" + Math.random().toString(36).substring(2, 8).toUpperCase();

        // 10. Calcular puntos iniciales (bonus si fue referido)
        let puntosIniciales = 0;
        let bonusReferido = 0;

        if (codigoReferido.trim()) {
            bonusReferido = 50; // Bonus por ser referido
            puntosIniciales = 50;

            // Dar puntos al usuario que refirió (100 puntos)
            const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
            const referidor = usuarios.find(u => u.codigoReferido === codigoReferido.toUpperCase());
            
            if (referidor) {
                referidor.puntos = (referidor.puntos || 0) + 100;
                const usuariosActualizados = usuarios.map(u => 
                    u.codigoReferido === codigoReferido.toUpperCase() ? referidor : u
                );
                localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
            }
        }

        // 11. Crear objeto de usuario
        const nuevoUsuario = {
            id: Date.now(),
            rut: rut,
            nombre: nombre.trim(),
            correo: correo.toLowerCase().trim(),
            direccion: direccion.trim(),
            telefono: telefonoLimpio,
            password: password, // En producción usar hash
            fechaNacimiento: fechaNacimiento,
            edad: edad,
            puntos: puntosIniciales,
            codigoReferido: nuevoCodigoReferido,
            referidoPor: codigoReferido.toUpperCase() || null,
            fechaRegistro: new Date().toISOString(),
            nivel: "Bronce"
        };

        // 12. Guardar en localStorage (simulando base de datos)
        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        
        // Verificar si el correo ya existe
        const correoExiste = usuarios.some(u => u.correo === correo.toLowerCase().trim());
        if (correoExiste) {
            Swal.fire({
                title: "Correo en uso",
                text: "Este correo ya está registrado. ¿Deseas iniciar sesión?",
                icon: "warning",
                confirmButtonColor: "#9b59b6",
                showCancelButton: true,
                confirmButtonText: "Ir a Login",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
            return;
        }

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // También guardamos el usuario actual en sesión
        localStorage.setItem("user", JSON.stringify(nuevoUsuario));

        // 13. Mostrar mensaje de éxito con información relevante
        Swal.fire({
            title: "¡Registro exitoso! 🎮",
            html: `
                <div class="text-start">
                    <p>Tu cuenta ha sido creada correctamente.</p>
                    <hr>
                    <p><strong>🎯 Tu código de referido:</strong> <span class="badge bg-success">${nuevoCodigoReferido}</span></p>
                    <p><strong>⭐ Puntos iniciales:</strong> ${puntosIniciales} puntos</p>
                    ${bonusReferido > 0 ? `<p><strong>🎁 Bonus por referido:</strong> +${bonusReferido} puntos</p>` : ''}
                    <p class="text-muted small mt-3">Comparte tu código con amigos y gana 100 puntos por cada referido.</p>
                </div>
            `,
            icon: "success",
            confirmButtonColor: "#2ecc71",
            confirmButtonText: "¡Empezar a comprar!"
        }).then(() => {
            navigate("/productos");
        });

        // Limpiar formulario
        setRut("");
        setNombre("");
        setCorreo("");
        setDireccion("");
        setPassword("");
        setConfirmPassword("");
        setFechaNacimiento("");
        setTelefono("");
        setCodigoReferido("");
    };

    return (
        <div className="container py-5 bg-dark text-light min-vh-100">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    <div className="form-box p-4 rounded shadow-lg bg-body-tertiary">
                        <h2 className="fw-bold mb-2 text-center">Crea tu cuenta</h2>
                        <p className="text-center">Únete a LevelUpGamer 🚀</p>

                        <form onSubmit={validarRegistro}>
                            {/* RUT */}
                            <div className="mb-3 text-start">
                                <label htmlFor="rut" className="form-label">
                                    RUT <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-id-card" style={{ color: "#39FF14" }}></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="rut"
                                        className="form-control"
                                        placeholder="12.345.678-9"
                                        value={rut}
                                        onChange={handleRutChange}
                                        maxLength="12"
                                    />
                                </div>
                            </div>

                            {/* Nombre */}
                            <div className="mb-3 text-start">
                                <label htmlFor="nombre" className="form-label">
                                    Nombre completo <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-user fa-fade" style={{ color: "#39FF14" }}></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="nombre"
                                        className="form-control"
                                        placeholder="Ej: Mati Droid"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Fecha de Nacimiento */}
                            <div className="mb-3 text-start">
                                <label htmlFor="fechaNacimiento" className="form-label">
                                    Fecha de nacimiento <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-calendar fa-fade" style={{ color: "#39FF14" }}></i>
                                    </span>
                                    <input
                                        type="date"
                                        id="fechaNacimiento"
                                        className="form-control"
                                        value={fechaNacimiento}
                                        onChange={(e) => setFechaNacimiento(e.target.value)}
                                        max={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <small className="text-muted">Debes ser mayor de 18 años</small>
                            </div>

                            {/* Correo */}
                            <div className="mb-3 text-start">
                                <label htmlFor="email" className="form-label">
                                    Correo electrónico <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-at fa-fade" style={{ color: "#39FF14" }}></i>
                                    </span>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="correo@ejemplo.com"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </div>
                                <small className="text-success">
                                    💡 Usa tu correo @duocuc.cl para obtener 20% de descuento
                                </small>
                            </div>

                            {/* Teléfono */}
                            <div className="mb-3 text-start">
                                <label htmlFor="telefono" className="form-label">
                                    Teléfono <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-phone fa-fade" style={{ color: "#39FF14" }}></i>
                                    </span>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        className="form-control"
                                        placeholder="+56 9 1234 5678"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Dirección */}
                            <div className="mb-3 text-start">
                                <label htmlFor="address" className="form-label">
                                    Dirección <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-location-dot fa-fade" style={{ color: "#39FF14" }}></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="address"
                                        className="form-control"
                                        placeholder="Calle 123, Santiago"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Código de Referido */}
                            <div className="mb-3 text-start">
                                <label htmlFor="codigoReferido" className="form-label">
                                    Código de referido (opcional)
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-gift fa-fade" style={{ color: "#39FF14" }}></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="codigoReferido"
                                        className="form-control text-uppercase"
                                        placeholder="LEVELUP123"
                                        value={codigoReferido}
                                        onChange={(e) => setCodigoReferido(e.target.value.toUpperCase())}
                                    />
                                </div>
                                <small className="text-warning">
                                    🎁 Ingresa el código de un amigo y recibe 50 puntos de bonus
                                </small>
                            </div>

                            {/* Contraseña */}
                            <div className="mb-3 text-start">
                                <label htmlFor="password" className="form-label">
                                    Contraseña <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-key fa-fade" style={{ color: "#39FF14" }}></i>
                                    </span>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Mínimo 6 caracteres"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Confirmar contraseña */}
                            <div className="mb-3 text-start">
                                <label htmlFor="confirm-password" className="form-label">
                                    Confirmar contraseña <span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fa-solid fa-key fa-fade" style={{ color: "#39FF14" }}></i>
                                    </span>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        className="form-control"
                                        placeholder="Repite tu contraseña"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Botón */}
                            <button type="submit" className="btn btn-gamer w-100">
                                <i className="fa-solid fa-user-plus"></i> Registrarse
                            </button>
                        </form>

                        <p className="mt-3 text-center">
                            ¿Ya tienes cuenta?{" "}
                            <a href="/login" className="text-decoration-none text-success">
                                Inicia sesión
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
