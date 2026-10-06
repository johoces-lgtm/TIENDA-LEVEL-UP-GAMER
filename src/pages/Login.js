import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (correo === localStorage.getItem('correoRegistrado') &&
        contrasena === localStorage.getItem('claveRegistrada')) {
      localStorage.setItem('usuarioActivo', correo);
      navigate('/'); 
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={4}>
          {/* Título exacto para que el test lo encuentre una sola vez */}
          <h2 className="text-center mb-4">INICIAR SESIÓN</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="correo" className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control 
                type="email" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="contrasena" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                value={contrasena} 
                onChange={(e) => setContrasena(e.target.value)} 
                required 
              />
            </Form.Group>

            {/* El botón debe decir Ingresar para no duplicar el texto del título */}
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Ingresar
            </Button>

            <div className="text-center">
              ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;