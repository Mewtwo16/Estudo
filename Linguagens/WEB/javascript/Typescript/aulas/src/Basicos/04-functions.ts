// 04 - Funções em TypeScript

// Parâmetros e retorno tipados
function somar(a: number, b: number = 0): number {
  return a + b;
}

// Parâmetro opcional
function saudar(nome: string, titulo?: string): string {
  return titulo ? `${titulo} ${nome}` : `Olá, ${nome}`;
}

// Rest parameters
function somaTudo(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log("Somar:", somar(2, 3));
console.log("Saudar:", saudar("Andre"), saudar("Andre", "Sr."));
console.log("Soma Tudo:", somaTudo(1, 2, 3, 4));

// Marca este arquivo como módulo
export {};
