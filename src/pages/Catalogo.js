import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../data/db';

export const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const lista = obtenerProductos();
    setProductos(lista);
  }, []);

  return (
    <main className="container my-5 flex-grow-1" id="catalogo">
      <h2 className="text-info fw-bold mb-4">Catálogo de Productos</h2>

      <div className="row">
        {productos.map((producto) => (
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
    </main>
  );
};

export default Catalogo;