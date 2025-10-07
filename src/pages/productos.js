import FooterComponent from "../components/FooterComponent";
import ProductCard from "../components/tarjetaProductos";
import Cart from "../components/Carrito";
import SearchBar from "../components/BarraBusquedaProductos";
import "../styles/cardsIndex.css";
import { useState } from "react";

// Importa imágenes
import kumara from "../assets/img/productos/kumara.png";
import logitech from "../assets/img/productos/logitech.jpg";
import razer from "../assets/img/productos/razer-firefly-V2-Pro-mousepad.png";
import kingston from "../assets/img/productos/fury_ram.jpg";
import victus from "../assets/img/productos/victus.jpg";
import tuf16 from "../assets/img/productos/tufF16.png";
import predator from "../assets/img/productos/predator.jpg";
import katana17 from "../assets/img/productos/katana17.png";
import uno from "../assets/img/productos/uno.jpg";

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const productos = [
    { id: 1, nombre: "Teclado Redragon Kumara", codigo: "RK001", descripcion: "Teclado mecánico retroiluminado ideal para gamers.", precio: 44990, imagen: kumara },
    { id: 2, nombre: "Mouse Logitech G502 Hero", codigo: "LG502", descripcion: "Sensor HERO 25K, rendimiento y precisión.", precio: 62900, imagen: logitech },
    { id: 3, nombre: "MousePad Razer RGB", codigo: "RZ043", descripcion: "Superficie suave con iluminación Chroma.", precio: 15900, imagen: razer },
    { id: 4, nombre: "RAM Kingston Fury 16GB DDR4", codigo: "KF093", descripcion: "Rendimiento extremo para gaming o trabajo.", precio: 35500, imagen: kingston },
    { id: 5, nombre: "Laptop HP Victus 16", codigo: "HPV16", descripcion: "Rendimiento potente con procesador AMD Ryzen 7.", precio: 899990, imagen: victus },
    { id: 6, nombre: "Laptop Asus TUF Gaming F16", codigo: "ASFT16", descripcion: "Rendimiento robusto con gráficos NVIDIA GeForce.", precio: 799990, imagen: tuf16 },
    { id: 7, nombre: "Laptop Acer Predator Helios 300", codigo: "ACPH300", descripcion: "Rendimiento de alta gama para gamers exigentes.", precio: 1199990, imagen: predator },
    { id: 8, nombre: "Laptop MSI Katana GF76", codigo: "MSKGF76", descripcion: "Rendimiento sólido con procesador Intel Core i7.", precio: 999990, imagen: katana17 },
    { id: 9, nombre: "Juego de cartas UNO", codigo: "UNO123", descripcion: "El clásico juego de cartas para toda la familia.", precio: 8990, imagen: uno },
  ];

  const filteredProducts = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    const nuevo = existe
      ? carrito.map((i) => (i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i))
      : [...carrito, { ...producto, cantidad: 1 }];

    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
  };

  const eliminarDelCarrito = (id) => {
    const nuevo = carrito.filter((item) => item.id !== id);
    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const usuario = localStorage.getItem("usuario");
  const descuento = usuario?.endsWith("@duocuc.cl") ? 0.2 : 0;
  const totalConDescuento = total - total * descuento;

  return (
    <div className="container my-5">
      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h1 className="mb-4">Nuestros Productos</h1>

      <div className="row">
        {filteredProducts.map((producto) => (
          <ProductCard key={producto.id} producto={producto} agregarAlCarrito={agregarAlCarrito} />
        ))}
      </div>

      <Cart
        carrito={carrito}
        eliminarDelCarrito={eliminarDelCarrito}
        total={total}
        descuento={descuento}
        totalConDescuento={totalConDescuento}
        setCarrito={setCarrito}
      />

      <FooterComponent />
    </div>
  );
}
