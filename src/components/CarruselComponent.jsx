import fondo1 from "../assets/img/fondo1.jpg";
import fondo2 from "../assets/img/fondo2.png";
import fondo3 from "../assets/img/fondo3.png";
export default function CarruselComponent() {
    // Datos
    const slides = [
        { img: fondo1, title: "Arma Tu Setup Gamer", text: "Sillas y periféricos para el próximo nivel." },
        { img: fondo2, title: "Despacho en todo Chile", text: "Compra online y recibe a las puertas de tu casa." },
        { img: fondo3, title: "Ofertas Épicas", text: "Consolas, Computadoras y accesorios al mejor precio." }
    ];
    return (
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
    )
}