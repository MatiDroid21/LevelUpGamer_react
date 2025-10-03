import fondo1 from "../assets/img/fondo1.jpg";
import fondo2 from "../assets/img/fondo2.png";
import fondo3 from "../assets/img/fondo3.png";
import FooterComponent from "../components/FooterComponent";
import kumara from "../assets/img/productos/kumara.png";
import logitech from "../assets/img/productos/logitech.jpg";
import razer from "../assets/img/productos/razer-firefly-V2-Pro-mousepad.png";
import kingston from "../assets/img/productos/fury_ram.jpg";
import victus from "../assets/img/productos/victus.jpg";
import tuf16 from "../assets/img/productos/tufF16.png";
import predator from "../assets/img/productos/predator.jpg";
import katana17 from "../assets/img/productos/katana17.png";
import "../styles/cardsIndex.css";
import { useState } from "react";

export default function Home() {
  const [modalProducto, setModalProducto] = useState(null);

  const productos = [
    {
      id: 1,
      nombre: "Teclado Redragon Kumara",
      codigo: "RK001",
      descripcion: "Teclado mecánico retroiluminado ideal para gamers.",
      precio: 44990,
      imagen: kumara,
    },
    {
      id: 2,
      nombre: "Mouse Logitech G502 Hero",
      codigo: "LG502",
      descripcion: "Sensor HERO 25K, rendimiento y precisión.",
      precio: 62900,
      imagen: logitech,
    },
    {
      id: 3,
      nombre: "MousePad Razer RGB",
      codigo: "RZ043",
      descripcion: "Superficie suave con iluminación Chroma.",
      precio: 15900,
      imagen: razer,
    },
    {
      id: 4,
      nombre: "RAM Kingston Fury 16GB DDR4",
      codigo: "KF093",
      descripcion: "Rendimiento extremo para gaming o trabajo.",
      precio: 35500,
      imagen: kingston,
    },
    {
      id: 5,
      nombre: "Laptop HP Victus 16",
      codigo: "HPV16",
      descripcion: "Rendimiento potente con procesador AMD Ryzen 7.",
      precio: 899990,
      imagen: victus,
    },
    {
      id: 6,
      nombre: "Laptop Asus TUF Gaming F16",
      codigo: "ASFT16",
      descripcion: "Rendimiento robusto con gráficos NVIDIA GeForce.",
      precio: 799990,
      imagen: tuf16,
    },
    {
      id: 7,
      nombre: "Laptop Acer Predator Helios 300",
      codigo: "ACPH300",
      descripcion: "Rendimiento de alta gama para gamers exigentes.",
      precio: 1199990,
      imagen: predator,
    },
    {
      id: 8,
      nombre: "Laptop MSI Katana GF76",
      codigo: "MSKGF76",
      descripcion: "Rendimiento sólido con procesador Intel Core i7.",
      precio: 999990,
      imagen: katana17
    }

  ];

  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={fondo1} className="d-block w-100 img-carousel" alt="fondo 1" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Arma Tu Setup Gamer</h5>
            <p>sillas y periféricos para el próximo nivel.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={fondo2} className="d-block w-100 img-carousel" alt="fondo 2" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Despacho en todo Chile</h5>
            <p>Compra online y recibe a las puertas de tu casa.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={fondo3} className="d-block w-100 img-carousel" alt="fondo 3" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Ofertas Épicas</h5>
            <p>Consolas, Computadoras y accesorios al mejor precio.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      ><i className="fa-solid fa-chevron-left" style={{ color: "#63E6BE;" }}></i></button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      ><i className="fa-solid fa-chevron-right" style={{ color: "#63E6BE;" }}></i></button>
      {/* cards con algunos productos */}
      <section className="container mt-5 mb-5">
        <h3 className="mb-4">🎮 Productos Destacados</h3>
        <div className="row g-4 justify-content-center">
          {productos.map((prod) => (
            <div key={prod.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                <div className="img-container">
                  <img src={prod.imagen} className="card-img-top" alt={prod.nombre} />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{prod.nombre}</h5>
                  <span>{prod.codigo}</span>
                  <p className="card-text">{prod.descripcion}</p>
                  <strong className="text-success">${prod.precio}</strong>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => setModalProducto(prod)}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {modalProducto && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          aria-labelledby={`modalLabel-${modalProducto.id}`}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`modalLabel-${modalProducto.id}`}>
                  {modalProducto.nombre}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalProducto(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={modalProducto.imagen}
                  className="img-fluid mb-3"
                  alt={modalProducto.nombre}
                />
                <p>{modalProducto.descripcion}</p>
                <strong className="text-success">${modalProducto.precio}</strong>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalProducto(null)}
                >
                  Cerrar
                </button>
                <button type="button" className="btn btn-primary">
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <FooterComponent />
    </div>
    
  );
}