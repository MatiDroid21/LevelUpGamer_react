// src/pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <nav>
        <Link to="/admin/productos">Gestionar Productos</Link><br />
        <Link to="/admin/usuarios">Gestionar Usuarios</Link> {/* Si implementas */}
      </nav>
    </div>
  );
}
