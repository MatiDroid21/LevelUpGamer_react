// src/routes/ProtectedAdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedAdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.rolNombre?.toLowerCase() !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}
