document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get("id");

    if (!productoId) {
        window.location.href = "productos.html";
        return;
    }

    if (typeof CATALOGO_PRODUCTOS === "undefined") {
        console.error("La base de datos de productos no está definida.");
        return;
    }

    const producto = CATALOGO_PRODUCTOS.find(p => p.codigo.toUpperCase() === productoId.toUpperCase());

    if (producto) {
        document.getElementById("producto-imagen").src = producto.imagen;
        document.getElementById("producto-imagen").alt = producto.nombre;
        document.getElementById("producto-categoria").innerText = producto.categoria;
        document.getElementById("producto-nombre").innerText = producto.nombre;
        
        document.getElementById("producto-precio").innerText = `$${producto.precio.toLocaleString('es-CL')}`;

        const especificaciones = document.getElementById("producto-specifications");
        if (especificaciones) {
            especificaciones.innerHTML = `
                <li class="mb-2"><strong>Código único:</strong> ${producto.codigo}</li>
                <li class="mb-2"><strong>Descripción:</strong> ${producto.descripcion}</li>
                <li class="mb-2"><strong>Unidades Disponibles:</strong> ${producto.stock} unidades</li>
                <li class="mb-2"><strong>Garantía:</strong> 12 meses directamente con Level-Up</li>
            `;
        }
    } else {
        alert("¡Error! El producto buscado no existe.");
        window.location.href = "productos.html";
    }
});