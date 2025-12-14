"use strict";
// 05 - Objetos e Interfaces
Object.defineProperty(exports, "__esModule", { value: true });
const pessoa = {
    id: "abc123",
    nome: "Andre",
};
pessoa.nome = "Andre Silva";
// pessoa.id = "nova"; // Erro: readonly
// Tipando objeto literal inline
const endereco = {
    rua: "Av. Principal",
    numero: 100,
};
console.log("Pessoa:", pessoa);
console.log("Endereço:", endereco);
