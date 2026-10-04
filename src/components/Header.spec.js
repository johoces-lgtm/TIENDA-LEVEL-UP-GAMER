import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Header from './Header';

describe('Pruebas Unitarias Frontend - Componente Header (Jasmine + DOM)', () => {

  it('Debe renderizar el título de la tienda en el DOM', () => {
    const mockContextValue = { totalItems: 0 };

    render(
      <CartContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </CartContext.Provider>
    );

    const titulo = screen.getByText(/LEVEL-UP GAMER/i);
    expect(titulo).not.toBeNull();
  });

  it('Debe mostrar la cantidad correcta en el badge del carrito cuando hay elementos', () => {
    const mockContextValue = { totalItems: 4 };

    render(
      <CartContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </CartContext.Provider>
    );

    const badge = screen.getByText('4');
    expect(badge).not.toBeNull();
  });
});