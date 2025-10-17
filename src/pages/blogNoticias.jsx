import FooterComponent from "../components/FooterComponent";
import noticia1 from "../assets/img/noticias/noticiarl1.png";
import noticia2 from "../assets/img/noticias/noticiarl2.jpg";
import noticia3 from "../assets/img/noticias/noticiaforn1.jpg";
import noticia4 from "../assets/img/noticias/noticiaforn2.jpg";
import "../styles/blogNoticias.css";

export default function BlogNoticias() {
  return (
    <>
      <div className="container my-5">
        <h1 className="mb-4 text-center fw-bold text-primary">
          Blog y Noticias LevelUpGamer 🕹️
        </h1>
        <p className="text-center text-muted mb-5">
          Bienvenido a nuestra sección de noticias y trailers. Mantente al día con lo último del mundo gamer 🎮
        </p>

        {/* SECCIÓN FORTNITE */}
        <h2 className="mt-4 mb-3 text-danger fw-semibold">🔥 Fortnite</h2>
        <div className="row g-4">
          {[{img: noticia3, titulo: "Solo puede quedar una persona en Fortnite: Delulu", texto: "En el modo sin construcción, 80 jugadores comienzan en solitario y solo uno puede ganar. ¡Forma equipo o enfréntate a tus amigos en esta batalla sin límites!", link:"https://www.fortnite.com/news/look-out-for-number-1-in-fortnite-delulu?lang=es-ES"},
            {img: noticia4, titulo: "Copa de ídolos: ¡Desbloquea los trajes de Kai Cenat!", texto: "Participa en la Mafiathon 3 y consigue los trajes exclusivos de Kai Cenat antes de su llegada a la tienda el 13 de septiembre.", link:"https://www.fortnite.com/news/kai-cenat-icon-mobile-cup-unlock-kais-outfits-in-fortnite?lang=es-ES"}].map((noticia, i) => (
            <div className="col-md-6" key={i}>
              <div className="card h-100 shadow-sm blog-card">
                <img src={noticia.img} className="card-img-top" alt={noticia.titulo} />
                <div className="card-body">
                  <h5 className="card-title">{noticia.titulo}</h5>
                  <p className="card-text">{noticia.texto}</p>
                  <a href={noticia.link} className="btn btn-outline-primary" target="_blank" rel="noreferrer">
                    Leer más
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECCIÓN ROCKET LEAGUE */}
        <h2 className="mt-5 mb-3 text-success fw-semibold">🚗 Rocket League</h2>
        <div className="row g-4">
          {[{img: noticia1, titulo: "Nueva Actualización v2.58", texto: "Mejoras visuales, nuevas arenas y correcciones llegan a Rocket League. Disponible en todas las plataformas desde el 2 de octubre de 2025.", link:"https://www.rocketleague.com/es-es/news/rocket-league-patch-notes-v2-58"},
            {img: noticia2, titulo: "RLCS World Championship 2025 – Lyon, Francia", texto: "20 equipos competirán por el título mundial y un premio de 1.2 millones de dólares. El evento se celebrará del 10 al 14 de septiembre en el estadio LDLC.", link:"https://www.rocketleague.com/es-es/news/2025-rocket-league-world-championship-primer"}].map((noticia, i) => (
            <div className="col-md-6" key={i}>
              <div className="card h-100 shadow-sm blog-card">
                <img src={noticia.img} className="card-img-top" alt={noticia.titulo} />
                <div className="card-body">
                  <h5 className="card-title">{noticia.titulo}</h5>
                  <p className="card-text">{noticia.texto}</p>
                  <a href={noticia.link} className="btn btn-outline-success" target="_blank" rel="noreferrer">
                    Leer más
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterComponent />
    </>
  );
}
