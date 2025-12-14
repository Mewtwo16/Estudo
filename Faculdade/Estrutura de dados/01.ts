// Quicksort em TypeScript — exemplo simples e bem comentado
// Estratégia: dividir e conquistar
// 1) Escolhe um pivô
// 2) Particiona o array em: menores que o pivô, iguais ao pivô e maiores que o pivô
// 3) Ordena recursivamente as partições e concatena os resultados

/**
 * Ordena e retorna um novo array usando o algoritmo QuickSort (não in-place).
 * Observação: Esta versão usa arrays auxiliares (filter), sendo didática e simples.
 * 
 * Complexidade (n = tamanho do array):
 * - Melhor/Médio caso: O(n log n)
 * - Pior caso: O(n^2) — ocorre quando o pivô é sempre o menor/maior (ex.: array já ordenado com pivô ruim)
 * - Espaço adicional: O(n), pois criamos sub-arrays (left/equal/right)
 */
function quickSort(arr: number[]): number[] {
	// Caso base: arrays com 0 ou 1 elemento já estão ordenados
	if (arr.length <= 1) return arr;

	// Escolha do pivô: aqui usamos o elemento do meio (reduz chance de pior caso em arrays "aleatórios")
	const pivotIndex = Math.floor(arr.length / 2);
	const pivot = arr[pivotIndex];

	// Particiona o array em três partes
	const left = arr.filter((x) => x < pivot);
	const equal = arr.filter((x) => x === pivot);
	const right = arr.filter((x) => x > pivot);

	// Concatena: quickSort(left) + iguais ao pivô + quickSort(right)
	return [...quickSort(left), ...equal, ...quickSort(right)];
}

// --- Exemplo de uso ---
const exemplo: number[] = [33, 10, 55, 71, 29, 3, 10, -5, 0, 42];
console.log("Array original:", exemplo);
const ordenado = quickSort(exemplo);
console.log("Array ordenado:", ordenado);

// Observações:
// - quickSort não modifica o array original (não-in-place). Se quiser a versão in-place,
//   pode-se implementar a partição de Lomuto ou Hoare, porém o código fica mais detalhado.
// - A escolha do pivô influencia o desempenho; estratégias comuns: primeiro, último, meio ou mediana de três.

