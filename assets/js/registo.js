document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formRegistro");
    if (!formulario) return;

    // 1. DICCIONARIO DE REGIONES Y COMUNAS
    const datosGeograficos = {
        "RM": { nombre: "Región Metropolitana", comunas: ["Santiago", "Puente Alto", "Maipú", "La Florida"] },
        "V": { nombre: "Región de Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
        "VIII": { nombre: "Región del Biobío", comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz"] }
    };

    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    // Llenar Regiones
    selectRegion.innerHTML = '<option value="">-- Selecciona Región --</option>';
    for (const clave in datosGeograficos) {
        selectRegion.innerHTML += `<option value="${clave}">${datosGeograficos[clave].nombre}</option>`;
    }

    // Llenar Comunas al cambiar la Región
    selectRegion.addEventListener("change", (e) => {
        selectComuna.innerHTML = '<option value="">-- Selecciona Comuna --</option>';
        const regionSeleccionada = e.target.value;
        if (datosGeograficos[regionSeleccionada]) {
            datosGeograficos[regionSeleccionada].comunas.forEach(comuna => {
                selectComuna.innerHTML += `<option value="${comuna}">${comuna}</option>`;
            });
        }
    });

    // 2. FORZAR FORMATO DEL RUT (Solo números y K)
    const inputRun = document.getElementById("run");
    inputRun.addEventListener("input", function() {
        this.value = this.value.toUpperCase().replace(/[^0-9K]/g, '');
    });

    // 3. VALIDACIÓN AL ENVIAR
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault(); 
        
        // Limpiar mensajes rojos anteriores
        document.querySelectorAll('.msj-error').forEach(e => e.remove());

        const fechaNacimiento = document.getElementById("fechaNacimiento");
        const contrasena = document.getElementById("contrasena");
        const confirmarContrasena = document.getElementById("confirmarContrasena");
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();

        let hayErrores = false;

        // Función auxiliar para inyectar texto rojo
        const mostrarError = (inputElement, mensaje) => {
            inputElement.insertAdjacentHTML('afterend', `<div class="text-danger small fw-bold mt-1 msj-error">${mensaje}</div>`);
            hayErrores = true;
        };

        // Validar Fecha (Que exista y no sea futura)
        const fechaIngresada = new Date(fechaNacimiento.value);
        const fechaActual = new Date();
        if (!fechaNacimiento.value || fechaIngresada >= fechaActual || fechaIngresada.getFullYear() < 1900) {
            mostrarError(fechaNacimiento, "Fecha de nacimiento inválida.");
        }

        // Validar Contraseñas
        if (contrasena.value.length < 6) {
            mostrarError(contrasena, "Mínimo 6 caracteres.");
        }
        if (contrasena.value !== confirmarContrasena.value) {
            mostrarError(confirmarContrasena, "Las contraseñas no coinciden.");
        }

        // Si todo está bien, mensaje de éxito global
        if (!hayErrores) {
            alert(`✅ ¡Registro exitoso, ${nombre}!\n${correo.includes("@duoc.cl") ? "Descuento del 20% aplicado." : ""}`);
            formulario.reset();
            selectComuna.innerHTML = '<option value="">-- Selecciona Comuna --</option>'; // Resetear comunas
        }
    });
});