// 11 - Utility Types

interface Usuario {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
}

// Partial: todas as propriedades opcionais
const updateUsuario: Partial<Usuario> = { nome: "Novo Nome" };

// Readonly: impede alterações
const usuarioConstante: Readonly<Usuario> = {
  id: "1",
  nome: "Andre",
  email: "a@a.com",
  ativo: true,
};
// usuarioConstante.nome = "X"; // Erro

// Pick: seleciona propriedades
type UsuarioPublico = Pick<Usuario, "id" | "nome">;

// Omit: omite propriedades
type UsuarioPrivado = Omit<Usuario, "email">;

// Record: mapeia chaves para um tipo
const permissoesPorUsuario: Record<string, Array<"ler" | "escrever">> = {
  "1": ["ler", "escrever"],
  "2": ["ler"],
};

const publico: UsuarioPublico = { id: "2", nome: "Bia" };
const privado: UsuarioPrivado = { id: "3", nome: "Carlos", ativo: false };

console.log("Update parcial:", updateUsuario);
console.log("Usuário readonly:", usuarioConstante);
console.log("Tipos utilitários:", publico, privado, permissoesPorUsuario);

// Marca este arquivo como módulo
export {};
