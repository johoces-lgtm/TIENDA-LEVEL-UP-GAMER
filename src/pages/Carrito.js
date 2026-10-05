import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const Carrito = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad, limpiarCarrito, totalPagar } = useContext(CartContext);
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [tieneDescuento, setTieneDescuento] = useState(false);

  useEffect(() => {
    // Revisamos si el usuario guardado tiene correo Duoc
    const correoGuardado = localStorage.getItem("correoRegistrado") || "";
    if (correoGuardado.includes("@duoc.cl") || correoGuardado.includes("@profesor.duoc.cl")) {
        setTieneDescuento(true);
    }
  }, []);

  const handleFinalizarCompra = () => {
    setCompraExitosa(true);
    limpiarCarrito();
  };

  // Calcular el total final
  const totalConDescuento = tieneDescuento ? totalPagar * 0.8 : totalPagar;

  if (compraExitosa) {
    return (
      <div className="container my-5 text-light flex-grow-1 text-center">
        <div className="card bg-dark border-success p-5 mx-auto shadow-lg" style={{ maxWidth: '600px' }}>
          <div className="fs-1 text-success mb-3">🎉 ¡Compra Realizada con Éxito!</div>
          <h3 className="fw-bold text-white mb-3">¡Gracias por tu pedido en Level-Up Gamer!</h3>
          <p className="text-secondary mb-4">
            Hemos recibido tu orden correctamente. Te enviaremos un correo con los detalles del envío y el número de seguimiento.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-info fw-bold" onClick={() => setCompraExitosa(false)}>
              Volver al Inicio
            </Link>
            <Link to="/catalogo" className="btn btn-outline-info" onClick={() => setCompraExitosa(false)}>
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 text-light flex-grow-1">
      <h2 className="text-info fw-bold mb-4">Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="alert alert-secondary text-center p-5">
          <p className="mb-3 fs-5">El carrito está vacío.</p>
          <Link to="/catalogo" className="btn btn-info fw-bold">Explorar Catálogo</Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8 mb-4">
            {carrito.map((item) => (
              <div key={item.codigo} className="card bg-dark border-secondary mb-3 text-light">
                <div className="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={process.env.PUBLIC_URL + '/' + item.imagen}
                      alt={item.nombre}
                      style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                      className="rounded"
                    />
                    <div>
                      <h5 className="mb-1 text-white">{item.nombre}</h5>
                      <p className="mb-0 text-info fw-bold">${item.precio.toLocaleString('es-CL')} CLP</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary text-light"
                      onClick={() => actualizarCantidad(item.codigo, item.cantidad - 1)}
                    >
                      -
                    </button>
                    <span className="px-2 fw-bold">{item.cantidad}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary text-light"
                      onClick={() => actualizarCantidad(item.codigo, item.cantidad + 1)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger ms-3"
                      onClick={() => eliminarDelCarrito(item.codigo)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card bg-dark border-secondary text-light p-3">
              <h4 className="text-info fw-bold border-bottom border-secondary pb-2">Resumen de Compra</h4>
              
              <div className="d-flex justify-content-between my-2">
                <span className="fs-6">Subtotal:</span>
                <span className="fs-6 text-secondary">${totalPagar.toLocaleString('es-CL')} CLP</span>
              </div>

              {tieneDescuento && (
                  <div className="d-flex justify-content-between my-2 text-success">
                    <span className="fs-6">Descuento Duoc (20%):</span>
                    <span className="fs-6 fw-bold">-${(totalPagar * 0.2).toLocaleString('es-CL')} CLP</span>
                  </div>
              )}

              <div className="d-flex justify-content-between my-3 border-top border-secondary pt-2">
                <span className="fs-5">Total a Pagar:</span>
                <span className="fs-5 fw-bold text-info">${totalConDescuento.toLocaleString('es-CL')} CLP</span>
              </div>
              
              <button className="btn btn-success w-100 fw-bold mb-2" onClick={handleFinalizarCompra}>
                Finalizar Compra
              </button>
              <button className="btn btn-outline-danger w-100" onClick={limpiarCarrito}>Vaciar Carrito</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;