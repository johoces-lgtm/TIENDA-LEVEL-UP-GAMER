import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const Header = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <header className="bg-dark text-white py-3 border-bottom border-secondary sticky-top">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <span className="fs-3">🎮</span>
          <h1 className="h3 mb-0 text-info fw-bold">LEVEL-UP GAMER</h1>
        </Link>

        <nav className="d-flex align-items-center gap-3">
          <ul className="nav nav-pills gap-1 mb-0">
            <li className="nav-item">
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => `nav-link ${isActive ? 'active bg-info text-dark fw-bold' : 'text-light'}`}
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/catalogo" 
                className={({ isActive }) => `nav-link ${isActive ? 'active bg-info text-dark fw-bold' : 'text-light'}`}
              >
                Catálogo
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/nosotros" 
                className={({ isActive }) => `nav-link ${isActive ? 'active bg-info text-dark fw-bold' : 'text-light'}`}
              >
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/contacto" 
                className={({ isActive }) => `nav-link ${isActive ? 'active bg-info text-dark fw-bold' : 'text-light'}`}
              >
                Contacto
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/admin" 
                className={({ isActive }) => `nav-link ${isActive ? 'active bg-warning text-dark fw-bold' : 'text-warning'}`}
              >
                Administración
              </NavLink>
            </li>
          </ul>

          <Link to="/carrito" className="btn btn-outline-info position-relative ms-2">
            🛒 Carrito
            {totalItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;