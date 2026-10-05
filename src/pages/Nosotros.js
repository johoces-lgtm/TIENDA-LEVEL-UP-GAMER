import React from 'react';
import { Row, Col } from 'react-bootstrap';

export const Nosotros = () => {
  return (
    <div className="container my-5 flex-grow-1" style={{ color: '#D3D3D3' }}>
      
      {/* Título Principal */}
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5" style={{ color: '#00FFFF' }}>Sobre Level-Up Gamer 🎮</h2>
        <p className="lead col-md-8 mx-auto" style={{ color: '#888888' }}>
          Apasionados por el gaming, la tecnología y el entretenimiento de calidad.
        </p>
      </div>

      {/* Tarjetas de Misión y Visión */}
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card p-4 h-100" style={{ backgroundColor: '#1A1D20', borderColor: '#333' }}>
            <h3 className="fw-bold mb-3" style={{ color: '#00FFFF' }}>🎯 Nuestra Misión</h3>
            <p style={{ color: '#888888' }}>
              Proporcionar a los gamers y entusiastas de los juegos de mesa productos de alta calidad, precios competitivos y un servicio al cliente excepcional para potenciar cada partida.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-4 h-100" style={{ backgroundColor: '#1A1D20', borderColor: '#333' }}>
            <h3 className="fw-bold mb-3" style={{ color: '#00FFFF' }}>🚀 Nuestra Visión</h3>
            <p style={{ color: '#888888' }}>
              Convertirnos en la tienda referente del mercado gamer a nivel nacional, creando una comunidad activa y apasionada por los videojuegos y juegos de estrategia.
            </p>
          </div>
        </div>
      </div>

      {/* Valores y Equipo de Desarrollo */}
      <div className="card p-4 text-center" style={{ backgroundColor: '#1A1D20', borderColor: '#333' }}>
        <h4 className="fw-bold mb-4" style={{ color: '#00FFFF' }}>🏆 Nuestros Valores</h4>
        <div className="row g-3 mb-5">
          <div className="col-md-4">
            <h5 className="fw-bold text-white">Compromiso</h5>
            <p className="small" style={{ color: '#888888' }}>Garantizamos productos 100% originales con garantía.</p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold text-white">Comunidad</h5>
            <p className="small" style={{ color: '#888888' }}>Escuchamos y apoyamos el ecosistema gamer local.</p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold text-white">Innovación</h5>
            <p className="small" style={{ color: '#888888' }}>Siempre a la vanguardia con lo último en tecnología.</p>
          </div>
        </div>

        {/* Presentación del Equipo */}
        <section className="text-center">
          <h3 className="fw-bold text-white mb-4">Equipo de Desarrollo</h3>
          <Row className="justify-content-center g-4">
            <Col xs={6} md={3}>
              <div className="p-3 rounded border h-100" style={{ backgroundColor: '#1E2124', borderColor: '#333' }}>
                <p className="small mb-0" style={{ color: '#00FFFF' }}>Diseño & Frontend</p>
                <h6 className="fw-bold mt-2" style={{ color: '#ffffff' }}>Joaquín Hoces</h6>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="p-3 rounded border h-100" style={{ backgroundColor: '#1E2124', borderColor: '#333' }}>
                <p className="small mb-0" style={{ color: '#28A745' }}>Lógica & Backend</p>
                <h6 className="fw-bold mt-2" style={{ color: '#ffffff' }}>Alonso Payacán</h6>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="p-3 rounded border h-100" style={{ backgroundColor: '#1E2124', borderColor: '#333' }}>
                <p className="small mb-0" style={{ color: '#FFC107' }}>Presentación</p>
                <h6 className="fw-bold mt-2" style={{ color: '#ffffff' }}>Ricardo Vargas</h6>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="p-3 rounded border h-100" style={{ backgroundColor: '#1E2124', borderColor: '#333' }}>
                <p className="small mb-0" style={{ color: '#DC3545' }}>Informe</p>
                <h6 className="fw-bold mt-2" style={{ color: '#ffffff' }}>Bastián Vasquez</h6>
              </div>
            </Col>
          </Row>
        </section>
      </div>
      
    </div>
  );
};

export default Nosotros;