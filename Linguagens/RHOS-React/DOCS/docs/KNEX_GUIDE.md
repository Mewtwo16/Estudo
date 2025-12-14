# Guia Prático do Knex — uso, funcionalidades e segurança (contexto do seu projeto)

Este documento explica o que é o Knex, suas funcionalidades principais (query builder, migrations, seeds, transactions, pooling), como usá‑las no contexto do seu Electron + Express + Knex + React, e práticas de segurança e desempenho para aplicar no seu app.

O público alvo é você (bom em JavaScript, com menos experiência em TypeScript) — explicações claras, exemplos e motivos do porquê adotar cada padrão.

---

SUMÁRIO
- 1) O que é Knex e por que usá‑lo
- 2) Conexão e configuração centralizada (ex.: seu `src/main/db/db.ts`)
- 3) Query Builder: consultas seguras e exemplos práticos
- 4) Migrations e Seeds: controle de esquema e dados iniciais
- 5) Transactions: operações atômicas
- 6) Pooling e configuração de produção
- 7) Segurança: evitar SQL Injection e outras recomendações
- 8) Performance: índices, queries e logging
- 9) Boas práticas aplicadas ao seu projeto (exemplos concretos)
- 10) Comandos úteis (CLI / scripts)

---

1) O que é Knex e por que usá‑lo

Knex é um query builder SQL para Node.js que funciona com vários bancos (MySQL, PostgreSQL, SQLite, etc.). Ele permite:
- Construir consultas com uma API JS (sem concatenar strings SQL manualmente).
- Gerenciar migrations e seeds para controlar o esquema e dados de seed.
- Usar transactions e pooling.

Por que usar Knex em vez de escrever SQL puro ou usar um ORM completo?
- Mais controle que um ORM pesado: você escreve queries relativamente próximas do SQL.
- Mais segurança e legibilidade que montar strings SQL manualmente.
- Migrations/Seeds embutidos ajudam a manter o schema sincronizado entre ambientes.


2) Conexão e configuração centralizada

Você já tem um `src/main/db/db.ts` que exporta uma instância do Knex. Isso é ótimo — padrão recomendado:
- Um único ponto de criação da conexão garante reuso de pool, centralização do `dotenv` e fácil troca de config.

Exemplo (similar ao seu `db.ts`):

```ts
import knex from 'knex'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  pool: { min: 2, max: 10 }
}

const db = knex(config)
export default db
```

PORQUE:
- Centralizar facilita trocar a pool, habilitar debug, e controlar credenciais via `.env`.


3) Query Builder: consultas seguras e exemplos práticos

Knex monta queries com bindings automaticamente. Em vez de fazer:

```js
// NÃO faça (vulnerável a injeção)
const sql = `SELECT * FROM users WHERE login = '${login}'`;
```

Use o query builder:

```ts
// seguro
const user = await db('users').where({ login }).first()
```

Exemplos úteis (aplicáveis ao seu projeto):

- Buscar permissões (versão segura e legível):

```ts
const permissions = await db('allowed')
  .join('roles_allowed', 'allowed.id', 'roles_allowed.allowed_id')
  .join('role_users', 'roles_allowed.roles_id', 'role_users.roles_id')
  .where('role_users.users_id', userId)
  .distinct('allowed.permission_name')
  .pluck('permission_name') as string[]
```

- Usar `pluck` para obter apenas uma coluna

```ts
const roleNames = await db('roles')
  .whereIn('id', [1,2,3])
  .pluck('role_name') // retorna string[]
```

- Usar bindings em raw queries quando necessário

```ts
const rows = await db.raw('SELECT * FROM ?? WHERE ?? = ?', ['users', 'login', login])
// db.raw com bindings evita injeção (use sempre bindings, nunca string interpolation)
```

PORQUE:
- Knex trata os bindings e previne injeção. Use `db.raw` com `?` / `??` e um array de valores vinculados quando precisar escrever SQL cru.


4) Migrations e Seeds

- Migrations: scripts que mudam o schema (CREATE TABLE, ALTER TABLE). Rastreiam versão do schema.
- Seeds: dados iniciais (ex.: criar usuário admin) para ambientes de dev/test.

Comandos (exemplo com o CLI do Knex):
- `npx knex migrate:make create_roles_table --knexfile ./knexfile.js`
- `npx knex migrate:latest --knexfile ./knexfile.js`
- `npx knex seed:make seed_admin --knexfile ./knexfile.js`

No entanto, se você está centralizando config em `db.ts` e removendo `knexfile.js`, pode criar pequenos scripts Node para rodar migrations/seeds usando a instância do Knex exportada ou manter um `knexfile.js` que importe as mesmas variáveis de ambiente.

PORQUE:
- Migrations garantem que todos os ambientes (dev/CI/prod) tenham o mesmo schema. Seeds ajudam a criar usuários de teste (ex.: admin).


5) Transactions (operações atômicas)

Use transactions sempre que for executar múltiplas alterações que devem ser aplicadas juntas (p.ex.: criar usuário e associar roles). Exemplo:

```ts
await db.transaction(async (trx) => {
  const [userId] = await trx('users').insert({ login, password_hash })
  await trx('role_users').insert({ users_id: userId, roles_id: roleId })
  // se qualquer insert falhar, trx lança e tudo é rollback
})
```

Ou com style explícito:

```ts
const trx = await db.transaction()
try {
  const [userId] = await trx('users').insert({ ... })
  await trx.commit()
} catch (err) {
  await trx.rollback()
  throw err
}
```

PORQUE:
- Transações evitam dados inconsistentes quando uma parte da operação falha.


6) Pooling e configuração de produção

- Configure `pool` no seu `db.ts`: `pool: { min: 2, max: 10 }`.
- Ajuste `acquireTimeoutMillis` e `idleTimeoutMillis` dependendo do driver para evitar conexões presas.
- Em produção, prefira variáveis de ambiente e, se necessário, SSL/TLS na conexão.

PORQUE:
- Um pool bem configurado evita abrir muitas conexões e melhora latência.


7) Segurança: evitar SQL Injection e outras recomendações

- Nunca interpolar valores em strings SQL. Use Knex query builder ou `db.raw(sql, bindings)` sempre.
- Restrinja o usuário do banco de dados: crie um usuário com permissões mínimas (SELECT/INSERT/UPDATE/DELETE nas tabelas necessárias). Não use root.
- Use bcrypt (ou argon2) para senhas. Já usa bcrypt, ótimo.
- Valide entradas no backend (express-validator, Joi) antes de passar para o Knex.
- Não registre valores sensíveis (senhas, tokens) em logs.
- Rotacione secrets (DB password, JWT secret) periodicamente e não commit `.env`.
- Habilite TLS quando conectar a um RDS ou banco remoto.


8) Performance: índices, queries e logging

- Crie índices nas colunas usadas por `WHERE` e `JOIN` (ex.: `roles.id`, `role_users.users_id`, `role_users.roles_id`). Seu `database.sql` já tem índices nas constraints.
- Evite `SELECT *` em queries que retornam muitas colunas; prefira colunas necessárias.
- Use `EXPLAIN` no SQL para verificar planos quando uma query estiver lenta.
- Habilite query logging em dev para detectar queries pesadas (`db.on('query', (q) => console.log(q.sql))`). Mas não ative logging verbose em produção.


9) Boas práticas aplicadas ao seu projeto (exemplos concretos)

- Centralize a instância do Knex em `src/main/db/db.ts` (já feito).
- Use `.pluck()` e `.distinct()` para queries que retornam listas simples (roles, permission names).
- Para o fluxo de login, um padrão seguro:
  1. Validar `usuario` e `senha` no router (express-validator).
  2. Buscar usuário com `await db('users').where({ login: usuario }).first()`.
  3. Comparar senha com `bcrypt.compare`.
  4. Buscar roles/permissions via joins (com `distinct`) e retornar token JWT.

- Exemplo de criação de usuário com transaction e validação:

```ts
import { Request, Response } from 'express'
import db from '../db/db'

export async function createUserHandler(req: Request, res: Response) {
  const { login, password, roles = [] } = req.body
  // validar campos (ex.: notEmpty, minLength)
  const passwordHash = await bcrypt.hash(password, 10)
  try {
    await db.transaction(async (trx) => {
      const [userId] = await trx('users').insert({ login, password_hash: passwordHash })
      for (const roleId of roles) {
        await trx('role_users').insert({ users_id: userId, roles_id: roleId })
      }
    })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success:false, message:'Erro ao criar usuário' })
  }
}
```


10) Comandos úteis e integração com o Knex CLI

- Instalando Knex globalmente (opcional): `npm i -g knex`
- Usando via npx (recomendado): `npx knex --help`
- Migrations com knexfile:
  - `npx knex migrate:make nome_migration --knexfile ./knexfile.js`
  - `npx knex migrate:latest --knexfile ./knexfile.js`
  - `npx knex seed:make nome_seed --knexfile ./knexfile.js`

Dica: se você prefere manter `db.ts` como fonte de verdade (sem `knexfile.js`), crie scripts Node que chamem `await db.migrate.latest()` ou `await db.seed.run()` reusando a instância exportada.

---

Resumo rápido — checklist para sua aplicação
- [x] Centralizar `db` em `src/main/db/db.ts` (feito)
- [ ] Usar migrations/seeds para manter schema/seed (se ainda não tiver, crie)
- [x] Validar inputs no backend (adotar express-validator/Joi)
- [x] Evitar raw SQL sem bindings (use query builder ou db.raw com bindings)
- [x] Usar transactions para operações multi-step
- [ ] Configurar pool adequado para produção
- [ ] Criar usuário DB com permissões mínimas (não usar root)


Se quiser, eu posso:
- Gerar um exemplo de migration e um seed para o admin (com base no seu `database.sql`).
- Adicionar um script Node que rode `db.migrate.latest()` e `db.seed.run()` usando a instância exportada.

Quer que eu gere uma migration + seed de exemplo com base no seu schema (roles/users/role_users)?
