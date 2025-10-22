import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/login.jsx";

// Mock del AuthContext
import { AuthContext } from "../context/AuthContext";

describe("Login Component", () => {
  let loginMock, logoutMock;

  beforeEach(() => {
    loginMock = jasmine.createSpy("login").and.returnValue(Promise.resolve({ ok: true }));
    logoutMock = jasmine.createSpy("logout");
  });

  it("llama a login al enviar formulario con correo y contraseña válidos", async () => {
    render(
      <AuthContext.Provider value={{ login: loginMock, user: null, isAuthenticated: false, logout: logoutMock }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "test@gmail.com" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "123456" } });

    await act(async () => {
      fireEvent.submit(screen.getByRole("form"));
    });

    expect(loginMock).toHaveBeenCalledWith("test@gmail.com", "123456");
  });

  it("muestra mensaje si correo o contraseña están vacíos", async () => {
    // Mock que devuelve error
    loginMock.and.returnValue(Promise.resolve({ ok: false, message: "Debes ingresar correo y contraseña" }));

    render(
      <AuthContext.Provider value={{ login: loginMock, user: null, isAuthenticated: false, logout: logoutMock }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await act(async () => {
      fireEvent.submit(screen.getByRole("form"));
    });

    expect(screen.getByText(/Debes ingresar correo y contraseña/i)).toBeDefined();
  });
});
