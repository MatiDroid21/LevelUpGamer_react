import React from "react";

import "../styles/App.css";

export default function SearchBar({ searchTerm, handleSearchChange }) {
  return (
    <div className="my-4">
      <input
        type="text"
        className="form-control"
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
