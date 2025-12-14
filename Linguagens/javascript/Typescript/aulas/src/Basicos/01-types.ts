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

// Tipos primitivos
const nome: string = "Andre";
const idade: number = 28;
const ativo: boolean = true;

// null e undefined (em strict mode, use com cuidado)
const nada: null = null;
const indefinido: undefined = undefined;

// any: desativa checagem de tipo (evite quando possível)
// Use como "escape hatch" temporário. O compilador não ajuda a detectar erros sobre 'any'.
let qualquer: any = "texto";
qualquer = 123;

// unknown: similar ao any, mas EXIGE verificação antes de usar (mais seguro que any)
let desconhecido: unknown = "talvez string";
if (typeof desconhecido === "string") {
  console.log(desconhecido.toUpperCase());
}

// void: usado como retorno de funções que não retornam valor (efeitos colaterais)
function logMensagem(msg: string): void {
  console.log("LOG:", msg);
}

// never: funções que NUNCA retornam (lançam erro ou entram em loop infinito)
// Útil para modelar casos "impossíveis" em unions e exaustividade em switches.
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// Tipos literais: restringem o valor a um conjunto específico
// Bom para modelar enums "leves" ou estados.
const direcao: "esquerda" | "direita" = "direita";

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

// Marca este arquivo como módulo (evita poluir o escopo global)
export {};
