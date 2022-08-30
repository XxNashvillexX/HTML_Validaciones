import { valida } from "./validaciones.js";
//trae todos los inputs del HTML
const inputs = document.querySelectorAll('input');
//iteramos el array inputs
inputs.forEach( input => {
    input.addEventListener('blur', (input) => {
        valida(input.target);
    });
});
