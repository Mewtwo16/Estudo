"use strict";
// 11 - Utility Types
Object.defineProperty(exports, "__esModule", { value: true });
// Partial: todas as propriedades opcionais
const updateUsuario = { nome: "Novo Nome" };
// Readonly: impede alterações
const usuarioConstante = {
    id: "1",
    nome: "Andre",
    email: "a@a.com",
    ativo: true,
};
// Record: mapeia chaves para um tipo
const permissoesPorUsuario = {
    "1": ["ler", "escrever"],
    "2": ["ler"],
};
const publico = { id: "2", nome: "Bia" };
const privado = { id: "3", nome: "Carlos", ativo: false };
console.log("Update parcial:", updateUsuario);
console.log("Usuário readonly:", usuarioConstante);
console.log("Tipos utilitários:", publico, privado, permissoesPorUsuario);
