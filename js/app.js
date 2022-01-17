//variables
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
const btnReset = document.querySelector('#resetBtn');
//variables de campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//validacion de email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//eventlisteners
eventlisteners();

function eventlisteners() {
    //inicio de app y desabilitar submit
    document.addEventListener('DOMContentLoaded', inciarApp);

    //campos del form
    email.addEventListener('blur', validarFormulario); 
    asunto.addEventListener('blur', validarFormulario); 
    mensaje.addEventListener('blur', validarFormulario); 

    //enviar email //tenia puesto formulario.
    formulario.addEventListener('submit', enviarEmail);

    //boton reset
    btnReset.addEventListener('click', resetFormulario);
}


//funciones
function inciarApp() {
    //desabilitar envio hasta que se llenen todos los campos
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//validar el form
function validarFormulario(e) {

    if(e.target.value.length > 0 ) {

        //eliminar del dom el mensaje de error
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }
        

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {

        if( er.test( e.target.value )) {
            const error = document.querySelector('p.error');

            if(error) {
                error.remove();
        }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('Email no válido');
        }
    }

    if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');

    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }    
}

function enviarEmail(e) {
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //ocultar el spinner despues de un tiempo
    setTimeout(() => {
        spinner.style.display = 'none'
        //mensaje enviado correctamente

        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 3000);
    }, 2000);
}

function resetearFormulario(e) {
    formulario.reset();

    inciarApp();
}