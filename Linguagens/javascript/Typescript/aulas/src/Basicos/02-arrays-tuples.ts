/*
	02 - Arrays e Tuplas em TypeScript

	Objetivo:
	- Tipar coleções, entendendo diferenças entre Array<T> e T[], além de tuplas (tamanho/ordem fixa).

	Dicas:
	- number[] e Array<number> são equivalentes; escolha por estilo/consistência.
	- Prefira readonly quando quiser comunicar imutabilidade (evita alterações acidentais).
	- Tuplas são ótimas para múltiplos retornos curtos (ex.: [data, error]), mas nomeie elementos para clareza.
*/

// Arrays tipados
const numeros: number[] = [1, 2, 3]; // sintaxe curta T[]
const palavras: Array<string> = ["ts", "é", "legal"]; // sintaxe genérica Array<T>

numeros.push(4);
// palavras.push(123); // Erro: 123 não é string

// Tupla: tamanho e tipos fixos. Os rótulos (id, nome) são só documentação no editor.
const usuarioTupla: [id: number, nome: string] = [1, "Andre"];

// Tupla com opcional (o último elemento pode ser omitido)
const coordenada2D: [number, number, string?] = [10, 20];
const coordenada2DComNome: [number, number, string?] = [10, 20, "Ponto A"];

// Tupla somente leitura: impede reatribuição dos elementos
const versao: readonly [major: number, minor: number, patch: number] = [1, 0, 0];
// versao[0] = 2; // Erro: readonly

console.log("Números:", numeros);
console.log("Palavras:", palavras);
console.log("Usuário:", usuarioTupla);
console.log("Coord:", coordenada2D, coordenada2DComNome);
console.log("Versão:", versao.join("."));

// Marca este arquivo como módulo (evita poluir o escopo global)
export {};
