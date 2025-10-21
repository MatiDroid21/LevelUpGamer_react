import { useEffect, useState } from "react";

export default function SearchBar({ searchTerm, handleSearchChange }) {
  const [darkMode, setDarkMode] = useState(false);

  // Detectamos el modo oscuro global
  useEffect(() => {
    const temaGuardado = localStorage.getItem("theme");
    setDarkMode(temaGuardado === "dark");

    // Escuchar los cambios de clase en el body
    const observer = new MutationObserver(() => {
      setDarkMode(document.body.classList.contains("bg-dark"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="my-4">
      <input
        type="text"
        className={`form-control ${
          darkMode ? "bg-dark text-light border-light" : "bg-white text-dark border-dark"
        }`}
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          transition: "background-color 0.4s, color 0.4s, border-color 0.4s",
        }}
      />
    </div>
  );
}
