import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Pruebas Unitarias Frontend - Componente Login', () => {

  it('1. Debe renderizar el formulario de login correctamente', () => {
    // Envolvemos en BrowserRouter porque Login usa <Link>
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    // Busca que el título exista en el DOM
    const titulo = screen.getByText('INICIAR SESIÓN');
    expect(titulo).not.toBeNull();
  });

  it('2. Debe actualizar el estado cuando el usuario escribe su correo (Eventos)', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    // Simulamos que el usuario escribe en el input
    const inputCorreo = screen.getByLabelText(/Correo Electrónico/i);
    fireEvent.change(inputCorreo, { target: { value: 'gamer@duoc.cl' } });
    
    // Verificamos que el valor cambió correctamente
    expect(inputCorreo.value).toBe('gamer@duoc.cl');
  });

});