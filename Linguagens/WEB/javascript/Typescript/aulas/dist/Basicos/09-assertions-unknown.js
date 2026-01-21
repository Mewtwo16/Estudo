"use strict";
// 09 - Assertions e Unknown
Object.defineProperty(exports, "__esModule", { value: true });
let valorDesconhecido = "talvez string";
// Checagem antes de usar
if (typeof valorDesconhecido === "string") {
    // Aqui o TS sabe que é string
    console.log(valorDesconhecido.toUpperCase());
}
// Type assertion (use com cautela)
const comoString = valorDesconhecido;
console.log("Como string (pode ser undefined em runtime se a suposição falhar):", comoString);
function getEl(id) {
    return { id }; // exemplo fictício
}
const el = getEl("app"); // dizendo ao TS que não é null
console.log("Elemento:", el.id);
