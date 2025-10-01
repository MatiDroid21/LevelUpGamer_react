import "../styles/login.css";
import { Link } from 'react-router-dom';

export default function home(){
    return(
    <div className="container mt-5">
        <div className="form-box text-center">
        <h2 className="fw-bold">Inicia Sesión</h2>
        <p>Bienvenido de nuevo, a LevelUpGamer 🎮</p>
        <form id="loginForm">
            <div className="mb-3 text-start">
                <label for="">Correo Electrónico</label>
                <div className="input-group">

                    <div className="input-group-text"><i className="fa-solid fa-at fa-fade" style={{ color: "#2c6896" }}></i></div>
                    <input type="email" className="form-control" id="email" placeholder="correo@ejemplo.com" />
                </div>

            </div>
            <div className="mb-3 text-start">
                <label for="">Contraseña</label>
                <div className="input-group">

                    <div className="input-group-text"><i className="fa-solid fa-key fa-fade" style={{ color: "#2c6896" }}></i></div>
                    <input type="password" className="form-control" id="password" placeholder="***********" />
                </div>

            </div>

           <Link to='/'><button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button></Link>
        </form>
        <p className="mt-3">¿No tienes cuenta? <a href="registrarse.html">Regístrate aquí</a></p>
    </div>
    </div>
        
    )

}