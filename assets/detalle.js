document.addEventListener("DOMContentLoaded", () => {
    // 1. Capturar el parámetro de la URL
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get("id");

    // 2. Vincular los elementos exactos del HTML
    const txtNombre = document.getElementById("producto-nombre");
    const txtPrecio = document.getElementById("producto-precio");
    const txtCategoria = document.getElementById("producto-categoria");
    const imgProducto = document.getElementById("producto-imagen");
    const listaEspecificaciones = document.getElementById("producto-especificaciones");

    // 3. Buscar el producto en el catálogo
    const productoEncontrado = CATALOGO_PRODUCTOS.find(p => p.codigo === productoId);

    if (productoEncontrado) {
        // 4. Inyectar datos básicos
        if (txtNombre) txtNombre.textContent = productoEncontrado.nombre;
        if (txtCategoria) txtCategoria.textContent = productoEncontrado.categoria;
        
        if (imgProducto) {
            imgProducto.src = productoEncontrado.imagen;
            imgProducto.alt = productoEncontrado.nombre;
        }

        // Formatear precio a CLP sin decimales
        if (txtPrecio) {
            txtPrecio.textContent = new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: 'CLP',
                maximumFractionDigits: 0
            }).format(productoEncontrado.precio);
        }

        // 5. Inyectar detalles faltantes dentro de la lista <ul>
        if (listaEspecificaciones) {
            listaEspecificaciones.innerHTML = `
                <li class="mb-2"><strong>Código:</strong> ${productoEncontrado.codigo}</li>
                <li class="mb-2"><strong>Descripción:</strong> ${productoEncontrado.descripcion}</li>
                <li class="mb-2"><strong>Stock:</strong> ${productoEncontrado.stock} unidades</li>
            `;
        }

        // 6. Validar regla de negocio: Alerta de stock crítico (<= 5)
        if (productoEncontrado.stock <= 5 && listaEspecificaciones) {
            const alertaStock = document.createElement("div");
            alertaStock.className = "alert alert-danger fw-bold mt-3";
            alertaStock.innerHTML = `⚠️ ¡Atención! Solo quedan ${productoEncontrado.stock} unidades en stock.`;
            
            // Insertar la alerta justo después de la lista de especificaciones
            listaEspecificaciones.insertAdjacentElement('afterend', alertaStock);
        }

    } else {
        // 7. Manejo de error si el ID no existe en el catálogo
        if (txtNombre) txtNombre.textContent = "Error 404: Producto no encontrado";
        if (txtCategoria) txtCategoria.textContent = "Desconocido";
        if (txtPrecio) txtPrecio.textContent = "$0";
        if (listaEspecificaciones) {
            listaEspecificaciones.innerHTML = `
                <li class="text-danger fw-bold">El producto solicitado no existe en nuestro catálogo.</li>
            `;
        }
    }
});