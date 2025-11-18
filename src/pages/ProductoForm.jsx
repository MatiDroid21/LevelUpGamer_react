// src/pages/ProductoForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductoForm() {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: null,
    urlImagen: '',
    activo: true,
  });
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Cargar lista de categorías
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:8081/api/categorias', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategorias(data.data);
      } catch (error) {
        console.error('Error cargando categorías', error);
      }
    };
    fetchCategorias();

    if (id) {
      // Cargar producto para edición
      const fetchProducto = async () => {
        try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get(`http://localhost:8081/api/productos/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProducto(data.data);
        } catch (error) {
          console.error('Error cargando producto', error);
        }
      };
      fetchProducto();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: name === 'precio' || name === 'stock' ? Number(value) : value }));
  };

  const handleCategoriaChange = (e) => {
    const catId = Number(e.target.value);
    const categoriaSeleccionada = categorias.find(c => c.idCategoria === catId);
    setProducto(prev => ({ ...prev, categoria: categoriaSeleccionada }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (id) { // editar
        await axios.put(`http://localhost:8081/api/productos/${id}`, producto, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else { // nuevo
        await axios.post('http://localhost:8081/api/productos', producto, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/admin/productos');
    } catch (error) {
      console.error('Error guardando producto', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input name="nombre" value={producto.nombre} onChange={handleChange} required />
        <br />

        <label>Descripción:</label>
        <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} required />
        <br />

        <label>Precio:</label>
        <input type="number" name="precio" value={producto.precio} onChange={handleChange} required />
        <br />

        <label>Stock:</label>
        <input type="number" name="stock" value={producto.stock} onChange={handleChange} required />
        <br />

        <label>Categoría:</label>
        <select value={producto.categoria?.idCategoria || ''} onChange={handleCategoriaChange} required>
          <option value="">Seleccione</option>
          {categorias.map(c => (
            <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>
          ))}
        </select>
        <br />

        <label>URL Imagen:</label>
        <input name="urlImagen" value={producto.urlImagen} onChange={handleChange} />
        <br />

        <label>Activo:</label>
        <input type="checkbox" checked={producto.activo} onChange={e => setProducto(prev => ({ ...prev, activo: e.target.checked }))} />
        <br />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
