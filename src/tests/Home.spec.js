import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/home";

describe("Home Component", () => {
  it("renderiza el título de productos destacados", () => {
    render(<Home />);
    const titulo = screen.getByText(/🎮 Productos Destacados/i);
    expect(titulo).not.toBeNull();
  });

  it("muestra al menos un producto", () => {
    render(<Home />);
    const botones = screen.getAllByText(/Ver más/i);
    expect(botones.length).toBeGreaterThan(0);
  });

  it("el primer botón de producto existe", () => {
    render(<Home />);
    const boton = screen.getAllByText(/Ver más/i)[0];
    expect(boton).not.toBeNull();
  });
});
