# Guia de Validação de Inputs com Joi

Este documento mostra como validar os dados enviados pelo usuário (ex.: criação de usuário) usando **Joi**. A biblioteca já está instalada no projeto (`joi` e `@types/joi`).

## 1. Por que usar Joi?
- Padroniza regras de validação em um único schema.
- Gera mensagens de erro claras e customizáveis.
- Facilita reuso entre rotas (ex.: criação e atualização).
- Permite sanitização (ex.: transformar CPF e normalizar datas) dentro do schema.

## 2. Campos do `addUser`
Interface atual (arquivo `src/main/types.ts`):
```ts
export interface addUser {
  full_name: string
  email: string
  cpf: string
  birth_date: string // YYYY-MM-DD
  user: string
  password: string
  status: boolean
  role: string
}
```

## 3. Instalação (já atendida)
Se precisasse instalar:
```bash
npm install joi @types/joi
```

## 4. Criando um schema Joi
Crie um arquivo `src/main/validation/userSchemas.ts` (exemplo abaixo). Ele cobre:
- Nome: mínimo de 3 caracteres.
- Email: formato de e-mail.
- CPF: exatos 11 dígitos, rejeitando sequências repetidas.
- Data de nascimento: formato `YYYY-MM-DD` + data real.
- Usuário (login): letras, números, underscore, 3-32 chars.
- Senha: mínimo 8 chars, exige ao menos 1 letra e 1 dígito.
- Status: boolean.
- Role: mínimo 2 chars.

### 4.1. Como Joi valida cada campo (explicando as linhas)
- `.string()` define que o campo é texto. Combine com `.min()`, `.max()`, `.email()`, `.pattern()` etc.
- `.replace(/\D+/g, '')` para CPF remove tudo que não é dígito — isso permite aceitar entrada com pontos/traço e normalizar para 11 dígitos.
- `.pattern(/regex/)` garante o formato. Usamos em `birth_date` para checar `YYYY-MM-DD` antes de validar o calendário.
- `.custom((value, helpers) => { ... })` executa lógica própria. Usamos para:
  - Validar os dígitos do CPF.
  - Checar se a data existe no calendário e aplicar regra de idade.
- `.messages({...})` personaliza as mensagens de erro por tipo de falha. É o ponto central para mensagens amigáveis.
- `validate(data, { abortEarly: false })` retorna todos os erros de uma vez (sem abortar no primeiro), melhorando a UX do formulário.

### 4.2. Algoritmo de CPF explicado (dígitos verificadores)
Um CPF tem 11 dígitos: 9 base + 2 dígitos verificadores (DV1 e DV2). A regra oficial é baseada em pesos e resto por 11.

Passos (variante clássica):
1) DV1
   - Multiplique os 9 dígitos base por pesos decrescentes de 10 a 2 e some.
   - Calcule o resto da divisão por 11: `resto = soma % 11`.
   - Se `resto < 2`, então `DV1 = 0`; caso contrário `DV1 = 11 - resto`.
2) DV2
   - Agora use os 9 dígitos base + DV1 (total 10 dígitos), com pesos de 11 a 2.
   - Repita o processo acima para obter `DV2`.

Variante equivalente (usada no código abaixo):
- Em vez de `11 - (soma % 11)`, você pode usar `dv = (soma * 10) % 11` e tratar `10` como `0`. É matematicamente equivalente para CPF e costuma ser ligeiramente mais direta de implementar.

Exemplo rápido (CPF 529.982.247-25):
- Base: 5 2 9 9 8 2 2 4 7
- DV1 (pesos 10..2) => soma = 5×10 + 2×9 + 9×8 + 9×7 + 8×6 + 2×5 + 2×4 + 4×3 + 7×2 = 295; 295 % 11 = 9; 11 - 9 = 2 → DV1 = 2
- DV2 (pesos 11..2) usando 5 2 9 9 8 2 2 4 7 2 => soma = 347; 347 % 11 = 6; 11 - 6 = 5 → DV2 = 5
- Resultado: 529.982.247-25 (válido)

Além disso, rejeitamos CPFs de dígitos repetidos (ex.: `00000000000`, `11111111111`), que embora passem no formato, são inválidos na prática.

```ts
import Joi from 'joi'

// Validação de CPF (11 dígitos + dígitos verificadores) – função auxiliar
function isValidCpfDigits(cpf: string): boolean {
  if (!/^\d{11}$/.test(cpf)) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false
  const calc = (len: number) => {
    let sum = 0
    for (let i = 0; i < len; i++) sum += parseInt(cpf[i]) * (len + 1 - i)
    // Variante equivalente ao método clássico do CPF:
    // dv = (sum * 10) % 11; se dv === 10 => 0
    const r = (sum * 10) % 11
    return r === 10 ? 0 : r
  }
  return calc(9) === parseInt(cpf[9]) && calc(10) === parseInt(cpf[10])
}

export const addUserSchema = Joi.object({
  full_name: Joi.string()
    .min(3)
    .max(120)
    .messages({ 'string.min': 'Nome deve ter ao menos 3 caracteres.' }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  cpf: Joi.string()
    .replace(/\D+/g, '') // remove pontuação se vier formatado
    .custom((value, helpers) => {
      if (!/^\d{11}$/.test(value)) return helpers.error('any.invalid')
      if (!isValidCpfDigits(value)) return helpers.error('any.invalid')
      return value
    }, 'CPF validation')
    .messages({ 'any.invalid': 'CPF inválido.' })
    .required(),

  birth_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .custom((value, helpers) => {
      const [y, m, d] = value.split('-').map(Number)
      const dt = new Date(Date.UTC(y, m - 1, d))
      if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) {
        return helpers.error('date.invalid')
      }
      // Exemplo regra de idade mínima (opcional): 14 anos
      const hoje = new Date()
      const idade = hoje.getUTCFullYear() - y - ( (hoje.getUTCMonth() + 1 < m || (hoje.getUTCMonth() + 1 === m && hoje.getUTCDate() < d)) ? 1 : 0 )
      if (idade < 14) return helpers.error('date.tooYoung')
      return value
    })
    .messages({
      'string.pattern.base': 'Data deve estar em YYYY-MM-DD.',
      'date.invalid': 'Data inexistente.',
      'date.tooYoung': 'Usuário precisa ter pelo menos 14 anos.'
    })
    .required(),

  user: Joi.string()
    .pattern(/^[A-Za-z0-9_]{3,32}$/)
    .messages({ 'string.pattern.base': 'Login deve conter 3-32 caracteres, letras/números/_.' })
    .required(),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .messages({
      'string.min': 'Senha mínima de 8 caracteres.',
      'string.pattern.base': 'Senha deve ter ao menos uma letra e um dígito.'
    })
    .required(),

  status: Joi.boolean().required(),

  role: Joi.string().min(2).max(60).required()
})
```

## 5. Como usar no serviço ou rota
Exemplo integrando no `addUser` (arquivo `src/main/routes/user.ts`). Substitua o trecho onde recebe `userData`:

```ts
import { addUserSchema } from '../validation/userSchemas'

async addUser(userData: addUser) {
  const saltRounds = 10
  const senhaHash = await bcrypt.hash(userData.password, saltRounds)

  const { value, error } = addUserSchema.validate(userData, { abortEarly: false })
  if (error) {
    return {
      success: false,
      message: 'Erros de validação',
      // Lista de mensagens amigáveis
      issues: error.details.map(d => d.message)
    }
  }

  // value contém campos normalizados (ex.: cpf sem pontuação)
  try {
    await db.transaction(async (trx) => {
      const [newUserID] = await trx('users').insert({
        full_name: value.full_name,
        email: value.email,
        cpf: value.cpf,
        birth_date: value.birth_date, // YYYY-MM-DD
        login: value.user,
        password_hash: senhaHash,
        status: value.status,
        creation_date: new Date()
      })
      // ... resto igual
    })
  } catch (e) {
    return { success: false, message: 'Erro ao criar usuário: ' + e }
  }
  return { success: true, message: 'Usuário criado com sucesso' }
}
```

## 6. Middleware genérico (Express)
Se desejar reutilizar, crie `src/main/middlewares/validate.ts`:
```ts
import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'

export function validateBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Erros de validação',
        issues: error.details.map(d => d.message)
      })
    }
    req.body = value
    next()
  }
}
```
Uso na rota Express:
```ts
import { addUserSchema } from '../validation/userSchemas'
import { validateBody } from '../middlewares/validate'

router.post('/users', validateBody(addUserSchema), (req, res) => {
  // req.body já validado & normalizado
})
```

## 7. Boas práticas
- `abortEarly: false` permite retornar todas as mensagens de erro de uma vez.
- Não exponha detalhes internos (ex.: qual regra de senha falhou) se isso facilitar brute-force; ajuste mensagens conforme necessidade.
- Versione schemas (ex.: addUserSchemaV2) quando alterar regras significativas.
- Teste schemas com casos positivos/negativos (mínimo: 1 válido, 3 inválidos distintos).

Sugestões adicionais:
- Centralize normalizações no próprio schema (ex.: `.replace(/\D+/g, '')` no CPF) para manter as rotas limpas.
- Para mensagens multilíngues, mapeie `error.details` para chaves de tradução.
- Evite `new Date('YYYY-MM-DD')` no back-end para data de nascimento; prefira manter string `YYYY-MM-DD` e deixar o banco (DATE) representar sem timezone.

## 8. Teste rápido (exemplo de uso em código)
```ts
const { error } = addUserSchema.validate({
  full_name: 'A',
  email: 'x@',
  cpf: '11111111111',
  birth_date: '2025-02-30',
  user: 'jo',
  password: 'abc',
  status: true,
  role: 'R'
}, { abortEarly: false })

if (error) {
  console.log(error.details.map(d => d.message))
}
// Saída esperada: lista com várias mensagens de validação
```

## 9. Próximos passos opcionais
- Adicionar schema para login (`usuario` + `senha`).
- Criar schemas de atualização parcial (ex.: updateUserSchema com `.fork()` ou `.optional()`).
- Internacionalização das mensagens (mapa de traduções).
- Testes automatizados para schemas (Jest/Vitest) se quiser garantir estabilidade.

## 10. Dicas rápidas de Joi em produção
- `schema.validateAsync()` pode ser usado com `await` e try/catch.
- Use `Joi.assert(obj, schema)` em testes para falhar rapidamente.
- Para campos opcionais, use `.optional()` ou `.allow(null)` conforme a sua política de nulos.
- Quando o banco tem UNIQUE (ex.: email/cpf), mantenha validação assíncrona na camada de serviço para checar duplicidade antes do INSERT.

---
Qualquer dúvida ou se quiser que eu gere automaticamente o arquivo `userSchemas.ts` e o middleware, me avise.
