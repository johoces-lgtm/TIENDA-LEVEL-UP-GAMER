import React from 'react';

export const Nosotros = () => {
  return (
    <div className="container my-5 text-light flex-grow-1">
      <div className="text-center mb-5">
        <h2 className="text-info fw-bold display-5">Sobre Level-Up Gamer 🎮</h2>
        <p className="lead text-secondary col-md-8 mx-auto">
          Apasionados por el gaming, la tecnología y el entretenimiento de calidad.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card bg-dark border-secondary p-4 h-100">
            <h3 className="text-info fw-bold mb-3">🎯 Nuestra Misión</h3>
            <p className="text-secondary">
              Proporcionar a los gamers y entusiastas de los juegos de mesa productos de alta calidad, precios competitivos y un servicio al cliente excepcional para potenciar cada partida.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-dark border-secondary p-4 h-100">
            <h3 className="text-info fw-bold mb-3">🚀 Nuestra Visión</h3>
            <p className="text-secondary">
              Convertirnos en la tienda referente del mercado gamer a nivel nacional, creando una comunidad activa y apasionada por los videojuegos y juegos de estrategia.
            </p>
          </div>
        </div>
      </div>

      <div className="card bg-dark border-secondary p-4 text-center">
        <h4 className="text-info fw-bold mb-3">🏆 Nuestros Valores</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <h5 className="fw-bold text-white">Compromiso</h5>
            <p className="small text-secondary">Garantizamos productos 100% originales con garantía.</p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold text-white">Comunidad</h5>
            <p className="small text-secondary">Escuchamos y apoyamos el ecosistema gamer local.</p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold text-white">Innovación</h5>
            <p className="small text-secondary">Siempre a la vanguardia con lo último en tecnología.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;