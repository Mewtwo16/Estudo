"use strict";
/*
    02 - Arrays e Tuplas em TypeScript

    Objetivo:
    - Tipar coleções, entendendo diferenças entre Array<T> e T[], além de tuplas (tamanho/ordem fixa).

    Dicas:
    - number[] e Array<number> são equivalentes; escolha por estilo/consistência.
    - Prefira readonly quando quiser comunicar imutabilidade (evita alterações acidentais).
    - Tuplas são ótimas para múltiplos retornos curtos (ex.: [data, error]), mas nomeie elementos para clareza.
*/
Object.defineProperty(exports, "__esModule", { value: true });
// Arrays tipados
const numeros = [1, 2, 3]; // sintaxe curta T[]
const palavras = ["ts", "é", "legal"]; // sintaxe genérica Array<T>
numeros.push(4);
// palavras.push(123); // Erro: 123 não é string
// Tupla: tamanho e tipos fixos. Os rótulos (id, nome) são só documentação no editor.
const usuarioTupla = [1, "Andre"];
// Tupla com opcional (o último elemento pode ser omitido)
const coordenada2D = [10, 20];
const coordenada2DComNome = [10, 20, "Ponto A"];
// Tupla somente leitura: impede reatribuição dos elementos
const versao = [1, 0, 0];
// versao[0] = 2; // Erro: readonly
console.log("Números:", numeros);
console.log("Palavras:", palavras);
console.log("Usuário:", usuarioTupla);
console.log("Coord:", coordenada2D, coordenada2DComNome);
console.log("Versão:", versao.join("."));
