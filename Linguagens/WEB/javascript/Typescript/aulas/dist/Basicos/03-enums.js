"use strict";
/*
  03 - Enums em TypeScript

  Objetivo:
  - Modelar conjuntos nomeados de valores. Útil para estados/roles/códigos de status.

  Dicas e cuidados:
  - Prefira string enums para legibilidade no runtime (valores claros ao logar/serializar).
  - Enums numéricos geram mapeamento reverso em JS (cuidado com tamanho do bundle).
  - Alternativa leve: usar unions de literais ("admin" | "user") quando não precisar de objeto Enum.
*/
Object.defineProperty(exports, "__esModule", { value: true });
// Enum de string (valores explícitos, legíveis no runtime)
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["User"] = "USER";
    Role["Guest"] = "GUEST";
})(Role || (Role = {}));
// Enum numérico (útil para códigos; atenção ao mapeamento reverso no JS emitido)
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["ServerError"] = 500] = "ServerError";
})(StatusCode || (StatusCode = {}));
const minhaRole = Role.Admin;
const status = StatusCode.OK;
console.log("Role:", minhaRole);
console.log("Status:", status);
