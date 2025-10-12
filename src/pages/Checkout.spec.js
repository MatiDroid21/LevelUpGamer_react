import { act, render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Checkout from "../pages/Checkout.jsx";
import Swal from "sweetalert2";

describe("Checkout Component con Karma/Jasmine", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("Renderiza mensaje carrito vacío si no hay productos", () => {
        const { container } = render(
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>
        );

        const h1 = container.querySelector("h1");
        expect(h1.textContent).toContain("Carrito vacío");
    });

   it("Finalizar compra limpia carrito y llama a Swal.fire", async () => {
    localStorage.setItem(
        "carrito",
        JSON.stringify([{ id: 1, nombre: "Producto A", precio: 1000, cantidad: 2, imagen: "img.jpg" }])
    );

    let swalCalled = false;
    Swal.fire = () => {
        swalCalled = true;
        return Promise.resolve();
    };

    const { getByText } = render(
        <MemoryRouter>
            <Checkout />
        </MemoryRouter>
    );

    const boton = getByText("Finalizar compra");

    await act(async () => {
        fireEvent.click(boton);
    });

    expect(swalCalled).toBe(true);
    expect(localStorage.getItem("carrito")).toBeNull();
});

});
