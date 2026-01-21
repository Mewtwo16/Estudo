/*
  03 - Enums em TypeScript

  Objetivo:
  - Modelar conjuntos nomeados de valores. Útil para estados/roles/códigos de status.

  Dicas e cuidados:
  - Prefira string enums para legibilidade no runtime (valores claros ao logar/serializar).
  - Enums numéricos geram mapeamento reverso em JS (cuidado com tamanho do bundle).
  - Alternativa leve: usar unions de literais ("admin" | "user") quando não precisar de objeto Enum.
*/

// Enum de string (valores explícitos, legíveis no runtime)
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

// Enum numérico (útil para códigos; atenção ao mapeamento reverso no JS emitido)
enum StatusCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
}

const minhaRole: Role = Role.Admin;
const status: StatusCode = StatusCode.OK;

console.log("Role:", minhaRole);
console.log("Status:", status);

// Marca este arquivo como módulo (evita poluir o escopo global)
export {};
