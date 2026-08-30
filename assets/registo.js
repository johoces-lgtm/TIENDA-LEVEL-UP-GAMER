document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formRegistro");
    if (!formulario) return;

    // 1. DICCIONARIO DE REGIONES
    const datosGeograficos = {
        "RM": { nombre: "Región Metropolitana", comunas: ["Santiago", "Puente Alto", "Maipú", "La Florida", "San Bernardo", "Las Condes"] },
        "V": { nombre: "Región de Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"] },
        "VIII": { nombre: "Región del Biobío", comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante"] }
    };

    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    selectRegion.innerHTML = '<option value="">-- Selecciona Región --</option>';
    for (const clave in datosGeograficos) {
        selectRegion.innerHTML += `<option value="${clave}">${datosGeograficos[clave].nombre}</option>`;
    }

    selectRegion.addEventListener("change", (e) => {
        selectComuna.innerHTML = '<option value="">-- Selecciona Comuna --</option>';
        const regionSeleccionada = e.target.value;
        if (datosGeograficos[regionSeleccionada]) {
            datosGeograficos[regionSeleccionada].comunas.forEach(comuna => {
                selectComuna.innerHTML += `<option value="${comuna}">${comuna}</option>`;
            });
        }
    });

    // 2. BLOQUEO DE FECHA (Evita años de 5 dígitos y fechas absurdas)
    const inputFecha = document.getElementById("fechaNacimiento");
    if (inputFecha) {
        const hoy = new Date().toISOString().split("T")[0]; // Fecha actual
        inputFecha.setAttribute("max", hoy);
        inputFecha.setAttribute("min", "1900-01-01"); // Mínimo año 1900
    }

    // 3. FILTRO DE RUT
    const inputRun = document.getElementById("run");
    if (inputRun) {
        inputRun.setAttribute("maxlength", "9");
        inputRun.addEventListener("input", function() {
            this.value = this.value.toUpperCase().replace(/[^0-9K]/g, '');
        });
    }

    // 4. VALIDACIONES AL ENVIAR
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault(); 
        
        document.querySelectorAll('.msj-error').forEach(el => el.remove());

        const run = document.getElementById("run");
        const contrasena = document.getElementById("contrasena");
        const confirmarContrasena = document.getElementById("confirmarContrasena");
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();

        let hayErrores = false;

        const mostrarError = (inputElement, mensaje) => {
            inputElement.insertAdjacentHTML('afterend', `<div class="text-danger small fw-bold mt-1 msj-error">⚠️ ${mensaje}</div>`);
            hayErrores = true;
        };

        if (run.value.length < 8) {
            mostrarError(run, "RUT incompleto (mínimo 8 caracteres).");
        }

        // Validación de fecha inválida en rojo
        const anioIngresado = new Date(inputFecha.value).getFullYear();
        const anioActual = new Date().getFullYear();
        if (!inputFecha.value || anioIngresado < 1900 || anioIngresado > anioActual) {
            mostrarError(inputFecha, "Fecha de nacimiento inválida.");
        }

        // Validación de contraseñas en rojo
        if (contrasena.value.length < 6) {
            mostrarError(contrasena, "Mínimo 6 caracteres.");
        }
        if (contrasena.value !== confirmarContrasena.value) {
            mostrarError(confirmarContrasena, "Las contraseñas no coinciden.");
        }

        if (!hayErrores) {
            let mensajeExito = `✅ ¡Registro exitoso! Bienvenido, ${nombre}.`;
            if (correo.includes("@duoc.cl")) {
                mensajeExito += "\n🎓 ¡Se ha activado tu 20% de descuento Duoc!";
            }
            alert(mensajeExito);
            formulario.reset();
            selectComuna.innerHTML = '<option value="">-- Selecciona Comuna --</option>';
        }
    });
});