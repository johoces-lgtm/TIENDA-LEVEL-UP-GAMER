document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) {
        console.error("No se encontró el contenedor con ID 'contenedor-productos'");
        return;
    }
    if (typeof CATALOGO_PRODUCTOS === "undefined") {
        console.error("La base de datos CATALOGO_PRODUCTOS no está cargada.");
        return;
    }

    contenedor.innerHTML = ""; // Limpiamos cargando...

    CATALOGO_PRODUCTOS.forEach(producto => {
        // Envolvemos TODO el HTML en comillas invertidas (backticks)
        contenedor.innerHTML += `
            <div class="col-12 col-md-4">
                <div class="card bg-dark text-light border-secondary h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 250px; object-fit: cover;">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <span class="badge bg-info text-dark mb-2">${producto.categoria}</span>
                            <h5 class="card-title fw-bold text-white">${producto.nombre}</h5>
                            <p class="card-text text-secondary small">${producto.descripcion.substring(0, 95)}...</p>
                        </div>
                        <div class="mt-3">
                            <p class="fs-5 fw-bold text-info">$${producto.precio.toLocaleString('es-CL')} CLP</p>
                            <a href="detalle-producto.html?id=${producto.codigo}" class="btn btn-outline-info btn-sm w-100 mt-2">Ver Detalles</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
});