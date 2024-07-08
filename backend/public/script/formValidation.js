document.addEventListener("DOMContentLoaded", () => 
{
   const crearUsuarioForm = document.getElementById('form-contacto');// formulario para crear usuarios
//   const checkbox = document.getElementById('acepta');
//   const hiddenInput = document.createElement('input');
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
    let terminos = document.getElementById("acepta").checked;

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

//hiddenInput.type = 'hidden';
//hiddenInput.name = 'acepta'; // Nombre del campo en el formulario
//form.appendChild(hiddenInput);
//hiddenInput.value = checkbox.checked ? '1' : '0';

    //CREAR USUARIOS NUEVOS
    crearUsuarioForm.addEventListener('submit', async (e) => 
    {
        e.preventDefault();//evita qaue la pagina se actualice

        const formData = new FormData(crearUsuarioForm);

        const data = 
        {
            asunto: formData.get('asunto'),
            nombre: formData.get('nombre'),
            fk_id_ciudad: formData.get('fk_id_ciudad'),
            email: formData.get('email')
            mensaje: formData.get('mensaje')
            acepta: formData.get('acepta')
            
        };

        const response = await fetch('http://localhost:3000/usuarios',
        {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        alert(result.message);
        crearUsuarioForm.reset();
        crearUsuarioForm.classList.add('hidden');
        listarUsuarios();
    });


/*

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('form-contacto');
    const mensajeError = document.getElementById('mensajeError');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

        // Validación del formulario antes de enviarlo
        if (validarFormulario()) {
            // Si la validación es exitosa, procede a enviar los datos usando fetch
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => {
                if (response.ok) {
                    // Aquí podrías mostrar un mensaje de éxito
                    mensajeError.innerHTML = 'Formulario enviado exitosamente';
                    console.log('Formulario enviado exitosamente');
                    form.reset(); // Opcional: reiniciar el formulario después de un envío exitoso
                } else {
                    // Aquí podrías manejar errores de respuesta del servidor
                    mensajeError.innerHTML = 'Error al enviar el formulario';
                    console.error('Error al enviar el formulario');
                }
            })
            .catch(error => {
                // Captura de errores de red o errores de JavaScript
                mensajeError.innerHTML = 'Error en la solicitud';
                console.error('Error en la solicitud:', error);
            });
        }
    });

    // Función para validar el formulario
    function validarFormulario() {
        let asunto = document.getElementById('asunto').value;
        let email = document.getElementById('email').value;
        let mensaje = document.getElementById('mensaje').value;
        let terminos = document.getElementById('acepta').checked;

        if (asunto.trim() === "") {
            mensajeError.innerHTML = 'El campo asunto no puede estar vacío.';
            return false;
        }

        if (email.trim() === '') {
            mensajeError.innerHTML = 'El campo email no puede estar vacío.';
            return false;
        }

        if (!validarEmail(email)) {
            mensajeError.innerHTML = 'El formato del email no es válido.';
            return false;
        }

        if (mensaje === '' || mensaje === "Ingresá tu consulta aquí...") {
            mensajeError.innerHTML = 'Debes escribir un mensaje.';
            return false;
        }

        if (!terminos) {
            mensajeError.innerHTML = 'Debes aceptar los términos y condiciones.';
            return false;
        }

        // Si pasa todas las validaciones
        mensajeError.innerHTML = '';
        return true;
    }

    // Función para validar el formato del email
    function validarEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});

*/