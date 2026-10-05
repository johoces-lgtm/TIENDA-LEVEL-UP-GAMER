import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Registro from './Registro';

describe('Pruebas Unitarias Frontend - Componente Registro', () => {

  it('1. Debe renderizar el título principal de registro en el DOM', () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    
    const titulo = screen.getByText('ÚNETE A LA COMUNIDAD');
    expect(titulo).not.toBeNull();
  });

  it('2. Debe permitir ingresar datos en el campo RUN (Manipulación del DOM)', () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );
    
    const inputRun = screen.getByLabelText(/RUN/i);
    fireEvent.change(inputRun, { target: { value: '123456789' } });
    
    expect(inputRun.value).toBe('123456789');
  });

});