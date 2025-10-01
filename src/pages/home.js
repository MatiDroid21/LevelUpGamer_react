import fondo1 from "../assets/img/fondo1.jpg";
import fondo2 from "../assets/img/fondo2.png";
import fondo3 from "../assets/img/fondo3.png";
import FooterComponent from "../components/FooterComponent";
import kumara from "../assets/img/productos/kumara.png";
import logitech from "../assets/img/productos/logitech.jpg";
import razer from "../assets/img/productos/razer-firefly-V2-Pro-mousepad.png";
import kingston from "../assets/img/productos/fury_ram.jpg";
import "../styles/cardsIndex.css";
export default function Home() {
  return (
    
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={fondo1} className="d-block w-100 img-carousel" alt="fondo 1" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Arma Tu Setup Gamer</h5>
            <p >sillas y periféricos para el próximo nivel.</p>
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
      ></button>
        {/* cards con algunos productos */}
        <section className="container mt-5 mb-5">
          <h3 className="mb-4">🎮 Productos Destacados</h3>
          <div className="row g-4 justify-content-center">
            {/* Kumara Card */}
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                <div className="img-container">
                  <img src={kumara} className="card-img-top" alt="Teclado Kumara" />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Teclado Redragon Kumara</h5>
                  <span>RK001</span>
                  <p className="card-text">Teclado mecánico retroiluminado ideal para gamers.</p>
                  <strong className="text-success">$44.990</strong>
                  {/* Modal trigger can be implemented with React state if needed */}
                  <button className="btn btn-primary mt-auto" disabled>Ver más</button>
                </div>
              </div>
            </div>
            {/* Logitech Card */}
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                <div className="img-container">
                  <img src={logitech} className="card-img-top" alt="Mouse Logitech" />
                </div>
                <div className="card-body d-flex flex-column">
                  <span>LG502</span>
                  <h5 className="card-title">Mouse Logitech G502 Hero</h5>
                  <p className="card-text">Sensor HERO 25K, rendimiento y precisión.</p>
                  <strong className="text-success">$62.900</strong>
                  <button className="btn btn-primary mt-auto" disabled>Ver más</button>
                </div>
              </div>
            </div>
            {/* Razer Card */}
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                <div className="img-container">
                  <img src={razer} className="card-img-top" alt="MousePad Razer" />
                </div>
                <div className="card-body d-flex flex-column" id="razer">
                  <span>RZ043</span>
                  <h5 className="card-title">MousePad Razer RGB</h5>
                  <p className="card-text">Superficie suave con iluminación Chroma.</p>
                  <strong className="text-success">$15.900</strong>
                  <button className="btn btn-primary mt-auto" disabled>Ver más</button>
                </div>
              </div>
            </div>
            {/* Kingston Card */}
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100">
                <div className="img-container">
                  <img src={kingston} className="card-img-top" alt="Memoria Kingston" />
                </div>
                <div className="card-body d-flex flex-column">
                  <span>KF093</span>
                  <h5 className="card-title">RAM Kingston Fury 16GB DDR4</h5>
                  <p className="card-text">Rendimiento extremo para gaming o trabajo.</p>
                  <strong className="text-success">$35.500</strong>
                  <button className="btn btn-primary mt-auto" disabled>Ver más</button>
                </div>
              </div>
            </div>
          </div>
        </section>

      <FooterComponent/>
    </div>
  );
}
