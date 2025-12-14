"use strict";
// 04 - Funções em TypeScript
Object.defineProperty(exports, "__esModule", { value: true });
// Parâmetros e retorno tipados
function somar(a, b = 0) {
    return a + b;
}
// Parâmetro opcional
function saudar(nome, titulo) {
    return titulo ? `${titulo} ${nome}` : `Olá, ${nome}`;
}
// Rest parameters
function somaTudo(...nums) {
    return nums.reduce((acc, n) => acc + n, 0);
}
console.log("Somar:", somar(2, 3));
console.log("Saudar:", saudar("Andre"), saudar("Andre", "Sr."));
console.log("Soma Tudo:", somaTudo(1, 2, 3, 4));
