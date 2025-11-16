import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import RegisterComponent from "../pages/register";
import Swal from "sweetalert2";

describe("RegisterComponent", () => {
  beforeEach(() => {
    // Limpiar y mockear SweetAlert
    Swal.fire = jasmine.createSpy("Swal.fire").and.returnValue(Promise.resolve());
  });

  it("muestra error si los campos están vacíos", async () => {
    render(<RegisterComponent />);

    const boton = screen.getByRole("button", { name: /Registrarse/i });

    await act(async () => {
      fireEvent.click(boton);
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: "Error",
        text: "Todos los campos son obligatorios.",
        icon: "error",
      })
    );
  });

  it("muestra error si las contraseñas no coinciden", async () => {
    render(<RegisterComponent />);

    const nombre = screen.getByLabelText(/Nombre completo/i);
    const correo = screen.getByLabelText(/Correo electrónico/i);
    const direccion = screen.getByLabelText(/Dirección/i);
    const password = screen.getByLabelText(/^Contraseña$/i); // para no confundir con confirm
    const confirmPassword = screen.getByLabelText(/Confirmar contraseña/i);
    const boton = screen.getByRole("button", { name: /Registrarse/i });

    await act(async () => {
      fireEvent.change(nombre, { target: { value: "Mati" } });
      fireEvent.change(correo, { target: { value: "mati@test.com" } });
      fireEvent.change(direccion, { target: { value: "Calle 123" } });
      fireEvent.change(password, { target: { value: "1234" } });
      fireEvent.change(confirmPassword, { target: { value: "4321" } });
      fireEvent.click(boton);
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: "Error",
        text: "Las contraseñas no coinciden.",
        icon: "error",
      })
    );
  });

  it("muestra éxito si todos los campos son válidos", async () => {
    render(<RegisterComponent />);

    const nombre = screen.getByLabelText(/Nombre completo/i);
    const correo = screen.getByLabelText(/Correo electrónico/i);
    const direccion = screen.getByLabelText(/Dirección/i);
    const password = screen.getByLabelText(/^Contraseña$/i);
    const confirmPassword = screen.getByLabelText(/Confirmar contraseña/i);
    const boton = screen.getByRole("button", { name: /Registrarse/i });

    await act(async () => {
      fireEvent.change(nombre, { target: { value: "Mati" } });
      fireEvent.change(correo, { target: { value: "mati@test.com" } });
      fireEvent.change(direccion, { target: { value: "Calle 123" } });
      fireEvent.change(password, { target: { value: "1234" } });
      fireEvent.change(confirmPassword, { target: { value: "1234" } });
      fireEvent.click(boton);
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: "¡Registro exitoso!",
        text: "Tu cuenta ha sido creada correctamente 🎮",
        icon: "success",
      })
    );

    // Opcional: verificar que los inputs se hayan limpiado
    expect(nombre.value).toBe("");
    expect(correo.value).toBe("");
    expect(direccion.value).toBe("");
    expect(password.value).toBe("");
    expect(confirmPassword.value).toBe("");
  });
});
