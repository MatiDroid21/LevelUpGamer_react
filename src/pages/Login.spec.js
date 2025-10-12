import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Swal from "sweetalert2";
import LoginComponent from "./login";

describe("LoginComponent", () => {

    beforeEach(() => {
        localStorage.clear();
        // Mock de Swal.fire
        spyOn(Swal, "fire").and.returnValue(Promise.resolve());
    });

    it("muestra el título 'Iniciar sesión'", () => {
        render(
            <MemoryRouter>
                <LoginComponent />
            </MemoryRouter>
        );
        const titulo = screen.getByRole("heading", { name: /Iniciar sesión/i });
        expect(titulo).toBeTruthy();
    });

    it("muestra error si no se ingresan correo ni contraseña", async () => {
        render(
            <MemoryRouter>
                <LoginComponent />
            </MemoryRouter>
        );
        const boton = screen.getByRole("button", { name: /Iniciar sesión/i });
        
        await act(async () => {
            fireEvent.click(boton);
        });

        expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
            title: "Error!",
            text: "Debes ingresar tu correo y contraseña",
            icon: "error",
        }));
    });

    it("muestra error si falta el correo", async () => {
        render(
            <MemoryRouter>
                <LoginComponent />
            </MemoryRouter>
        );

        const passInput = screen.getByLabelText(/Contraseña/i);
        const boton = screen.getByRole("button", { name: /Iniciar sesión/i });

        await act(async () => {
            fireEvent.change(passInput, { target: { value: "1234" } });
            fireEvent.click(boton);
        });

        expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
            title: "Error!",
            text: "Debes ingresar tu correo",
            icon: "error",
        }));
    });

    it("guarda el usuario en localStorage si los campos son válidos", async () => {
        render(
            <MemoryRouter>
                <LoginComponent />
            </MemoryRouter>
        );

        const email = screen.getByLabelText(/Correo electrónico/i);
        const pass = screen.getByLabelText(/Contraseña/i);
        const boton = screen.getByRole("button", { name: /Iniciar sesión/i });

        await act(async () => {
            fireEvent.change(email, { target: { value: "test@correo.com" } });
            fireEvent.change(pass, { target: { value: "1234" } });
            fireEvent.click(boton);
        });

        expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
            title: "Bienvenido!",
            text: "test@correo.com",
            icon: "success",
        }));

        expect(localStorage.getItem("usuario")).toBe("test@correo.com");
    });
});
