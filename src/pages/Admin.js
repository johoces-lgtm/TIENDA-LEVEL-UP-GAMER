import React, { useState, useEffect } from 'react';
import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } from '../data/db';

export const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });

  const [form, setForm] = useState({
    codigo: '',
    categoria: 'Juegos de Mesa',
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: 'assets/img/',
    stock: ''
  });

  const cargarProductos = () => {
    setProductos(obtenerProductos());
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEditar = (prod) => {
    setEditando(prod.codigo);
    setForm({
      codigo: prod.codigo,
      categoria: prod.categoria,
      nombre: prod.nombre,
      precio: prod.precio,
      descripcion: prod.descripcion,
      imagen: prod.imagen,
      stock: prod.stock
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelar = () => {
    setEditando(null);
    setForm({
      codigo: '',
      categoria: 'Juegos de Mesa',
      nombre: '',
      precio: '',
      descripcion: '',
      imagen: 'assets/img/',
      stock: ''
    });
  };

  const handleEliminar = (codigo) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto ${codigo}?`)) {
      const res = eliminarProducto(codigo);
      if (res.exito) {
        setAlerta({ tipo: 'success', mensaje: res.mensaje });
        cargarProductos();
      } else {
        setAlerta({ tipo: 'danger', mensaje: res.mensaje });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.codigo.trim() || !form.nombre.trim() || !form.precio || !form.stock) {
      setAlerta({ tipo: 'warning', mensaje: 'Por favor completa todos los campos requeridos.' });
      return;
    }

    const productoData = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock)
    };

    if (editando) {
      const res = actualizarProducto(productoData);
      if (res.exito) {
        setAlerta({ tipo: 'success', mensaje: res.mensaje });
        handleCancelar();
        cargarProductos();
      } else {
        setAlerta({ tipo: 'danger', mensaje: res.mensaje });
      }
    } else {
      const res = agregarProducto(productoData);
      if (res.exito) {
        setAlerta({ tipo: 'success', mensaje: res.mensaje });
        handleCancelar();
        cargarProductos();
      } else {
        setAlerta({ tipo: 'danger', mensaje: res.mensaje });
      }
    }
  };

  return (
    <div className="container my-5 text-light flex-grow-1">
      <h2 className="text-warning fw-bold mb-4">⚙️ Panel de Administración</h2>

      {alerta.mensaje && (
        <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
          {alerta.mensaje}
          <button type="button" className="btn-close" onClick={() => setAlerta({ tipo: '', mensaje: '' })}></button>
        </div>
      )}

      {/* Formulario Crear / Editar */}
      <div className="card bg-dark border-secondary p-4 mb-5 shadow-sm">
        <h4 className="text-info fw-bold mb-3">
          {editando ? `✏️ Editar Producto (${editando})` : '➕ Agregar Nuevo Producto'}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label text-light fw-bold">Código</label>
              <input
                type="text"
                name="codigo"
                className="form-control bg-dark text-light border-secondary"
                value={form.codigo}
                onChange={handleChange}
                disabled={editando !== null}
                placeholder="Ej: J003"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label text-light fw-bold">Categoría</label>
              <select
                name="categoria"
                className="form-select bg-dark text-light border-secondary"
                value={form.categoria}
                onChange={handleChange}
              >
                <option value="Juegos de Mesa">Juegos de Mesa</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Consolas">Consolas</option>
                <option value="Computadores Gamer">Computadores Gamer</option>
                <option value="Sillas Gamers">Sillas Gamers</option>
                <option value="Mouse">Mouse</option>
                <option value="Mousepad">Mousepad</option>
                <option value="Poleras Personalizadas">Poleras Personalizadas</option>
              </select>
            </div>

            <div className="col-md-5">
              <label className="form-label text-light fw-bold">Nombre del Producto</label>
              <input
                type="text"
                name="nombre"
                className="form-control bg-dark text-light border-secondary"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Teclado Mecánico RGB"
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label text-light fw-bold">Precio (CLP)</label>
              <input
                type="number"
                name="precio"
                className="form-control bg-dark text-light border-secondary"
                value={form.precio}
                onChange={handleChange}
                min="1"
                placeholder="49990"
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label text-light fw-bold">Stock</label>
              <input
                type="number"
                name="stock"
                className="form-control bg-dark text-light border-secondary"
                value={form.stock}
                onChange={handleChange}
                min="0"
                placeholder="10"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-light fw-bold">Ruta de Imagen</label>
              <input
                type="text"
                name="imagen"
                className="form-control bg-dark text-light border-secondary"
                value={form.imagen}
                onChange={handleChange}
                placeholder="assets/img/nombre.jpg"
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label text-light fw-bold">Descripción</label>
              <textarea
                name="descripcion"
                rows="2"
                className="form-control bg-dark text-light border-secondary"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción detallada del producto..."
              ></textarea>
            </div>

            <div className="col-12 d-flex gap-2 justify-content-end">
              {editando && (
                <button type="button" className="btn btn-outline-secondary" onClick={handleCancelar}>
                  Cancelar
                </button>
              )}
              <button type="submit" className={`btn ${editando ? 'btn-warning' : 'btn-info'} fw-bold`}>
                {editando ? 'Guardar Cambios' : 'Agregar Producto'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Tabla de Productos */}
      <h4 className="text-info fw-bold mb-3">📋 Inventario Actual</h4>
      <div className="table-responsive bg-dark p-3 rounded border border-secondary">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead className="table-secondary">
            <tr>
              <th>Código</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.codigo}>
                <td className="fw-bold text-info">{prod.codigo}</td>
                <td>
                  <img
                    src={process.env.PUBLIC_URL + '/' + prod.imagen}
                    alt={prod.nombre}
                    style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                    className="rounded"
                  />
                </td>
                <td className="fw-semibold">{prod.nombre}</td>
                <td><span className="badge bg-secondary">{prod.categoria}</span></td>
                <td>${prod.precio.toLocaleString('es-CL')} CLP</td>
                <td>{prod.stock}</td>
                <td className="text-center">
                  <div className="btn-group btn-group-sm" role="group">
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => handleEditar(prod)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleEliminar(prod.codigo)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;