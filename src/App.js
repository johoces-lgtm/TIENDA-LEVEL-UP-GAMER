import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Admin from './pages/Admin';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="bg-dark text-light min-vh-100 d-flex flex-column">
          <Header />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:codigo" element={<DetalleProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/nosotros" element={<Nosotros />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;