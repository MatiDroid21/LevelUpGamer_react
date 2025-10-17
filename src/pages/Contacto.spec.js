import { render, fireEvent, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contacto from "../pages/Contacto.jsx";
import Swal from "sweetalert2";

describe("Formulario de Contacto - LevelUpGamer", () => {
  beforeEach(() => {
    // Reiniciamos mocks antes de cada test
    Swal.fire = jasmine.createSpy("Swal.fire").and.returnValue(Promise.resolve());
  });

  it("Muestra alerta de advertencia si hay campos vacíos", async () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.submit(screen.getByTestId("contacto-form"));
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      jasmine.objectContaining({
        icon: "warning",
        title: "Campos incompletos ⚠️",
      })
    );
  });

  it("Muestra alerta de error si el correo es inválido", async () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("👤 Nombre"), {
      target: { value: "Mati" },
    });
    fireEvent.change(screen.getByLabelText("📧 Correo electrónico"), {
      target: { value: "correo-invalido" },
    });
    fireEvent.change(screen.getByLabelText("📌 Tipo de mensaje"), {
      target: { value: "Consulta" },
    });
    fireEvent.change(screen.getByLabelText("💬 Mensaje"), {
      target: { value: "Hola, este es un test." },
    });

    await act(async () => {
      fireEvent.submit(screen.getByTestId("contacto-form"));
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      jasmine.objectContaining({
        icon: "error",
        title: "Correo inválido ❌",
      })
    );
  });

  it("Muestra alerta de éxito y limpia el formulario al enviar correctamente", async () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("👤 Nombre"), {
      target: { value: "Matías" },
    });
    fireEvent.change(screen.getByLabelText("📧 Correo electrónico"), {
      target: { value: "matias@example.com" },
    });
    fireEvent.change(screen.getByLabelText("📌 Tipo de mensaje"), {
      target: { value: "Sugerencia" },
    });
    fireEvent.change(screen.getByLabelText("💬 Mensaje"), {
      target: { value: "Gran sitio, felicidades!" },
    });

    await act(async () => {
      fireEvent.submit(screen.getByTestId("contacto-form"));
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      jasmine.objectContaining({
        icon: "success",
        title: "Mensaje enviado 🎮",
      })
    );

    // Verificar que se haya limpiado el formulario
    expect(screen.getByLabelText("👤 Nombre").value).toBe("");
    expect(screen.getByLabelText("📧 Correo electrónico").value).toBe("");
    expect(screen.getByLabelText("📌 Tipo de mensaje").value).toBe("");
    expect(screen.getByLabelText("💬 Mensaje").value).toBe("");
  });
});

