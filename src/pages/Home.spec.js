// src/Home.spec.js
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './home';

describe('Home Component', () => {
  it('muestra el título de productos destacados', () => {
    render(<Home />);
    expect(screen.getByText(/🎮 Productos Destacados/i)).toBeInTheDocument();
  });

  it('muestra algunos productos', () => {
    render(<Home />);
    // Verificamos que un producto específico esté en el documento
    expect(screen.getByText(/Teclado Redragon Kumara/i)).toBeInTheDocument();
    expect(screen.getByText(/Mouse Logitech G502 Hero/i)).toBeInTheDocument();
  });

  it('abre el modal al hacer click en "Ver más"', () => {
    render(<Home />);
    const botonVerMas = screen.getAllByText(/Ver más/i)[0];
    fireEvent.click(botonVerMas);

    // El modal debe aparecer con el nombre del producto
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Teclado Redragon Kumara/i)).toBeInTheDocument();
  });

  it('cierra el modal al hacer click en cerrar', () => {
    render(<Home />);
    const botonVerMas = screen.getAllByText(/Ver más/i)[0];
    fireEvent.click(botonVerMas);

    const botonCerrar = screen.getByText(/Cerrar/i);
    fireEvent.click(botonCerrar);

    // El modal ya no debe estar en el documento
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
