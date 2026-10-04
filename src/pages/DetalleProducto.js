import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { obtenerProductoPorCodigo } from '../data/db';
import { CartContext } from '../context/CartContext';

export const DetalleProducto = () => {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CartContext);

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const prod = obtenerProductoPorCodigo(codigo);
    if (prod) {
      setProducto(prod);
    } else {
      navigate('/');
    }
  }, [codigo, navigate]);

  if (!producto) return <div className="text-light text-center my-5">Cargando producto...</div>;

  const incrementar = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="container my-5 text-light">
      <Link to="/" className="btn btn-outline-secondary mb-4">&larr; Volver al catálogo</Link>
      <div className="row bg-dark p-4 rounded border border-secondary">
        <div className="col-md-6">
          <img
            src={process.env.PUBLIC_URL + '/' + producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded"
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between mt-3 mt-md-0">
          <div>
            <span className="badge bg-info text-dark mb-2">{producto.categoria}</span>
            <h2 className="text-white fw-bold">{producto.nombre}</h2>
            <p className="text-secondary mt-3">{producto.descripcion}</p>
            <p className="fs-6 text-muted">Stock disponible: {producto.stock} unidades</p>
            <h3 className="text-info my-3">${producto.precio.toLocaleString('es-CL')} CLP</h3>
          </div>

          <div className="d-flex align-items-center gap-3 mt-4">
            <div className="input-group" style={{ width: '140px' }}>
              <button 
                className="btn btn-outline-secondary text-light fw-bold" 
                type="button"
                onClick={decrementar}
                disabled={cantidad <= 1}
              >
                -
              </button>
              <span className="form-control bg-dark text-light border-secondary text-center fw-bold d-flex align-items-center justify-content-center">
                {cantidad}
              </span>
              <button 
                className="btn btn-outline-secondary text-light fw-bold" 
                type="button"
                onClick={incrementar}
                disabled={cantidad >= producto.stock}
              >
                +
              </button>
            </div>

            <button
              className="btn btn-info flex-grow-1 fw-bold"
              onClick={() => agregarAlCarrito(producto, cantidad)}
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;