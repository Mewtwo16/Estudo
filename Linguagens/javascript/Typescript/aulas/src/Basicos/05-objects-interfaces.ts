// 05 - Objetos e Interfaces

interface Pessoa {
  readonly id: string;
  nome: string;
  idade?: number; // opcional
}

const pessoa: Pessoa = {
  id: "abc123",
  nome: "Andre",
};

pessoa.nome = "Andre Silva";
// pessoa.id = "nova"; // Erro: readonly

// Tipando objeto literal inline
const endereco: { rua: string; numero: number; complemento?: string } = {
  rua: "Av. Principal",
  numero: 100,
};

console.log("Pessoa:", pessoa);
console.log("Endereço:", endereco);

// Marca este arquivo como módulo
export {};
