import React, { useState } from 'react';

export const Contacto = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.nombre && form.email && form.mensaje) {
      setEnviado(true);
      setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
    }
  };

  return (
    <div className="container my-5 text-light flex-grow-1">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card bg-dark border-secondary p-4 shadow-sm">
            <h2 className="text-info fw-bold mb-3 text-center">📩 Contáctanos</h2>
            <p className="text-secondary text-center mb-4">
              ¿Tienes dudas, sugerencias o necesitas soporte? Escríbenos y te responderemos a la brevedad.
            </p>

            {enviado && (
              <div className="alert alert-success alert-dismissible fade show text-center" role="alert">
                ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                <button type="button" className="btn-close" onClick={() => setEnviado(false)}></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control bg-dark text-light border-secondary"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="form-control bg-dark text-light border-secondary"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Asunto</label>
                <input
                  type="text"
                  name="asunto"
                  className="form-control bg-dark text-light border-secondary"
                  value={form.asunto}
                  onChange={handleChange}
                  placeholder="Motivo de tu mensaje"
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Mensaje</label>
                <textarea
                  name="mensaje"
                  rows="4"
                  className="form-control bg-dark text-light border-secondary"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje aquí..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-info w-100 fw-bold">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;