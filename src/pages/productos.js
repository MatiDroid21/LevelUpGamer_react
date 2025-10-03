import FooterComponent from "../components/FooterComponent";
import kumara from "../assets/img/productos/kumara.png";
import logitech from "../assets/img/productos/logitech.jpg";
import razer from "../assets/img/productos/razer-firefly-V2-Pro-mousepad.png";
import kingston from "../assets/img/productos/fury_ram.jpg";
import victus from "../assets/img/productos/victus.jpg";
import tuf16 from "../assets/img/productos/tufF16.png";
import predator from "../assets/img/productos/predator.jpg";
import katana17 from "../assets/img/productos/katana17.png";
import uno from "../assets/img/productos/uno.jpg";
import "../styles/cardsIndex.css";
import { useState } from "react";

// Cambia el nombre de la función a mayúscula para que sea un componente válido
export default function Productos() {
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
        },
        {
            id: 9,
            nombre: "Juego de cartas UNO",
            codigo: "UNO123",
            descripcion: "El clásico juego de cartas para toda la familia.",
            precio: 8990,
            imagen: uno
        }
    ];
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const filteredProducts = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className="container">
            {/*barra de busqueda*/}
            <input type="text" className="form-control my-4" placeholder="Buscar productos..." onChange={handleSearchChange} />
            {/* filtro */}  
            
            <h1 className="text-center my-4">Nuestros Productos</h1>

            <div className="row">
                {filteredProducts.map((producto) => (
                    <div className="col-md-4 mb-4" key={producto.id}>
                        <div className="card h-100">
                            <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">{producto.descripcion}</p>
                                <p className="card-text"><strong>Precio: </strong>${producto.precio.toLocaleString()}</p>
                                <p className="card-text"><strong>Código: </strong>{producto.codigo}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredProducts.length === 0 && (
                    <p className="text-center">No se encontraron productos que coincidan con la búsqueda.</p>
                )}
            </div>
            <FooterComponent />
        </div>
    )
}