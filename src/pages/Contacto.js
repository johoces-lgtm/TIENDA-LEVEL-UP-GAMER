import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        motivo: 'soporte',
        mensaje: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("¡Mensaje enviado!");
        console.log("Formulario de contacto:", formData);
    };

    return (
        <Container className="my-5" style={{ maxWidth: '600px' }}>
            <div className="text-center mb-4">
                <h2 className="text-info fw-bold">SOPORTE Y CONTACTO</h2>
                <p className="text-secondary">¿Tienes dudas o algún problema técnico? Escríbenos.</p>
            </div>

            <Card className="bg-dark text-light border-secondary p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Nombre Completo</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="nombre"
                            className="bg-black text-light border-secondary" 
                            value={formData.nombre}
                            onChange={handleChange}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="correo"
                            className="bg-black text-light border-secondary" 
                            value={formData.correo}
                            onChange={handleChange}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Motivo de la consulta</Form.Label>
                        <Form.Select 
                            name="motivo"
                            className="bg-black text-light border-secondary"
                            value={formData.motivo}
                            onChange={handleChange}
                        >
                            <option value="soporte">Soporte Técnico</option>
                            <option value="ventas">Dudas sobre Ventas</option>
                            <option value="reclamo">Reclamos</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Mensaje</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={4} 
                            name="mensaje"
                            className="bg-black text-light border-secondary" 
                            value={formData.mensaje}
                            onChange={handleChange}
                            required 
                        />
                    </Form.Group>

                    <Button variant="info" type="submit" className="w-100 text-white fw-bold">
                        Enviar Mensaje
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Contacto;