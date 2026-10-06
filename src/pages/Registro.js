import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [run, setRun] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const runRegex = /^\d{6,8}[0-9kK]$/;
    if (!runRegex.test(run)) {
      setError('El RUN debe tener entre 7 a 9 caracteres (sin puntos ni guion).');
      return;
    }

    const hoy = new Date();
    const fechaNacimiento = new Date(fechaNac + 'T00:00:00');
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    if (edad < 18) {
      setError('Debes ser mayor de 18 años para registrarte.');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    localStorage.setItem('correoRegistrado', correo);
    localStorage.setItem('claveRegistrada', contrasena);
    localStorage.setItem('nombreRegistrado', nombre);

    navigate('/login');
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          {/* Título exacto que busca el test de Registro */}
          <h2 className="text-center text-success fw-bold mb-4">ÚNETE A LA COMUNIDAD</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="run" className="mb-3">
              <Form.Label>RUN</Form.Label>
              <Form.Control type="text" value={run} onChange={(e) => setRun(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="fechaNac" className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control type="date" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="nombre" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="apellidos" className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="correo" className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="contrasena" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="confirmarContrasena" className="mb-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control type="password" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="region" className="mb-3">
              <Form.Label>Región</Form.Label>
              <Form.Select value={region} onChange={(e) => setRegion(e.target.value)} required>
                <option value="">Seleccione...</option>
                <option value="RM">Metropolitana</option>
                <option value="V">Valparaíso</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="comuna" className="mb-3">
              <Form.Label>Comuna</Form.Label>
              <Form.Select value={comuna} onChange={(e) => setComuna(e.target.value)} required>
                <option value="">Seleccione...</option>
                <option value="Santiago">Santiago</option>
                <option value="Vina">Viña del Mar</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mt-4 fw-bold text-dark">
              REGISTRARSE
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;