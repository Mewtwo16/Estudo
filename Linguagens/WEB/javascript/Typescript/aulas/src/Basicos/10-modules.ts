// 10 - Módulos (export/import)

// Exporte valores e tipos para serem usados em outros arquivos
export type Saudacao = (nome: string) => string;

export const dizerOla: Saudacao = (nome) => `Olá, ${nome}!`;

export const PI = 3.14;

// Este arquivo por si só já é um módulo por conter exports.
// Em outro arquivo, você poderia importar assim:
// import { dizerOla, PI } from "./10-modules";
