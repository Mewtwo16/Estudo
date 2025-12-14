// 08 - Generics (Genéricos)

// Função genérica
function identity<T>(valor: T): T {
  return valor;
}

// Interface genérica
interface Caixa<T> {
  valor: T;
}

const caixaDeNumero: Caixa<number> = { valor: 10 };
const caixaDeTexto: Caixa<string> = { valor: "oi" };

// Restringindo tipos com extends
function pegarChave<T extends object, K extends keyof T>(obj: T, chave: K): T[K] {
  return obj[chave];
}

console.log("Identity:", identity(123), identity("abc"));
console.log("Caixas:", caixaDeNumero, caixaDeTexto);
console.log("Pegar chave:", pegarChave({ a: 1, b: "x" }, "b"));

// Marca este arquivo como módulo
export {};
