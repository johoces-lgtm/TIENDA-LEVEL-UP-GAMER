import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const LoginForm = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos de Login:", { correo, contrasena });
        // Aquí irá tu lógica de autenticación
    };

    return (
        <Container className="my-5" style={{ maxWidth: '450px' }}>
            <div className="text-center mb-4">
                <h2 className="text-info fw-bold">INICIAR SESIÓN</h2>
                <p className="text-secondary">Ingresa a tu cuenta de socio o administrador.</p>
            </div>
            <Card className="bg-dark text-light border-secondary p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="loginCorreo">
                        <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
                        <Form.Control 
                            type="email" 
                            className="bg-black text-light border-secondary" 
                            placeholder="ejemplo@duoc.cl" 
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="loginContrasena">
                        <Form.Label className="fw-bold">Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            className="bg-black text-light border-secondary" 
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="recordar">
                        <Form.Check 
                            type="checkbox" 
                            label={<span className="text-secondary small">Recordar mi sesión</span>} 
                        />
                    </Form.Group>

                    <Button variant="info" type="submit" className="w-100 text-white fw-bold mt-2">
                        INGRESAR
                    </Button>

                    <div className="text-center mt-3">
                        <p className="small text-secondary mb-0">
                            ¿No tienes cuenta? <a href="/registro" className="text-success text-decoration-none fw-bold">Regístrate aquí</a>
                        </p>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default LoginForm;