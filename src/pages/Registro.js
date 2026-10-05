import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Registro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        run: '',
        fechaNac: '',
        nombre: '',
        apellidos: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        region: '',
        comuna: '',
        direccion: ''
    });

    const [errores, setErrores] = useState({});
    const [mostrarPass, setMostrarPass] = useState(false);
    const [mostrarConfPass, setMostrarConfPass] = useState(false);

    const ubicaciones = {
        "RM": ["Santiago", "Providencia", "Maipú", "Puente Alto", "Macul"],
        "V": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
        "VIII": ["Concepción", "Talcahuano", "Chiguayante", "San Pedro de la Paz"]
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Limpiar error al escribir
        if (errores[name]) {
            setErrores({ ...errores, [name]: '' });
        }
    };

    const validarFormulario = () => {
        let nuevosErrores = {};
        let esValido = true;

        // Validar RUN
        const runRegex = /^\d{7,8}[0-9kK]$/;
        if (!runRegex.test(formData.run)) {
            nuevosErrores.run = "Formato inválido (7 a 9 caracteres sin puntos ni guion).";
            esValido = false;
        }

        // Validar Correo
        if (!formData.correo.endsWith("@duoc.cl") && !formData.correo.endsWith("@profesor.duoc.cl") && !formData.correo.endsWith("@gmail.com")) {
            nuevosErrores.correo = "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.";
            esValido = false;
        }

        // Validar Edad
        if (formData.fechaNac) {
            const hoy = new Date();
            const nacimiento = new Date(formData.fechaNac);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            if (hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            if (edad < 18) {
                nuevosErrores.fechaNac = "Debes ser mayor de 18 años.";
                esValido = false;
            }
        }

        // Validar Contraseñas
        if (formData.contrasena.length < 8) {
            nuevosErrores.contrasena = "Mínimo 8 caracteres.";
            esValido = false;
        }
        if (formData.contrasena !== formData.confirmarContrasena) {
            nuevosErrores.confirmarContrasena = "Las contraseñas no coinciden.";
            esValido = false;
        }

        setErrores(nuevosErrores);
        return esValido;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validarFormulario()) {
            console.log("Datos a registrar:", formData);
            
            // Simulación de guardar en localStorage
            localStorage.setItem("correoRegistrado", formData.correo);
            localStorage.setItem("claveRegistrada", formData.contrasena);
            localStorage.setItem("nombreRegistrado", formData.nombre);

            if (formData.correo.includes("@duoc.cl") || formData.correo.includes("@profesor.duoc.cl")) {
                alert("¡Felicidades! Al registrarte con tu correo Duoc UC, has obtenido un 20% de descuento.");
            } else {
                alert("¡Socio registrado exitosamente!");
            }
            
            navigate('/login'); // Redirige al login tras registro exitoso
        }
    };

    return (
        <Container className="my-5" style={{ maxWidth: '700px' }}>
            <div className="text-center mb-4">
                <h2 className="text-success fw-bold">ÚNETE A LA COMUNIDAD</h2>
                <p className="text-secondary">Regístrate como socio para acumular puntos LevelUp.</p>
            </div>

            <Card className="bg-dark text-light border-secondary p-4">
                <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">RUN <span className="text-secondary small">(Sin puntos ni guion)</span></Form.Label>
                                <Form.Control 
                                    name="run" value={formData.run} onChange={handleChange} 
                                    className={`bg-black text-light ${errores.run ? 'border-danger' : 'border-secondary'}`} 
                                    required 
                                />
                                {errores.run && <span className="text-danger small">{errores.run}</span>}
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Fecha de Nacimiento</Form.Label>
                                <Form.Control 
                                    type="date" name="fechaNac" value={formData.fechaNac} onChange={handleChange} 
                                    className={`bg-black text-light ${errores.fechaNac ? 'border-danger' : 'border-secondary'}`} 
                                    required 
                                />
                                {errores.fechaNac && <span className="text-danger small">{errores.fechaNac}</span>}
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Nombre</Form.Label>
                                <Form.Control name="nombre" value={formData.nombre} onChange={handleChange} className="bg-black text-light border-secondary" required />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Apellidos</Form.Label>
                                <Form.Control name="apellidos" value={formData.apellidos} onChange={handleChange} className="bg-black text-light border-secondary" required />
                            </Form.Group>
                        </Col>

                        <Col xs={12}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
                                <Form.Control 
                                    type="email" name="correo" value={formData.correo} onChange={handleChange} 
                                    className={`bg-black text-light ${errores.correo ? 'border-danger' : 'border-secondary'}`} 
                                    required 
                                />
                                {errores.correo && <span className="text-danger small">{errores.correo}</span>}
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Contraseña</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        type={mostrarPass ? "text" : "password"} name="contrasena" value={formData.contrasena} onChange={handleChange} 
                                        className={`bg-black text-light ${errores.contrasena ? 'border-danger' : 'border-secondary'}`} 
                                        required 
                                    />
                                    <Button variant="outline-secondary" onClick={() => setMostrarPass(!mostrarPass)}>👁️</Button>
                                </InputGroup>
                                {errores.contrasena && <span className="text-danger small">{errores.contrasena}</span>}
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Confirmar Contraseña</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        type={mostrarConfPass ? "text" : "password"} name="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} 
                                        className={`bg-black text-light ${errores.confirmarContrasena ? 'border-danger' : 'border-secondary'}`} 
                                        required 
                                    />
                                    <Button variant="outline-secondary" onClick={() => setMostrarConfPass(!mostrarConfPass)}>👁️</Button>
                                </InputGroup>
                                {errores.confirmarContrasena && <span className="text-danger small">{errores.confirmarContrasena}</span>}
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Región</Form.Label>
                                <Form.Select name="region" value={formData.region} onChange={handleChange} className="bg-black text-light border-secondary" required>
                                    <option value="">-- Selecciona Región --</option>
                                    {Object.keys(ubicaciones).map(reg => (
                                        <option key={reg} value={reg}>{reg === "RM" ? "Región Metropolitana" : `Región ${reg}`}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Comuna</Form.Label>
                                <Form.Select name="comuna" value={formData.comuna} onChange={handleChange} className="bg-black text-light border-secondary" required disabled={!formData.region}>
                                    <option value="">-- Selecciona Comuna --</option>
                                    {formData.region && ubicaciones[formData.region].map(com => (
                                        <option key={com} value={com}>{com}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Button variant="success" type="submit" className="w-100 text-dark fw-bold mt-4">
                        REGISTRARSE
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Registro;