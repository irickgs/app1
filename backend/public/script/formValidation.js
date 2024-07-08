document.addEventListener("DOMContentLoaded", function () {
   const formulario = document.getElementById("form-contacto");
   const mensajeError = document.getElementById("mensajeError");
   const botonBorrar = document.querySelector("button[type='reset']");
   formulario.addEventListener('submit', validarFormulario);
   botonBorrar.addEventListener('click', limpiarMensajeError);
});

function validarFormulario(evento) {
    evento.preventDefault();
    let asunto = document.getElementById('asunto').value;
    let email = document.getElementById('email').value;
    let mensaje = document.getElementById("mensaje").value;
    let terminos = document.getElementById("terms").checked;

    if (asunto.trim() === "") {
        mensajeError.innerHTML = 'El campo asunto no puede estar vacío.';
        return;
        
    }

    if (email.trim() === '') {
        mensajeError.innerHTML = 'El campo email no puede estar vacío.';
        return;
    }

    if (!validarEmail(email)) {
        mensajeError.innerHTML = 'El formato del email no es válido.';
        return;
    }

    if (mensaje === '' || mensaje === "Tu consulta aqui...") {
        mensajeError.innerHTML = 'Debes escribir un mensaje.';
        return;
    }

    if (!terminos) {
        mensajeError.innerHTML = 'Debes aceptar los términos y condiciones.';
        return;
    }

    mensajeError.innerHTML = '';
    mensajeError.innerHTML = 'Formulario enviado con éxito!';
    formulario.submit();
}

function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function limpiarMensajeError() {
    mensajeError.innerHTML = '';
}



