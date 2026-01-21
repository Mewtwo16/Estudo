"use strict";
// 08 - Generics (Genéricos)
Object.defineProperty(exports, "__esModule", { value: true });
// Função genérica
function identity(valor) {
    return valor;
}
const caixaDeNumero = { valor: 10 };
const caixaDeTexto = { valor: "oi" };
// Restringindo tipos com extends
function pegarChave(obj, chave) {
    return obj[chave];
}
console.log("Identity:", identity(123), identity("abc"));
console.log("Caixas:", caixaDeNumero, caixaDeTexto);
console.log("Pegar chave:", pegarChave({ a: 1, b: "x" }, "b"));
