document.addEventListener("DOMContentLoaded", () => {
    
    // =====================================================================
    // 1. CARGA DINÁMICA DE REGIONES Y COMUNAS
    // =====================================================================
    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    const ubicaciones = {
        "RM": ["Santiago", "Providencia", "Maipú", "Puente Alto", "Macul"],
        "V": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
        "VIII": ["Concepción", "Talcahuano", "Chiguayante", "San Pedro de la Paz"]
    };

    if (selectRegion) {
        selectRegion.innerHTML = '<option value="">-- Selecciona Región --</option>';
        for (const region in ubicaciones) {
            const option = document.createElement("option");
            option.value = region;
            option.textContent = region === "RM" ? "Región Metropolitana" : `Región ${region}`;
            selectRegion.appendChild(option);
        }
    }

    if (selectRegion && selectComuna) {
        selectRegion.addEventListener("change", (e) => {
            const regionSeleccionada = e.target.value;
            selectComuna.innerHTML = '<option value="">-- Selecciona Comuna --</option>';
            
            if (regionSeleccionada && ubicaciones[regionSeleccionada]) {
                ubicaciones[regionSeleccionada].forEach(comuna => {
                    const option = document.createElement("option");
                    option.value = comuna;
                    option.textContent = comuna;
                    selectComuna.appendChild(option);
                });
            }
        });
    }

    // =====================================================================
    // 2. VALIDACIONES AL SALIR DEL CAMPO (Evento 'blur')[cite: 4]
    // =====================================================================
    const inputRun = document.getElementById("run");
    const errorRun = document.getElementById("error-run");
    const inputCorreo = document.getElementById("correo");
    const errorCorreo = document.getElementById("error-correo");
    const inputContrasena = document.getElementById("contrasena");
    const errorContrasena = document.getElementById("error-contrasena");

    // Función optimizada para inyectar o quitar el error visualmente
    const toggleErrorVisual = (input, errorSpan, mensaje, conError) => {
        if (conError) {
            errorSpan.textContent = mensaje;
            errorSpan.style.display = "block";
            input.classList.add("border-danger");
            input.classList.remove("border-secondary");
        } else {
            errorSpan.style.display = "none";
            input.classList.remove("border-danger");
            input.classList.add("border-secondary");
        }
    };

    // 2.1 Validación de RUN al salir de la casilla
    if (inputRun) {
        inputRun.addEventListener("blur", () => { 
            const runValue = inputRun.value.trim();
            const runRegex = /^\d{7,8}[0-9kK]$/;
            const tieneError = runValue.length > 0 && !runRegex.test(runValue);
            
            toggleErrorVisual(inputRun, errorRun, "Formato inválido. Escribe de 7 a 9 caracteres sin puntos ni guiones.", tieneError);
        });
    }

    // 2.2 Validación de Correo al salir de la casilla
    if (inputCorreo) {
        inputCorreo.addEventListener("blur", () => {
            const correoValue = inputCorreo.value.trim();
            const correoValido = correoValue.endsWith("@duoc.cl") || correoValue.endsWith("@profesor.duoc.cl") || correoValue.endsWith("@gmail.com");
            const tieneError = correoValue.length > 0 && !correoValido;
            
            toggleErrorVisual(inputCorreo, errorCorreo, "Usa un dominio permitido (@duoc.cl, @profesor.duoc.cl o @gmail.com).", tieneError);
        });
    }

    // 2.3 Validación de Contraseña al salir de la casilla
    if (inputContrasena) {
        inputContrasena.addEventListener("blur", () => {
            const pass = inputContrasena.value;
            const reglasCumplidas = pass.length >= 8 && /[A-Z]/.test(pass) && /[a-z]/.test(pass) && /\d/.test(pass) && /[!@#$%^&*(),.?":{}|<>]/.test(pass);
            const tieneError = pass.length > 0 && !reglasCumplidas;
            
            toggleErrorVisual(inputContrasena, errorContrasena, "Debe tener al menos 8 caracteres, mayúsculas, minúsculas, números y un carácter especial.", tieneError);
        });
    }

    // 2.4 Validación de Confirmar Contraseña al salir de la casilla
    const inputConfirmar = document.getElementById("confirmarContrasena");
    const errorConfirmar = document.getElementById("error-confirmarContrasena");

    if (inputConfirmar && inputContrasena) {
        inputConfirmar.addEventListener("blur", () => {
            const pass = inputContrasena.value;
            const confirmPass = inputConfirmar.value;
            
            // Evaluamos si el usuario escribió algo y si ambas contraseñas son diferentes
            const tieneError = confirmPass.length > 0 && pass !== confirmPass;
            
            toggleErrorVisual(inputConfirmar, errorConfirmar, "Las contraseñas no coinciden.", tieneError);
        });
    }

    // =====================================================================
    // 3. VALIDACIÓN DEL FORMULARIO AL ENVIAR
    // =====================================================================
    const formulario = document.getElementById("formRegistro");
    if (!formulario) return;

    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Previene que la página se recargue inmediatamente
        let formularioValido = true;

        // Captura de todos los datos requeridos por la pauta
        const run = document.getElementById("run").value.trim(); 
        const nombre = document.getElementById("nombre").value.trim(); 
        const apellidos = document.getElementById("apellidos").value.trim(); 
        const correo = document.getElementById("correo").value.trim(); 
        const contrasena = document.getElementById("contrasena").value;
        const confirmarContrasena = document.getElementById("confirmarContrasena").value;
        const fechaNac = document.getElementById("txtFechaNac").value;
        const region = document.getElementById("region").value;
        const comuna = document.getElementById("comuna").value;

        // Función de ayuda para inyectar errores en el HTML sin congelar la pantalla
        const mostrarError = (inputId, errorId, mensaje) => {
            const errorSpan = document.getElementById(errorId);
            const inputEl = document.getElementById(inputId);
            if (errorSpan) {
                errorSpan.textContent = mensaje;
                errorSpan.style.display = "block";
            }
            if (inputEl) {
                inputEl.classList.add("border-danger");
                inputEl.classList.remove("border-secondary");
            }
            formularioValido = false;
        };

        const ocultarError = (inputId, errorId) => {
            const errorSpan = document.getElementById(errorId);
            const inputEl = document.getElementById(inputId);
            if (errorSpan) errorSpan.style.display = "none";
            if (inputEl) {
                inputEl.classList.remove("border-danger");
                inputEl.classList.add("border-secondary");
            }
        };

        // 1. Validar RUN: Min 7, Max 9 caracteres, sin puntos ni guion
        const runRegex = /^\d{7,8}[0-9kK]$/;
        if (!runRegex.test(run) || run.length < 7 || run.length > 9) {
            mostrarError("run", "error-run", "Ingresa un RUN válido (7 a 9 caracteres sin puntos ni guion).");
        } else {
            ocultarError("run", "error-run");
        }

        // 2. Validar Nombre: Obligatorio y máximo 50 caracteres
        if (nombre === "" || nombre.length > 50) {
            mostrarError("nombre", "error-nombre", "El nombre es requerido y no debe superar los 50 caracteres.");
        } else {
            ocultarError("nombre", "error-nombre");
        }

        // 3. Validar Apellidos: Obligatorio y máximo 100 caracteres
        if (apellidos === "" || apellidos.length > 100) {
            mostrarError("apellidos", "error-apellidos", "Los apellidos son requeridos y no deben superar los 100 caracteres.");
        } else {
            ocultarError("apellidos", "error-apellidos");
        }

        // 4. Validar Correo: Máximo 100 caracteres y dominios específicos 
        const correoValido = correo.endsWith("@duoc.cl") || correo.endsWith("@profesor.duoc.cl") || correo.endsWith("@gmail.com");
        if (correo === "" || correo.length > 100 || !correoValido) {
            mostrarError("correo", "error-correo", "Dominio inválido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com (Max 100 caracteres).");
        } else {
            ocultarError("correo", "error-correo");
        }

        // 5. Validar Edad (+18)
        if (!fechaNac) {
            mostrarError("txtFechaNac", "error-fecha", "Debes ingresar tu fecha de nacimiento.");
        } else {
            const hoy = new Date();
            const nacimiento = new Date(fechaNac);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mes = hoy.getMonth() - nacimiento.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            if (edad < 18) {
                mostrarError("txtFechaNac", "error-fecha", "Debes ser mayor de 18 años para registrarte.");
            } else {
                ocultarError("txtFechaNac", "error-fecha");
            }
        }

        // 6. Validar Ubicación
        if (region === "" || comuna === "") {
            mostrarError("region", "error-ubicacion", "Debes seleccionar tu región y comuna.");
            mostrarError("comuna", "error-ubicacion", "");
        } else {
            ocultarError("region", "error-ubicacion");
            ocultarError("comuna", "error-ubicacion");
        }

        // 7. Validar Contraseña: Mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial
        if (contrasena.length < 8 || !/[A-Z]/.test(contrasena) || !/[a-z]/.test(contrasena) || !/\d/.test(contrasena) || !/[!@#$%^&*(),.?":{}|<>]/.test(contrasena)) {
            mostrarError("contrasena", "error-contrasena", "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial.");
        } else {
            ocultarError("contrasena", "error-contrasena");
        }

        // 8. Validar Confirmación de Contraseña
        if (contrasena !== confirmarContrasena) {
            mostrarError("confirmarContrasena", "error-confirmarContrasena", "Las contraseñas no coinciden.");
        } else {
            ocultarError("confirmarContrasena", "error-confirmarContrasena");
        }

        // Si el formulario contiene errores, se detiene la ejecución y se evitan los pop-ups que congelan la web
        if (!formularioValido) {
            return;
        }

        // Reglas de Negocio exitosas
        if (correo.endsWith("@duoc.cl") || correo.endsWith("@profesor.duoc.cl")) {
            alert("¡Felicidades! Al registrarte con tu correo institucional de Duoc UC, has obtenido un 20% de descuento de por vida.");
        } else {
            alert("¡Socio registrado exitosamente!");
        }

        formulario.reset();
        selectComuna.innerHTML = '<option value="">-- Selecciona Comuna --</option>';
        window.location.href = "login.html";
    });

    // =====================================================================
    // 4. PREVISUALIZACIÓN DE CONTRASEÑAS (Toggle del Ojito)
    // =====================================================================
    const activarOjito = (botonId, inputId) => {
        const boton = document.getElementById(botonId);
        const input = document.getElementById(inputId);

        if (boton && input) {
            boton.addEventListener("click", () => {
                // Alternar entre password y text
                const tipoActual = input.getAttribute("type");
                const nuevoTipo = tipoActual === "password" ? "text" : "password";
                input.setAttribute("type", nuevoTipo);
                
                // Cambiar el color del botón para dar feedback visual de que está activo
                if (nuevoTipo === "text") {
                    boton.classList.add("text-info", "border-info");
                    boton.classList.remove("border-secondary");
                } else {
                    boton.classList.remove("text-info", "border-info");
                    boton.classList.add("border-secondary");
                }
            });
        }
    };

    // Inicializamos la función para ambas cajas de texto
    activarOjito("btn-ojito-contrasena", "contrasena");
    activarOjito("btn-ojito-confirmar", "confirmarContrasena");
});