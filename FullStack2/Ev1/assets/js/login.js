document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");
    if (!formLogin) return;

    formLogin.addEventListener("submit", (evento) => {
        evento.preventDefault(); 
        
        // Limpiamos los mensajes de error visuales anteriores
        document.querySelectorAll('.msj-error').forEach(el => el.remove());
        document.querySelectorAll('.border-danger').forEach(el => el.classList.remove('border-danger'));

        // Capturamos los inputs del HTML de Login
        const correoInput = document.getElementById("loginCorreo");
        const contrasenaInput = document.getElementById("loginContrasena");
        
        const correo = correoInput ? correoInput.value.trim() : "";
        const contrasena = contrasenaInput ? contrasenaInput.value.trim() : "";

        let hayErrores = false;

        // Función para mostrar errores debajo del input
        const mostrarError = (inputElement, mensaje) => {
            if (inputElement) {
                inputElement.insertAdjacentHTML('afterend', `<div class="text-danger small fw-bold mt-1 msj-error">⚠️ ${mensaje}</div>`);
                inputElement.classList.add("border-danger");
            }
            hayErrores = true;
        };

        // 1. Extraemos los datos que guardó el registro.js en la memoria
        const correoGuardado = localStorage.getItem("correoRegistrado");
        const claveGuardada = localStorage.getItem("claveRegistrada");

        // 2. Validamos el Correo
        if (correo === "") {
            mostrarError(correoInput, "Debes ingresar tu correo.");
        } else if (correo !== correoGuardado) {
            mostrarError(correoInput, "Este correo no existe. Por favor, regístrate primero.");
        }

        // 3. Validamos la Contraseña
        if (contrasena === "") {
            mostrarError(contrasenaInput, "Debes ingresar tu contraseña.");
        } else if (correo === correoGuardado && contrasena !== claveGuardada) {
            mostrarError(contrasenaInput, "La contraseña es incorrecta.");
        }

        // 4. Si todo está perfecto, entramos
        if (!hayErrores) {
            localStorage.setItem("sesionActiva", "true"); 
            
            alert("✅ ¡Inicio de sesión exitoso! Bienvenido de vuelta.");
            window.location.href = "productos.html"; 
        }
    });
});