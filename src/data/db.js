/**
 * src/data/db.js - Base de Datos Centralizada con LocalStorage
 */

const PRODUCTOS_INICIALES = [
  {
    codigo: "J001",
    categoria: "Juegos de Mesa",
    nombre: "Catan",
    precio: 29990,
    descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar la isla de Catan.",
    imagen: "assets/img/catan.jpg",
    stock: 15
  },
  {
    codigo: "J002",
    categoria: "Juegos de Mesa",
    nombre: "Carcassonne",
    precio: 24990,
    descripcion: "Un juego de colocación de fichas donde los jugadores construyen el paisaje medieval.",
    imagen: "assets/img/carcassonne.jpg",
    stock: 8
  },
  {
    codigo: "A001",
    categoria: "Accesorios",
    nombre: "Control Xbox Series X",
    precio: 59990,
    descripcion: "Control inalámbrico ergonométrico con agarre texturizado y alta sensibilidad.",
    imagen: "assets/img/control-xbox.jpg",
    stock: 20
  },
  {
    codigo: "A002",
    categoria: "Accesorios",
    nombre: "Auriculares HyperX Cloud II",
    precio: 79990,
    descripcion: "Auriculares gamer con sonido envolvente 7.1 y micrófono cancelador de ruido.",
    imagen: "assets/img/hyperx-cloud2.jpg",
    stock: 12
  },
  {
    codigo: "CO001",
    categoria: "Consolas",
    nombre: "PlayStation 5",
    precio: 549900,
    descripcion: "Consola de última generación con tiempos de carga ultra rápidos y SSD.",
    imagen: "assets/img/ps5.jpg",
    stock: 5
  },
  {
    codigo: "CP001",
    categoria: "Computadores Gamer",
    nombre: "PC Gamer ASUS ROG Strix",
    precio: 1299900,
    descripcion: "Rendimiento extremo para juegos competitivos y tareas exigentes.",
    imagen: "assets/img/pc-asus.jpg",
    stock: 3
  },
  {
    codigo: "SG001",
    categoria: "Sillas Gamers",
    nombre: "Silla Gamer Secretlab Titan",
    precio: 349900,
    descripcion: "Diseñada para brindar soporte ergonómico inigualable durante largas sesiones.",
    imagen: "assets/img/silla-secretlab.jpg",
    stock: 4
  },
  {
    codigo: "MS001",
    categoria: "Mouse",
    nombre: "Mouse Logitech G502 HERO",
    precio: 49990,
    descripcion: "Sensor óptico de alta precisión HERO 25K con pesas ajustables.",
    imagen: "assets/img/logitech-g502.jpg",
    stock: 15
  },
  {
    codigo: "MP001",
    categoria: "Mousepad",
    nombre: "Mousepad Razer Goliathus",
    precio: 29990,
    descripcion: "Área de juego amplia con superficie textil y bordes iluminados.",
    imagen: "assets/img/razer-goliathus.jpg",
    stock: 25
  },
  {
    codigo: "PO001",
    categoria: "Poleras Personalizadas",
    nombre: "Polera Gamer Level-Up",
    precio: 14990,
    descripcion: "Camiseta de algodón cómoda y estilizada con estampado gamer.",
    imagen: "assets/img/polera-levelup.jpg",
    stock: 50
  }
];

const DB_KEY = "productos_levelup";

export const inicializarDB = () => {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(PRODUCTOS_INICIALES));
  }
};

export const obtenerProductos = () => {
  inicializarDB();
  const datos = localStorage.getItem(DB_KEY);
  return datos ? JSON.parse(datos) : [];
};

export const obtenerProductoPorCodigo = (codigo) => {
  if (!codigo) return null;
  const productos = obtenerProductos();
  return productos.find((p) => p.codigo.toUpperCase() === codigo.toUpperCase()) || null;
};

export const agregarProducto = (nuevoProducto) => {
  const productos = obtenerProductos();
  const existe = productos.some((p) => p.codigo.toUpperCase() === nuevoProducto.codigo.toUpperCase());

  if (existe) {
    return { exito: false, mensaje: "El código de producto ya existe." };
  }

  const actualizados = [...productos, nuevoProducto];
  localStorage.setItem(DB_KEY, JSON.stringify(actualizados));
  return { exito: true, mensaje: "Producto agregado con éxito." };
};

export const actualizarProducto = (productoEditado) => {
  const productos = obtenerProductos();
  const indice = productos.findIndex((p) => p.codigo.toUpperCase() === productoEditado.codigo.toUpperCase());

  if (indice === -1) {
    return { exito: false, mensaje: "Producto no encontrado." };
  }

  productos[indice] = productoEditado;
  localStorage.setItem(DB_KEY, JSON.stringify(productos));
  return { exito: true, mensaje: "Producto actualizado correctamente." };
};

export const eliminarProducto = (codigo) => {
  const productos = obtenerProductos();
  const filtrados = productos.filter((p) => p.codigo.toUpperCase() !== codigo.toUpperCase());

  if (productos.length === filtrados.length) {
    return { exito: false, mensaje: "Producto no encontrado." };
  }

  localStorage.setItem(DB_KEY, JSON.stringify(filtrados));
  return { exito: true, mensaje: "Producto eliminado correctamente." };
};