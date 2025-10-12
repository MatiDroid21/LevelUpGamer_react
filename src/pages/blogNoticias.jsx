import FooterComponent from "../components/FooterComponent";

export default function BlogNoticias() {
    return (
        <>
            <div className="container my-5">
                <h1 className="mb-3">Blog y Noticias Gamer 🕹️</h1>
                <p>Bienvenido a nuestra sección de noticias y trailers de videojuegos. Mantente al día con lo último del mundo gamer.</p>

                <h2 className="mt-4">🔥 Noticias de Fortnite</h2>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <img src="https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmgi0znlc16xv07o6fsnmie3h" className="card-img-top" alt="Fortnite Temporada 5" />
                            <div className="card-body">
                                <h5 className="card-title">Fortnite Temporada 5: Novedades y cambios</h5>
                                <p className="card-text">El miedo adopta un nuevo rostro. Conoced a la madre de espinas, Doja Cat, que convertirá Battle Royale en su propio reino encantado y desatará el caos con unos personajes bestiales: desde Jason hasta Miércoles Addams, pasando por Scooby-Doo y Ghost Face, os aguardan caras conocidas.

                                    ¡Adentraos en la pesadilla hasta el 1 de noviembre!

                                    Contemplad cómo el terror llega a Recarga el 10 de octubre, día en el que la nueva Isla Pesadilla hará su debut.</p>
                                <a href="https://www.fortnite.com/news/fortnitemares-2025-a-terrifying-new-cast-of-horror-icons?lang=es-ES" className="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <img src="https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmfcuj10g2r7t07oafrsaxruy" className="card-img-top" alt="Fortnite Los Simpson" />
                            <div className="card-body">
                                <h5 className="card-title">Copa de ídolos para móviles de Kai Cenat: ¡desbloquead los trajes de Kai en Fortnite!</h5>
                                <p className="card-text">Kai Cenat, uno de los streamers más populares de Twitch, va a marcarse una Mafiathon 3 en la Serie de ídolos. Mejorad vuestro estilo con uno de sus dos trajes en la tienda el 13 de septiembre a las 02:00 CEST. Eso sí, antes de comprarlos, ¡luchad por ellos! Tendréis la oportunidad de desbloquear los dos trajes en la Copa de ídolos para móviles de Kai Cenat, que tendrá lugar el mismo día.</p>
                                <a href="https://www.fortnite.com/news/kai-cenat-icon-mobile-cup-unlock-kais-outfits-in-fortnite?lang=es-ES" className="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="mt-4">🎮 Rocket League</h2>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <img src="https://us-west-2-epicgames.graphassets.com/cm84mjx3f0a0j08n79wol8l1l/resize=fit:clip,height:720,width:1280/quality=value:100/output=format:webp/cmg6rrurbg9jz07odidqel01i" className="card-img-top" alt="Worlds 2025" />
                            <div className="card-body">
                                <h5 className="card-title">Nueva Actualización de Rocket League</h5>
                                <p className="card-text">La actualización v2.58 incluye varias correcciones de errores y mejora la visibilidad en las nuevas arenas Sunset Dunes y Midnight Metro.

                                    Versión: Rocket League v2.58
                                    Plataformas: Epic Games Store, Steam, PlayStation, Xbox, Nintendo
                                    Fecha de lanzamiento: 2 de octubre de 2025 a la 1:00 CEST</p>
                                <a href="https://www.rocketleague.com/es-es/news/rocket-league-patch-notes-v2-58" className="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <img src="https://us-west-2-epicgames.graphassets.com/cm84mjx3f0a0j08n79wol8l1l/resize=fit:clip,height:720,width:1280/quality=value:100/output=format:webp/cmfcbkstj6v7t07o5bjqx3kuc" className="card-img-top" alt="First Stand Tournament 2025" />
                            <div className="card-body">
                                <h5 className="card-title">Tornen 2025 Rocket League World + On-Site Guide</h5>
                                <p className="card-text">¡El Campeonato Mundial de Rocket League de 2025 ya casi está aquí! Aprenda todo lo que necesita saber ya sea que lo vea en línea o en persona.
                                    Es casi el momento de coronar a los campeones mundiales de la Rocket League cuando la RLCS se dirige a Lyon - Décines, Francia, por primera vez. ¡20 de los mejores equipos de Rocket League lucharán en el estadio LDLC de Lyon - Décines para tener la oportunidad de ganar un premio total de 1.200.000 dólares y la oportunidad de ser coronados campeones mundiales de Rocket League!
                                    Lea toda la información sobre el Campeonato Mundial de Rocket League, que se celebrará del 10 al 14 de septiembre, a continuación.</p>
                                <a href="https://www.rocketleague.com/es-es/news/2025-rocket-league-world-championship-primer" className="btn btn-primary">Leer más</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterComponent />
        </>
    );
}
