"use strict";
/*
  01 - Tipos básicos em TypeScript

  Objetivo:
  - Mostrar como anotar tipos que você já usa no JavaScript, entendendo quando o TS infere e quando você deve anotar.

  Dicas rápidas:
  - Prefira deixar o TS inferir quando a variável é inicializada (ex.: const x = 1 // number).
  - Anote tipos em parâmetros de função e APIs públicas (interfaces/exports) para clareza do contrato.
  - Ative strict mode (já ativo aqui) para detectar mais problemas cedo.

  Principais diferenças vs JS:
  - JS não tem verificação estática de tipos; TS checa em tempo de compilação sem mudar o runtime.
  - Tipos como unknown e never não existem no JS: são ferramentas de modelagem para o compilador.
*/
Object.defineProperty(exports, "__esModule", { value: true });
// Tipos primitivos
const nome = "Andre";
const idade = 28;
const ativo = true;
// null e undefined (em strict mode, use com cuidado)
const nada = null;
const indefinido = undefined;
// any: desativa checagem de tipo (evite quando possível)
// Use como "escape hatch" temporário. O compilador não ajuda a detectar erros sobre 'any'.
let qualquer = "texto";
qualquer = 123;
// unknown: similar ao any, mas EXIGE verificação antes de usar (mais seguro que any)
let desconhecido = "talvez string";
if (typeof desconhecido === "string") {
    console.log(desconhecido.toUpperCase());
}
// void: usado como retorno de funções que não retornam valor (efeitos colaterais)
function logMensagem(msg) {
    console.log("LOG:", msg);
}
// never: funções que NUNCA retornam (lançam erro ou entram em loop infinito)
// Útil para modelar casos "impossíveis" em unions e exaustividade em switches.
function falhar(mensagem) {
    throw new Error(mensagem);
}
// Tipos literais: restringem o valor a um conjunto específico
// Bom para modelar enums "leves" ou estados.
const direcao = "direita";
// Observação sobre null/undefined com strictNullChecks:
// - Em strict mode, 'null' e 'undefined' NÃO pertencem a outros tipos automaticamente.
// - Use unions (ex.: string | undefined) quando um valor puder estar ausente.
// - Prefira evitar anotar variáveis como 'null'/'undefined' diretamente, deixe a inferência tratar isso em fluxos.
// Inferência vs anotação:
// const idade2 = 30 // inferido como number; não precisa anotar em todos os lugares.
// function dobro(x: number) { return x * 2 } // anote em fronteiras públicas.
// Exemplos de uso
logMensagem(`${nome} tem ${idade} anos. Ativo: ${ativo}.`);
console.log("Nada:", nada, "Indefinido:", indefinido);
console.log("Direção:", direcao);
