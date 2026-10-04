export { obtenerProductos, obtenerProductoPorCodigo } from './db';

export const getProductos = () => {
  return obtenerProductos();
};

export const getProductoById = (codigo) => {
  return obtenerProductoPorCodigo(codigo);
};

export const getProductosPorCategoria = (categoria) => {
  const productos = obtenerProductos();
  if (!categoria || categoria === "Todos") return productos;
  return productos.filter((p) => p.categoria === categoria);
};