"use strict";
// 10 - Módulos (export/import)
Object.defineProperty(exports, "__esModule", { value: true });
exports.PI = exports.dizerOla = void 0;
const dizerOla = (nome) => `Olá, ${nome}!`;
exports.dizerOla = dizerOla;
exports.PI = 3.14;
// Este arquivo por si só já é um módulo por conter exports.
// Em outro arquivo, você poderia importar assim:
// import { dizerOla, PI } from "./10-modules";
