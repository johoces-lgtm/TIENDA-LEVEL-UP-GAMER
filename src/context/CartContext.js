import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito_levelup');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito_levelup', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.codigo === producto.codigo);
      if (existe) {
        return prev.map((item) =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminarDelCarrito = (codigo) => {
    setCarrito((prev) => prev.filter((item) => item.codigo !== codigo));
  };

  const actualizarCantidad = (codigo, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(codigo);
      return;
    }
    setCarrito((prev) =>
      prev.map((item) =>
        item.codigo === codigo ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const limpiarCarrito = () => setCarrito([]);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPagar = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        limpiarCarrito,
        totalItems,
        totalPagar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};