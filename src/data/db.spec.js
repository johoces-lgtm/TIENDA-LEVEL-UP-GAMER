import { obtenerProductos, agregarProducto, eliminarProducto } from './db';

describe('Pruebas Unitarias - Módulo de Datos (db.js) con Jasmine', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('Debe inicializar y retornar la lista por defecto de productos', () => {
    const productos = obtenerProductos();
    expect(productos.length).toBeGreaterThan(0);
  });

  it('Debe agregar un nuevo producto exitosamente', () => {
    const nuevo = {
      codigo: 'TEST99',
      nombre: 'Mouse de Prueba',
      categoria: 'Mouse',
      precio: 15000,
      descripcion: 'Mouse para testing',
      imagen: 'assets/img/logitech-g502.jpg',
      stock: 5
    };

    const resultado = agregarProducto(nuevo);
    expect(resultado.exito).toBe(true);

    const productosActualizados = obtenerProductos();
    const existe = productosActualizados.some((p) => p.codigo === 'TEST99');
    expect(existe).toBe(true);
  });

  it('No debe permitir agregar un producto con un código duplicado', () => {
    const productoDuplicado = {
      codigo: 'J001', // Código que ya existe en los datos iniciales
      nombre: 'Catan Duplicado',
      categoria: 'Juegos de Mesa',
      precio: 20000,
      stock: 2
    };

    const resultado = agregarProducto(productoDuplicado);
    expect(resultado.exito).toBe(false);
    expect(resultado.mensaje).toContain('ya existe');
  });

  it('Debe eliminar un producto correctamente por su código', () => {
    const resEliminar = eliminarProducto('J001');
    expect(resEliminar.exito).toBe(true);

    const productos = obtenerProductos();
    const existe = productos.some((p) => p.codigo === 'J001');
    expect(existe).toBe(false);
  });
});