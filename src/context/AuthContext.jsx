// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, contrasena) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/usuarios/login",
        { email, contrasena },
        {
          headers: { "x-api-key": "lvlupgamer1306" },
        }
      );
      const userData = response.data;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      return { ok: true, user: userData };
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      let msg = error.response?.data;
      if (typeof msg === "object") {
        msg = msg.message || JSON.stringify(msg);
      }
      return { ok: false, message: msg || "Error al intentar iniciar sesión" };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
