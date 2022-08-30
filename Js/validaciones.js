//mehorando la topa del elemento HTML
export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    //verificando que el input este validado
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        //seleccionamos un elemento HTML por su class, si no hay error vaciamos el string
        input.parentElement.querySelector('.input-message-error').innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        //si da error; por medio de una funcion le agregamos el error dependiendo del tipo de input
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput,input);
    }
};
//variable que conserva el tipo de error; contenido en un array
const tipoDeErorres = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

//variable que contiene errores, data-tipo
const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula,una letra mayúscula, un número y no puede contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "El campo fecha no puede estar vacío",
        customError: "Debés tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo número no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
    },
    direccion: {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",
    },
    provincias: {
        valueMissing: "El campo provincia no puede estar vacío",
        patternMismatch: "La provincia debe contener entre 10 a 40 caracteres",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

//VALIDACIONES
function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje = "";
    //creamo un foreach para recorrer el array y por cada tipo de error asignar un error correspondiente
    tipoDeErorres.forEach((error) => {
        if(input.validity[error]) {
            console.log(tipoDeInput,error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
};

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)) {
        mensaje = "Debés tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    
    return(diferenciaFechas <= fechaActual);
};