document.addEventListener("DOMContentLoaded", () => {
    // 1. Capturar el parámetro de la URL
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get("id");

    if (!productoId) {
        // Si no hay ID en la URL, redirige al catálogo
        window.location.href = "productos.html";
        return;
    }

    // 2. Buscar el producto en la base de datos (CATALOGO_PRODUCTOS viene de productos.js)
    const productoEncontrado = CATALOGO_PRODUCTOS.find(
        prod => prod.codigo.toUpperCase() === productoId.toUpperCase()
    );

    if (productoEncontrado) {
        // 3. Reemplazar los textos e imagen de la plantilla
        document.getElementById("producto-nombre").innerText = productoEncontrado.nombre;
        document.getElementById("producto-precio").innerText = `$${productoEncontrado.precio.toLocaleString('es-CL')}`;
        document.getElementById("producto-imagen").src = productoEncontrado.imagen;
        document.getElementById("producto-imagen").alt = productoEncontrado.nombre;
        
        const badgeCategoria = document.getElementById("producto-categoria");
        badgeCategoria.innerText = productoEncontrado.categoria;

        // 4. Inyectar especificaciones y descripción técnica de forma dinámica
        const listaEspecificaciones = document.getElementById("producto-especificaciones");
        listaEspecificaciones.innerHTML = `
            <li class="mb-2"><strong>Código de Producto:</strong> ${productoEncontrado.codigo}</li>
            <li class="mb-2"><strong>Descripción:</strong> ${productoEncontrado.descripcion}</li>
            <li class="mb-2"><strong>Stock en Bodega:</strong> ${productoEncontrado.stock} unidades</li>
            <li class="mb-2"><strong>Garantía Oficial:</strong> 12 meses directamente en Chile</li>
        `;
    } else {
        console.error("Producto no encontrado con el código: " + productoId);
        alert("El producto seleccionado no existe en el catálogo.");
        window.location.href = "productos.html";
    }
});
