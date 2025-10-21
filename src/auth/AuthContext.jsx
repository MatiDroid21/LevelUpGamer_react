import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);

    // 🔐 login adaptado a tu sistema
    const login = async (correo, contrasena) => {
        // Validaciones básicas (podés hacerlas también en el componente)
        if (!correo || !contrasena) {
            return { ok: false, message: "Debes ingresar correo y contraseña" };
        }

        // Validar dominio del correo
        const dominio = correo.split("@")[1];
        if (dominio !== "gmail.com" && dominio !== "duocuc.cl") {
            return { ok: false, message: "El dominio del correo no es válido" };
        }

        // Simular autenticación exitosa (no es “admin” fijo)
        // Si quisieras validar con una BD o API, aquí iría esa llamada
        const u = { correo };
        setUser(u);
        return { ok: true };
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
