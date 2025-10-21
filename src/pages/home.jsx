import { useState } from "react";
import FooterComponent from "../components/FooterComponent";
import "../styles/cardsIndex.css";

// Import de imágenes
import fondo1 from "../assets/img/fondo1.jpg";
import fondo2 from "../assets/img/fondo2.png";
import fondo3 from "../assets/img/fondo3.png";
import kumara from "../assets/img/productos/kumara.png";
import logitech from "../assets/img/productos/logitech.jpg";
import razer from "../assets/img/productos/razer-firefly-V2-Pro-mousepad.jpg";
import kingston from "../assets/img/productos/fury_ram.jpg";
import victus from "../assets/img/productos/victus.jpg";
import tuf16 from "../assets/img/productos/tuf.png";
import predator from "../assets/img/productos/predator.jpg";
import katana17 from "../assets/img/productos/katana17.png";

// Datos
const slides = [
  { img: fondo1, title: "Arma Tu Setup Gamer", text: "Sillas y periféricos para el próximo nivel." },
  { img: fondo2, title: "Despacho en todo Chile", text: "Compra online y recibe a las puertas de tu casa." },
  { img: fondo3, title: "Ofertas Épicas", text: "Consolas, Computadoras y accesorios al mejor precio." }
];

const productos = [
  { id: 1, nombre: "Teclado Redragon Kumara", codigo: "RK001", descripcion: "Teclado mecánico retroiluminado ideal para gamers.", precio: 44990, imagen: kumara },
  { id: 2, nombre: "Mouse Logitech G502 Hero", codigo: "LG502", descripcion: "Sensor HERO 25K, rendimiento y precisión.", precio: 62900, imagen: logitech },
  { id: 3, nombre: "MousePad Razer RGB", codigo: "RZ043", descripcion: "Superficie suave con iluminación Chroma.", precio: 15900, imagen: razer },
  { id: 4, nombre: "RAM Kingston Fury 16GB DDR4", codigo: "KF093", descripcion: "Rendimiento extremo para gaming o trabajo.", precio: 35500, imagen: kingston },
  { id: 5, nombre: "Laptop HP Victus 16", codigo: "HPV16", descripcion: "Rendimiento potente con procesador AMD Ryzen 7.", precio: 899990, imagen: victus },
  { id: 6, nombre: "Laptop Asus TUF Gaming F16", codigo: "ASFT16", descripcion: "Rendimiento robusto con gráficos NVIDIA GeForce.", precio: 799990, imagen: tuf16 },
  { id: 7, nombre: "Laptop Acer Predator Helios 300", codigo: "ACPH300", descripcion: "Rendimiento de alta gama para gamers exigentes.", precio: 1199990, imagen: predator },
  { id: 8, nombre: "Laptop MSI Katana GF76", codigo: "MSKGF76", descripcion: "Rendimiento sólido con procesador Intel Core i7.", precio: 999990, imagen: katana17 }
];


// Componente de Card
function CardProducto({ producto, onVerMas }) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100">
        <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
        <div className="card-body d-flex flex-column">
          <h5>{producto.nombre}</h5>
          <span>{producto.codigo}</span>
          <p>{producto.descripcion}</p>
         <strong>${producto.precio.toLocaleString('es-CL')}</strong>
          <button className="btn btn-primary mt-auto" onClick={() => onVerMas(producto)}>Ver más</button>
        </div>
      </div>
    </div>
  );
}

// Componente Modal
function ModalProducto({ producto, onClose }) {
  if (!producto) return null;

  return (
    <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }} tabIndex="-1" aria-modal="true" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{producto.nombre}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <img src={producto.imagen} className="img-fluid mb-3" alt={producto.nombre} />
            <p>{producto.descripcion}</p>
            <strong>${producto.precio}</strong>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente principal
export default function Home() {
  const [modalProducto, setModalProducto] = useState(null);

  return (
    <>
      {/* Carrusel */}
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {slides.map((slide, idx) => (
            <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
              <img src={slide.img} className="d-block w-100 img-carousel" alt={`slide ${idx + 1}`} />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="card-text text-white">{slide.title}</h5>
                <p className="card-text text-white">{slide.text}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <i className="fa-solid fa-chevron-left" style={{ color: "#63E6BE" }}></i>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <i className="fa-solid fa-chevron-right" style={{ color: "#63E6BE" }}></i>
        </button>
      </div>

      {/* Sección de productos */}
      <section className="container mt-6 mb-6">
        <h3 className="mb-4">🎮 Productos Destacados</h3>
        <div className="row g-4 justify-content-center">
          {productos.map(prod => (
            <CardProducto key={prod.id} producto={prod} onVerMas={setModalProducto} />
          ))}
        </div>
      </section>

      {/* Modal */}
      <ModalProducto producto={modalProducto} onClose={() => setModalProducto(null)} />

      {/* Footer */}
      <FooterComponent />
    </>
  );
}
