import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Productos from "../pages/productos.jsx";
import productosData from "../data/productos.json";

describe("Tests generales Productos Component", () => {
    let container;

    beforeEach(() => {
        localStorage.clear();
        container = render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        ).container;
    });

    it("Renderiza el componente y título principal", () => {
        const h1 = container.querySelector("h1");
        expect(h1).not.toBeNull();
        expect(h1.textContent).toContain("Productos");
    });

    it("Renderiza al menos un producto", () => {
        const producto = container.querySelector("h5");
        expect(producto).not.toBeNull();
    });

    it("La búsqueda filtra productos", () => {
        const input = container.querySelector("input[type=text]");
        fireEvent.change(input, { target: { value: "Producto inexistente" } });

        const mensaje = Array.from(container.querySelectorAll("p"))
            .find(p => p.textContent.includes("No se encontraron productos"));
        expect(mensaje).not.toBeNull();
    });

    it("Renderiza lista de productos y permite abrir modal", () => {
        const botonDetalles = container.querySelector("button");
        fireEvent.click(botonDetalles);

        const modal = container.querySelector(".modal.d-block");
        expect(modal).not.toBeNull();
    });

    it("Agrega producto al carrito y guarda en localStorage", () => {
        // Abrir modal
        const verDetallesBtn = container.querySelector("button"); // botón "Ver detalles"
        fireEvent.click(verDetallesBtn);
        // Ahora sí buscar el botón "Comprar"
        const comprarBtn = Array.from(container.querySelectorAll("button"))
            .find(btn => btn.textContent.includes("Comprar"));
        expect(comprarBtn).not.toBeNull();
        fireEvent.click(comprarBtn);
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito") || "[]");
        expect(carritoGuardado.length).toBe(1);
        expect(carritoGuardado[0].nombre).toBe(productosData[0].nombre);
    });

});
