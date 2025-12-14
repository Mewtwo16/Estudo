# Arquitetura de Services, Injeção de Dependências e Padrões Profissionais

> Objetivo: Explicar por que e como organizar a camada de serviços ("services") em aplicações Node/Electron + Express, evoluindo de uma abordagem simples (classes singleton) para alternativas mais profissionais (funções puras, classes com DI, fábricas, repositórios), com exemplos concretos deste projeto.

---
## 1. O Papel da Camada de Service
A camada de service:
- Orquestra regras de negócio.
- Coordena chamadas a banco (via queries ou repositórios) e a outros serviços (como log, autenticação, email).
- Aplica validações adicionais e prepara dados para a camada HTTP (rotas/controllers).

Ela NÃO deve:
- Renderizar UI.
- Conhecer detalhes do protocolo HTTP (não usar `req`/`res`).
- Misturar lógica de formatação de resposta com acesso a dados.

Benefícios de uma boa arquitetura de services:
- Testabilidade (mock de dependências).
- Baixo acoplamento e maior reuso.
- Facilidade de evolução (trocar banco, adicionar cache, etc.).

---
## 2. Padrão Atual (Classe + Singleton)
Exemplo simplificado do seu `authService`:
```ts
class AuthService {
  async login(usuario: string, senha: string) { /* ... */ }
  private async getUserPermissions(userId: number) { /* ... */ }
  private async getUserRoles(userId: number) { /* ... */ }
}
export default new AuthService();
```
Características:
- Simples de usar: `authService.login(...)`.
- Instância única, sem controle explícito de dependências.
- Usa diretamente módulos globais (`db`, `bcrypt`, `jwt`, `process.env`).

Limitações:
- Testes unitários difíceis (não dá para trocar `db` facilmente).
- Dificulta cenários com múltiplas conexões/configurações.
- Crescimento da classe gera métodos muito grandes ou helpers privados demais.

Quando é aceitável:
- Projetos pequenos/protótipos.
- Baixa complexidade de lógica.

---
## 3. Evoluindo para Padrões Profissionais
### Visão Geral dos Padrões
| Padrão | Quando Usar | Vantagens | Desvantagens |
|--------|-------------|-----------|--------------|
| Classe Singleton | Protótipos | Simplicidade | Pouca flexibilidade/testes |
| Funções de Módulo (Puras) | Regras simples sem estado | Testável, enxuto | Pode virar "script bag" se mal organizado |
| Fábrica (Factory) | Quando precisa compor dependências | Separação clara, configurável | Mais passos de setup |
| Classe com DI via construtor | Quando usa estado privado ou muitos helpers | Encapsulamento + flexibilidade | Boilerplate moderado |
| Repositórios + Services | Domínio mais rico, muitas queries | Clareza e isolamento | Mais arquivos/camadas |
| Container IoC (typedi, tsyringe) | Projeto grande/escalável modular | Automação de injeção | Complexidade inicial |

---
## 4. Funções de Módulo / Fábrica
A ideia é expor uma função `createAuthService(deps)` que recebe dependências e retorna métodos.

### Exemplo Aplicado
```ts
// src/main/services/authService.factory.ts
import type { Knex } from 'knex';
import type { LoginResponse } from '../types';

// Contrato das dependências que vamos injetar
type Deps = {
  db: Knex;
  bcrypt: { compare(a: string, b: string): Promise<boolean> };
  jwt: { sign(payload: any, secret: string, opts?: any): string };
  jwtSecret: string;
  logger?: Pick<Console, 'error'>;
};

export function createAuthService({ db, bcrypt, jwt, jwtSecret, logger = console }: Deps) {
  // Função auxiliar isolada
  const getUserPermissions = async (userId: number): Promise<string[]> => {
    try {
      return (await db('allowed')
        .join('roles_allowed', 'allowed.id', '=', 'roles_allowed.allowed_id')
        .join('role_users', 'roles_allowed.roles_id', '=', 'role_users.roles_id')
        .where('role_users.users_id', userId)
        .distinct('allowed.permission_name')
        .pluck('permission_name')) as string[];
    } catch (e) {
      logger.error('Erro ao buscar permissões:', e);
      return [];
    }
  };

  const getUserRoles = async (userId: number): Promise<string[]> => {
    try {
      return (await db('roles')
        .join('role_users', 'roles.id', '=', 'role_users.roles_id')
        .where('role_users.users_id', userId)
        .distinct('roles.role_name')
        .pluck('role_name')) as string[];
    } catch (e) {
      logger.error('Erro ao buscar cargos:', e);
      return [];
    }
  };

  const login = async (usuario: string, senha: string): Promise<LoginResponse> => {
    try {
      const user = await db('users').where({ login: usuario }).first();
      if (!user) return { success: false, message: 'Usuário ou senha inválidos' };
      if (user.status === false) return { success: false, message: 'Usuário desativado' };

      const ok = await bcrypt.compare(senha, user.password_hash);
      if (!ok) return { success: false, message: 'Usuário ou senha inválidos' };

      if (!jwtSecret) {
        logger.error('JWT_SECRET ausente');
        return { success: false, message: 'Não foi possível gerar token' };
      }

      // Requisições paralelas:
      const [permissions, roles] = await Promise.all([
        getUserPermissions(user.id),
        getUserRoles(user.id)
      ]);

      const token = jwt.sign(
        { sub: String(user.id), user: user.login, roles, permissions },
        jwtSecret,
        { expiresIn: '8h', algorithm: 'HS256' }
      );

      return { success: true, message: 'Login bem-sucedido!', token };
    } catch (e) {
      logger.error('[AuthService.login] ', e);
      return { success: false, message: 'Erro de comunicação com o servidor.' };
    }
  };

  // Interface pública
  return { login };
}
```
Instanciação:
```ts
// src/main/services/index.ts
import db from '../db/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createAuthService } from './authService.factory';

export const authService = createAuthService({
  db,
  bcrypt,
  jwt,
  jwtSecret: process.env.JWT_SECRET || ''
});
```
Uso em rota:
```ts
import { authService } from '../services';
const result = await authService.login(usuario, senha);
```

### Vantagens
- Teste: só trocar as dependências (injeção manual).
- Sem necessidade de `new` ou herança.
- Facilmente segmentável em múltiplos arquivos.

### Quando evitar
- Quando há necessidade forte de atributos privados mutáveis (estado interno).

---
## 5. Classe com Injeção de Dependências
Mantém encapsulamento e permite privates, mas com flexibilidade.

```ts
// src/main/services/authService.ts
import type { Knex } from 'knex';
import type { LoginResponse } from '../types';

type Deps = {
  db: Knex;
  bcrypt: { compare(a: string, b: string): Promise<boolean> };
  jwt: { sign(payload: any, secret: string, opts?: any): string };
  jwtSecret: string;
  logger?: Pick<Console, 'error'>;
};

export class AuthService {
  constructor(private deps: Deps) {}

  private async getUserPermissions(userId: number): Promise<string[]> { /* ... */ }
  private async getUserRoles(userId: number): Promise<string[]> { /* ... */ }

  async login(usuario: string, senha: string): Promise<LoginResponse> {
    const { db, bcrypt, jwt, jwtSecret, logger = console } = this.deps;
    try {
      const user = await db('users').where({ login: usuario }).first();
      if (!user) return { success: false, message: 'Usuário ou senha inválidos' };
      if (user.status === false) return { success: false, message: 'Usuário desativado' };

      if (!(await bcrypt.compare(senha, user.password_hash))) {
        return { success: false, message: 'Usuário ou senha inválidos' };
      }

      if (!jwtSecret) {
        logger.error('JWT_SECRET ausente');
        return { success: false, message: 'Não foi possível gerar token' };
      }

      const [permissions, roles] = await Promise.all([
        this.getUserPermissions(user.id),
        this.getUserRoles(user.id)
      ]);

      const token = jwt.sign(
        { sub: String(user.id), user: user.login, roles, permissions },
        jwtSecret,
        { expiresIn: '8h', algorithm: 'HS256' }
      );

      return { success: true, message: 'Login bem-sucedido!', token };
    } catch (e) {
      logger.error('[AuthService.login] ', e);
      return { success: false, message: 'Erro de comunicação com o servidor.' };
    }
  }
}
```
Instância:
```ts
// src/main/services/authService.instance.ts
import db from '../db/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthService } from './authService';

export const authService = new AuthService({
  db,
  bcrypt,
  jwt,
  jwtSecret: process.env.JWT_SECRET || ''
});
```

### Vantagens
- Métodos privados verdadeiros.
- Evolução para adicionar cache interno simples.
- Familiar para devs OOP.

### Desvantagens
- Boilerplate leve.
- Testes requerem instância manual.

---
## 6. Repositórios + Services
Separar acesso a dados (`UserRepository`) da lógica de negócio (`AuthService`). Ajuda quando queries crescem.

Exemplo:
```ts
// src/main/repositories/userRepository.ts
import type { Knex } from 'knex';
export class UserRepository {
  constructor(private db: Knex) {}
  findByLogin(login: string) {
    return this.db('users').where({ login }).first();
  }
  getPermissions(userId: number) { /* ... queries ... */ }
  getRoles(userId: number) { /* ... queries ... */ }
}
```
Service usando repositório:
```ts
// src/main/services/authService.ts
import type { LoginResponse } from '../types';
import { UserRepository } from '../repositories/userRepository';

export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private bcrypt: { compare(a: string, b: string): Promise<boolean> },
    private jwt: { sign(payload: any, secret: string, opts?: any): string },
    private jwtSecret: string,
    private logger: Pick<Console, 'error'> = console
  ) {}

  async login(usuario: string, senha: string): Promise<LoginResponse> {
    try {
      const user = await this.userRepo.findByLogin(usuario);
      if (!user) return { success: false, message: 'Credenciais inválidas' };
      if (user.status === false) return { success: false, message: 'Usuário desativado' };

      if (!(await this.bcrypt.compare(senha, user.password_hash))) {
        return { success: false, message: 'Credenciais inválidas' };
      }

      if (!this.jwtSecret) {
        this.logger.error('JWT_SECRET ausente');
        return { success: false, message: 'Não foi possível gerar token' };
      }

      const [permissions, roles] = await Promise.all([
        this.userRepo.getPermissions(user.id),
        this.userRepo.getRoles(user.id)
      ]);

      const token = this.jwt.sign(
        { sub: String(user.id), user: user.login, roles, permissions },
        this.jwtSecret,
        { expiresIn: '8h' }
      );

      return { success: true, message: 'Login bem-sucedido!', token };
    } catch (e) {
      this.logger.error('[AuthService.login] ', e);
      return { success: false, message: 'Erro interno' };
    }
  }
}
```

### Trade-offs
- Mais arquivos, mas cada responsabilidade fica clara.
- Fácil adicionar cache, métricas, auditoria.

---
## 7. Container de Injeção (Opcional)
Bibliotecas como `tsyringe`, `typedi` ou `inversify` permitem registrar e resolver dependências automaticamente. Use apenas se seu projeto começa a ter muitos services e repositórios interdependentes.

Exemplo breve com `tsyringe`:
```ts
import 'reflect-metadata';
import { container, injectable, inject } from 'tsyringe';

@injectable()
class UserRepository { /* ... */ }

@injectable()
class AuthService {
  constructor(
    @inject(UserRepository) private userRepo: UserRepository,
    @inject('Bcrypt') private bcrypt: any,
    @inject('JWT') private jwt: any,
    @inject('JWT_SECRET') private secret: string
  ) {}
  /* ... */
}

// Registro manual de instâncias simples
container.register('Bcrypt', { useValue: bcrypt });
container.register('JWT', { useValue: jwt });
container.register('JWT_SECRET', { useValue: process.env.JWT_SECRET });

// Resolução
const authService = container.resolve(AuthService);
```

### Por que talvez NÃO agora
- Aumenta complexidade inicial.
- Requer disciplina em decoradores e metadados.

---
## 8. Testabilidade
Padrões com injeção facilitam mocks:
```ts
// Exemplo de teste com fábrica
import { createAuthService } from '../src/main/services/authService.factory';

const fakeDb = jest.fn() as any; // ou construir objeto que respeite interface do Knex
const fakeBcrypt = { compare: async () => true };
const fakeJwt = { sign: () => 'fake.token' };

const svc = createAuthService({
  db: fakeDb,
  bcrypt: fakeBcrypt,
  jwt: fakeJwt,
  jwtSecret: 'secret'
});

// svc.login(...)
```
Sem DI, seria preciso fazer `jest.mock('../db/db')`, aumentando acoplamento.

---
## 9. Boas Práticas Gerais
- Evitar retornar mensagens diferentes para usuário inexistente vs senha errada (mitigar user enumeration).
- Use `Promise.all` para chamadas paralelas independentes.
- Payload JWT: inclua `sub` (subject) e evite informações sensíveis.
- Centralize variáveis de ambiente em um módulo de config.
- Padronize objeto de resposta: `{ success, message, data?, errorCode? }`.
- Limite responsabilidade: service não deve saber de `res.status`.

---
## 10. Plano de Migração Incremental
1. Extrair leitura de `JWT_SECRET` para ponto de composição (`services/index.ts`).
2. Converter `authService` para fábrica (menos intrusivo). Testar rota de login.
3. Separar queries volumosas para um `UserRepository` se começar a duplicar lógica.
4. Padronizar outros services para mesmo estilo.
5. (Opcional) Introduzir container DI se número de dependências > 6–8.

---
## 11. Checklist de Qualidade
- [ ] Dependências externas injetadas? (`db`, `jwtSecret`, libs principais)
- [ ] Erros logados com contexto? (prefixos como `[AuthService.login]`)
- [ ] Mensagens de erro não revelam detalhes sensíveis?
- [ ] Queries isoladas ou reutilizadas?
- [ ] Teste unitário simples para caso de sucesso e falha de credenciais?

---
## 12. Exemplo Final Resumido (Fábrica + Uso)
```ts
// services/index.ts
import db from '../db/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createAuthService } from './authService.factory';

export const authService = createAuthService({
  db,
  bcrypt,
  jwt,
  jwtSecret: process.env.JWT_SECRET || ''
});
```
```ts
// routes/authRoute.ts
import { authService } from '../services';
import { Request, Response } from 'express';

export async function loginRoute(req: Request, res: Response) {
  const { usuario, senha } = req.body;
  const result = await authService.login(usuario, senha);
  if (!result.success) return res.status(401).json(result);
  res.json(result);
}
```

---
## 13. Conclusão
Não existe "o único" padrão correto. A chave é tornar dependências explícitas, separar responsabilidades e facilitar testes. Comece pequeno: migre `authService` para fábrica, injete segredos, e quando necessário, evolua para repositórios ou container DI.

Siga incrementalmente; cada passo melhora robustez sem reescrever tudo.

---
### Próximos Passos Sugeridos
1. Implementar fábrica no `authService`.
2. Criar arquivo `services/index.ts` agregando services.
3. Reutilizar padrão em `userService` e `roleService`.
4. Adicionar teste unitário para `login`.

Qualquer dúvida sobre a migração prática, posso aplicar a refatoração real nos arquivos. Basta pedir.
