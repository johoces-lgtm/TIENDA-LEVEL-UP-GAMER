import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../data/db';

export const Inicio = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    const productos = obtenerProductos();
    setDestacados(productos.slice(0, 3));
  }, []);

  return (
    <div className="text-light flex-grow-1">
      {/* Hero Banner */}
      <section className="bg-gradient text-white text-center py-5 border-bottom border-secondary" style={{ backgroundColor: '#121212' }}>
        <div className="container my-4">
          <h1 className="display-4 fw-bold text-info mb-3">¡BIENVENIDO A LEVEL-UP GAMER! 🎮</h1>
          <p className="lead text-secondary mb-4 col-md-8 mx-auto">
            Tu tienda definitiva de videojuegos, consolas, juegos de mesa, accesorios y hardware de alto rendimiento. ¡Eleva tu experiencia de juego al siguiente nivel!
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/catalogo" className="btn btn-info btn-lg fw-bold">
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías Principales */}
      <section className="container my-5">
        <h3 className="text-info fw-bold text-center mb-4">Categorías Populares</h3>
        <div className="row g-4 text-center">
          <div className="col-6 col-md-3">
            <div className="p-4 bg-dark rounded border border-secondary h-100 shadow-sm">
              <div className="fs-1 mb-2">🎲</div>
              <h5 className="fw-bold text-white">Juegos de Mesa</h5>
              <p className="small text-secondary mb-0">Estrategia y diversión familiar</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-4 bg-dark rounded border border-secondary h-100 shadow-sm">
              <div className="fs-1 mb-2">🕹️</div>
              <h5 className="fw-bold text-white">Consolas</h5>
              <p className="small text-secondary mb-0">PS5, Xbox, Nintendo y más</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-4 bg-dark rounded border border-secondary h-100 shadow-sm">
              <div className="fs-1 mb-2">💻</div>
              <h5 className="fw-bold text-white">PC Gamer</h5>
              <p className="small text-secondary mb-0">Equipos y accesorios pro</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-4 bg-dark rounded border border-secondary h-100 shadow-sm">
              <div className="fs-1 mb-2">🎧</div>
              <h5 className="fw-bold text-white">Accesorios</h5>
              <p className="small text-secondary mb-0">Audífonos, controles y más</p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-info fw-bold mb-0">Productos Destacados 🔥</h3>
          <Link to="/catalogo" className="btn btn-outline-info btn-sm">Ver todo</Link>
        </div>

        <div className="row">
          {destacados.map((producto) => (
            <div key={producto.codigo} className="col-12 col-md-4 mb-4">
              <div className="card h-100 bg-dark text-light border-secondary shadow-sm">
                <img 
                  src={process.env.PUBLIC_URL + '/' + producto.imagen} 
                  className="card-img-top" 
                  alt={producto.nombre} 
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <span className="badge bg-info text-dark mb-2">{producto.categoria}</span>
                    <h5 className="card-title text-white fw-bold">{producto.nombre}</h5>
                    <p className="card-text text-secondary small">{producto.descripcion}</p>
                  </div>
                  <div className="mt-3">
                    <p className="fs-5 fw-bold text-info mb-2">${producto.precio.toLocaleString('es-CL')} CLP</p>
                    <Link to={`/producto/${producto.codigo}`} className="btn btn-outline-info w-100">
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ventajas */}
      <section className="bg-dark border-top border-bottom border-secondary py-5 my-5">
        <div className="container text-center">
          <h3 className="text-info fw-bold mb-4">¿Por qué elegir Level-Up Gamer?</h3>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-3">
                <div className="fs-2 mb-2 text-info">🚀</div>
                <h5 className="fw-bold">Envíos Rápidos</h5>
                <p className="text-secondary small">Despachamos tu pedido a todo Chile en tiempo récord.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3">
                <div className="fs-2 mb-2 text-info">🛡️</div>
                <h5 className="fw-bold">Garantía Oficial</h5>
                <p className="text-secondary small">Todos nuestros productos son 100% originales con garantía.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3">
                <div className="fs-2 mb-2 text-info">💳</div>
                <h5 className="fw-bold">Pago Seguro</h5>
                <p className="text-secondary small">Múltiples métodos de pago con la mayor seguridad.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;