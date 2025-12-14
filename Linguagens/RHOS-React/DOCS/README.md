# 📚 Documentação Completa - RHOS

## Sistema de Gestão de Recursos Humanos

**Versão**: 1.0.0  
**Autor**: André Ricardo  
**Stack**: Electron + React + TypeScript + MySQL 8+  
**Última Atualização**: Novembro 2025

---

## 📖 Índice Geral

Este é o índice completo de toda a documentação do projeto RHOS. A documentação está dividida em seções para facilitar a consulta e manutenção.

### 📋 Documentos Disponíveis

- **[PONTOS_FORTES_PROJETO.md](./PONTOS_FORTES_PROJETO.md)** - Análise detalhada dos 10 principais pontos fortes do projeto
- **[Frontend](./Frontend/FRONTEND.md)** - Documentação completa do frontend React + Electron
- **[Backend](./backend/)** - Documentação do backend em 5 partes
- **[Documentação Técnica](./docs/)** - Guias específicos de implementação
- **[insomnia.json](./insomnia.json)** - Coleção de requisições para teste da API

---

## 🖥️ Frontend

### [FRONTEND.md](./Frontend/FRONTEND.md)
Documentação completa do frontend React + Electron.

**Tecnologias**:
- ⚛️ React 19.1.1
- 📘 TypeScript 5.9.2
- 🖥️ Electron 38.1.2
- 🔀 React Router DOM 7.9.4
- 🔌 Electron Router DOM 2.1.0

**Conteúdo**:
1. Visão Geral
2. Arquitetura
3. Tecnologias Utilizadas
4. Estrutura de Pastas
5. Sistema de Autenticação
6. Componentes (Header, Layout, ProtectedRoute, ModalCalculoFolha)
7. Páginas (Login, Home, Usuários, Perfis, Cargos, Funcionários, Logs)
8. Sistema de Rotas
9. Estilização
10. Utilitários
11. Integração Electron
12. Fluxos de Usuário
13. Gerenciamento de Estado
14. Segurança

---

## ⚙️ Backend

A documentação do backend está dividida em 5 partes para facilitar a navegação:

### [BACKEND-01-OVERVIEW.md](./BACKEND-01-OVERVIEW.md)
**Parte 1: Visão Geral e Arquitetura**

**Conteúdo**:
1. Visão Geral
2. Arquitetura (Layered Architecture)
3. Stack Tecnológico
4. Estrutura de Pastas
5. Arquivo de Configuração (.env)
6. Inicialização do Servidor
7. Sistema de Types
8. Middlewares Globais
9. Padrões de Desenvolvimento
10. Tratamento de Erros
11. Logging e Auditoria

---

### [BACKEND-02-DATABASE.md](./backend/BACKEND-02-DATABASE.md)
**Parte 2: Banco de Dados e Schema**

**Banco de Dados**: MySQL 8+ com charset UTF8MB4

**Conteúdo**:
1. Visão Geral do Banco
2. Diagrama de Relacionamentos
3. Tabelas
   - **users** - Usuários do sistema
   - **profiles** - Perfis de acesso (antes: roles)
   - **allowed** - Catálogo de permissões
   - **profile_users** - Relacionamento usuário ↔ perfis
   - **profile_permissions** - Relacionamento perfil ↔ permissões
   - **audit_logs** - Auditoria completa (WHO, WHAT, WHERE, WHEN)
   - **positions** - Cargos e estrutura salarial
   - **employees** - Cadastro completo de funcionários
4. Relacionamentos
5. Queries Comuns
6. Configuração Knex.js (mysql2 driver)
7. Transações
8. Dados Iniciais (usuário admin padrão)

---

### [BACKEND-03-AUTH.md](./BACKEND-03-AUTH.md)
**Parte 3: Autenticação e Autorização**

**Conteúdo**:
1. Visão Geral
2. Fluxo de Autenticação
3. JWT (JSON Web Tokens)
   - Estrutura do Token
   - Geração e Validação
   - Expiração
4. Criptografia de Senhas (bcrypt)
5. Middleware de Autorização
6. Validação de Payloads (Joi)
7. Sistema de Permissões
8. Segurança

---

### [BACKEND-04-SERVICES.md](./backend/BACKEND-04-SERVICES.md)
**Parte 4: Serviços e Lógica de Negócio**

**Total de Services**: 8 módulos organizados

**Conteúdo**:
1. Visão Geral
2. **AuthService**
   - login()
   - getUserPermissions()
   - getUserRoles()
3. **UserService**
   - addUser()
   - showUser()
   - listAllUsers()
   - updateUser()
4. **ProfileService** (antes: RoleService)
   - addProfile()
   - searchProfiles()
   - listAllProfiles()
   - updateProfile()
5. **EmployeeService** (NOVO)
   - listarFuncionarios()
   - buscarFuncionarioPorId()
   - criarFuncionario()
   - atualizarFuncionario()
   - calcularFolhaPagamento()
6. **PositionService** (NOVO)
   - listarCargos()
   - buscarCargoPorId()
   - criarCargo()
   - atualizarCargo()
7. **LogService**
   - write()
   - list()
8. **AllowedService**
   - listAllPermissions()
9. **HealthService**
   - checkHealth()
10. Padrões de Service
11. Tratamento de Erros
12. Transações

---

### [BACKEND-05-API.md](./backend/BACKEND-05-API.md)
**Parte 5: Endpoints e Rotas da API**

**Base URL**: `http://localhost:4040/api`

**Conteúdo**:
1. Visão Geral
2. Estrutura de Rotas
3. **Autenticação**
   - POST /api/login
4. **Usuários**
   - POST /api/users
   - GET /api/users/:id
   - GET /api/users
   - PUT /api/users/:id
   - DELETE /api/users/:id
5. **Perfis** (antes: Cargos/Roles)
   - POST /api/profiles
   - GET /api/profiles/:id
   - GET /api/profiles
   - PUT /api/profiles/:id
   - DELETE /api/profiles/:id
6. **Cargos** (NOVO - Positions)
   - POST /api/positions
   - GET /api/positions/:id
   - GET /api/positions
   - PUT /api/positions/:id
   - DELETE /api/positions/:id
7. **Funcionários** (NOVO - Employees)
   - POST /api/employees
   - GET /api/employees/:id
   - GET /api/employees
   - PUT /api/employees/:id
   - DELETE /api/employees/:id
   - POST /api/employees/calculate (Cálculo de folha)
8. **Permissões**
   - GET /api/allowed
9. **Logs**
   - GET /api/logs
10. **Health Check**
    - GET /api/health
11. Códigos de Status HTTP
12. Exemplos de Requisições (curl e fetch)

---

## � Documentação Técnica Complementar

Guias técnicos específicos localizados em `./docs/`:

### [PERMISSOES_RBAC_DB.md](./docs/PERMISSOES_RBAC_DB.md)
Sistema completo de permissões RBAC (Role-Based Access Control)
- Modelagem de dados
- Convenção de nomes (`entidade:ação`)
- Integração com JWT
- Exemplos práticos

### [MIDDLEWARE_E_PERMISSOES.md](./docs/MIDDLEWARE_E_PERMISSOES.md)
Implementação de middlewares de autorização
- authenticateToken()
- requirePermissions()
- requireRoles()

### [KNEX_GUIDE.md](./docs/KNEX_GUIDE.md)
Guia completo do Knex.js
- Configuração
- Queries
- Migrations
- Transactions

### [JOI_VALIDACAO_INPUTS.md](./docs/JOI_VALIDACAO_INPUTS.md)
Validação de inputs com Joi
- Schemas de validação
- Middlewares
- Mensagens de erro

### [CSRF_E_HELMET.md](./docs/CSRF_E_HELMET.md)
Segurança adicional com CSRF e Helmet

### [ERROS_PADROES_API.md](./docs/ERROS_PADROES_API.md)
Padronização de erros e respostas da API

### [EXPRESS_SERVER.md](./docs/EXPRESS_SERVER.md)
Configuração e estrutura do servidor Express

### [FORMULARIOS_E_API.md](./docs/FORMULARIOS_E_API.md)
Integração frontend-backend

### [API_EXPOSURE.md](./docs/API_EXPOSURE.md)
Exposição e documentação da API

### [ARQUITETURA_SERVICES_E_DI.md](./docs/ARQUITETURA_SERVICES_E_DI.md)
Padrão de arquitetura em camadas e injeção de dependências

---

## 🗂️ Arquivos de Suporte

### insomnia.json
Coleção completa de requisições HTTP pré-configuradas para teste da API no Insomnia/Postman.

**Como usar**:
1. Abra Insomnia ou Postman
2. Importe o arquivo `insomnia.json`
3. Configure a variável `base_url` (http://localhost:4040)
4. Configure a variável `token` após fazer login
5. Teste todos os endpoints

---

## 🚀 Quick Start

### Pré-requisitos

```bash
# Node.js 18+
node --version

# MySQL 8.0+
mysql --version

# npm ou yarn
npm --version
```

### Configuração

1. **Clone o repositório**
```bash
git clone <repo-url>
cd RHOS
```

2. **Instale dependências**
```bash
npm install
```

3. **Configure variáveis de ambiente**
```bash
# Crie arquivo .env na raiz do projeto
cp .env.example .env

# Edite .env com suas configurações
EXPRESS_PORT=4040
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=RHOS
JWT_SECRET=chave_super_secreta_123
```

4. **Crie banco de dados**
```bash
# Execute o script SQL
mysql -u root -p < src/main/database/database.sql
```

5. **Inicie a aplicação**
```bash
npm start
```

6. **Acesse o sistema**
```
Login: admin
Senha: admin123
```

---

## 📊 Arquitetura Geral

```
┌────────────────────────────────────────────────────────────────────┐
│                           ELECTRON APP                              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                      MAIN PROCESS                             │  │
│  │  - Gerencia janelas (BrowserWindow)                           │  │
│  │  - Inicia servidor Express na porta 4040                      │  │
│  │  - IPC Communication (preload scripts)                        │  │
│  │  - Lifecycle management                                       │  │
│  └──────────────────┬────────────────────────────────┬──────────┘  │
│                     │                                │             │
│  ┌──────────────────▼──────────┐  ┌─────────────────▼──────────┐  │
│  │   RENDERER (React 19)       │  │  SERVER (Express 5)        │  │
│  │  ┌─────────────────────┐    │  │  ┌──────────────────────┐ │  │
│  │  │ Components          │    │  │  │  Middlewares         │ │  │
│  │  │ - Header            │    │  │  │  - authenticateToken │ │  │
│  │  │ - Layout            │    │  │  │  - requirePermissions│ │  │
│  │  │ - ProtectedRoute    │    │  │  │  - Joi Validators    │ │  │
│  │  │ - ModalCalculoFolha │    │  │  └──────────────────────┘ │  │
│  │  └─────────────────────┘    │  │  ┌──────────────────────┐ │  │
│  │  ┌─────────────────────┐    │  │  │  Routes              │ │  │
│  │  │ Pages               │    │  │  │  - /api/login        │ │  │
│  │  │ - Login             │    │  │  │  - /api/users        │ │  │
│  │  │ - Home              │    │  │  │  - /api/profiles     │ │  │
│  │  │ - Usuarios          │    │  │  │  - /api/positions    │ │  │
│  │  │ - Perfils           │    │  │  │  - /api/employees    │ │  │
│  │  │ - Cargos            │    │  │  │  - /api/logs         │ │  │
│  │  │ - Funcionarios      │    │  │  │  - /api/health       │ │  │
│  │  │ - Logs              │    │  │  │  - /api/allowed      │ │  │
│  │  └─────────────────────┘    │  │  └──────────────────────┘ │  │
│  │  ┌─────────────────────┐    │  │  ┌──────────────────────┐ │  │
│  │  │ React Router        │◄───┼──┼──┤  Services (8)        │ │  │
│  │  │ - ProtectedRoute    │    │  │  │  - AuthService       │ │  │
│  │  │ - Public Routes     │    │  │  │  - UserService       │ │  │
│  │  └─────────────────────┘    │  │  │  - ProfileService    │ │  │
│  │                              │  │  │  - PositionService   │ │  │
│  │  localStorage (JWT)          │  │  │  - EmployeeService   │ │  │
│  └──────────────┬───────────────┘  │  │  - LogService        │ │  │
│                 │                   │  │  - AllowedService    │ │  │
│                 │ HTTP/fetch        │  │  - HealthService     │ │  │
│                 │ Authorization:    │  └──────────┬───────────┘ │  │
│                 │ Bearer <JWT>      │             │             │  │
│                 └───────────────────┼─────────────┘             │  │
│                                     │                           │  │
│                                     ▼                           │  │
│                            ┌─────────────────────────────────┐  │  │
│                            │    MySQL 8+ Database            │  │  │
│                            │    (Knex.js Query Builder)      │  │  │
│                            │  ┌───────────────────────────┐  │  │  │
│                            │  │ Tables:                   │  │  │  │
│                            │  │ - users                   │  │  │  │
│                            │  │ - profiles                │  │  │  │
│                            │  │ - allowed                 │  │  │  │
│                            │  │ - profile_users           │  │  │  │
│                            │  │ - profile_permissions     │  │  │  │
│                            │  │ - positions               │  │  │  │
│                            │  │ - employees               │  │  │  │
│                            │  │ - audit_logs              │  │  │  │
│                            │  └───────────────────────────┘  │  │  │
│                            │  Charset: UTF8MB4             │  │  │
│                            │  Collation: utf8mb4_unicode_ci│  │  │
│                            └─────────────────────────────────┘  │  │
└────────────────────────────────────────────────────────────────────┘

Legenda:
→  Comunicação HTTP/REST
◄─ Respostas JSON
```

---

## 🔐 Permissões do Sistema

### Formato
```
<entidade>:<ação>
```

### Entidades
- **users** - Usuários do sistema
- **profiles** - Perfis de acesso
- **permissions** - Permissões
- **positions** - Cargos/Posições
- **employees** - Funcionários
- **logs** - Logs de auditoria

### Ações
- **create** - Criar
- **read** - Ler detalhes
- **update** - Atualizar
- **delete** - Deletar
- **view** - Visualizar lista
- **calculate** - Calcular (específico para employees)

### Lista Completa (29 Permissões)

| Permissão | Descrição |
|-----------|-----------|
| `users:create` | Criar usuários |
| `users:read` | Ler detalhes de usuário |
| `users:update` | Atualizar usuário |
| `users:delete` | Deletar usuário |
| `users:view` | Listar usuários |
| `profiles:create` | Criar perfis |
| `profiles:read` | Ler detalhes de perfil |
| `profiles:update` | Atualizar perfil |
| `profiles:delete` | Deletar perfil |
| `profiles:view` | Listar perfis |
| `permissions:view` | Visualizar permissões disponíveis |
| `positions:create` | Criar cargos |
| `positions:read` | Ler detalhes de cargo |
| `positions:update` | Atualizar cargo |
| `positions:delete` | Deletar cargo |
| `positions:view` | Listar cargos |
| `employees:create` | Cadastrar funcionários |
| `employees:read` | Ler detalhes de funcionário |
| `employees:update` | Atualizar funcionário |
| `employees:delete` | Deletar funcionário |
| `employees:view` | Listar funcionários |
| `employees:calculate` | Calcular folha de pagamento |
| `logs:read` | Ler logs detalhados |
| `logs:view` | Listar logs |

**Perfil Administrador**: Possui todas as 24 permissões por padrão

---

## 📝 Convenções de Código

### Backend (TypeScript)

```typescript
// Interfaces em PascalCase
interface User { }
interface AuthRequest { }

// Classes em PascalCase
class UserService { }

// Funções e variáveis em camelCase
async function addUser() { }
const userName = 'João'

// Constantes em UPPER_SNAKE_CASE
const JWT_SECRET = process.env.JWT_SECRET
```

### Frontend (React + TypeScript)

```typescript
// Componentes em PascalCase
function Header() { }
function ProtectedRoute() { }

// Hooks e funções em camelCase
const [users, setUsers] = useState()
const handleSubmit = () => { }

// Classes CSS em kebab-case
.login-container { }
.close-button { }
```

---

## 🧪 Testes

### Estrutura de Testes (Futura)

```
tests/
├── unit/                    # Testes unitários
│   ├── services/            # Tests dos services
│   └── utils/               # Tests dos utilitários
├── integration/             # Testes de integração
│   └── api/                 # Tests dos endpoints
└── e2e/                     # Testes end-to-end
    └── flows/               # Tests de fluxos completos
```

---

## 🐛 Troubleshooting

### Problema: Não consegue conectar ao MySQL

**Solução**:
```bash
# Verifique se MySQL está rodando
sudo systemctl status mysql

# Teste conexão
mysql -u root -p

# Verifique credenciais no .env
cat .env | grep DB_
```

### Problema: Token expirado

**Solução**:
- Tokens expiram em 8 horas
- Faça login novamente
- Token é salvo no localStorage do navegador

### Problema: Erro de permissão

**Solução**:
- Verifique se o usuário tem a permissão necessária
- Consulte cargos e permissões no banco de dados
- Use usuário `admin` para acesso total

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Consulte a documentação específica
2. Verifique os logs do servidor (console)
3. Consulte logs de auditoria (tabela `audit_logs`)
4. Abra uma issue no repositório

---

## � Funcionalidades Implementadas

### ✅ Módulo de Autenticação
- Login com JWT
- Sessão de 8 horas
- Logout automático em caso de token expirado
- Proteção de rotas no frontend

### ✅ Módulo de Usuários
- Cadastro com validação de CPF
- Listagem com filtros
- Edição de dados
- Desativação de usuários
- Atribuição de perfis

### ✅ Módulo de Perfis
- Criação de perfis personalizados
- Gerenciamento de permissões granulares
- Visualização de permissões por perfil
- Sistema RBAC completo

### ✅ Módulo de Cargos (Positions)
- Cadastro de cargos
- Definição de salário base
- Carga horária semanal
- Níveis hierárquicos
- Departamentos

### ✅ Módulo de Funcionários
- Cadastro completo (dados pessoais, contato, endereço)
- Dados trabalhistas (cargo, admissão, contrato)
- Dados bancários
- Benefícios (vale transporte, refeição, planos)
- Documentos (CTPS, PIS/PASEP, título eleitor)
- **Cálculo automático de folha de pagamento**
  - INSS com faixas progressivas
  - IRRF com dedução de dependentes
  - Vale transporte (6%)
  - FGTS (8%)
  - Encargos patronais (INSS, RAT, Sistema S)

### ✅ Módulo de Auditoria
- Log automático de todas as ações
- Registro de WHO, WHAT, WHERE, WHEN
- Consulta de logs com filtros
- Rastreabilidade completa

### ✅ Sistema de Segurança
- Senhas criptografadas com bcrypt
- JWT para autenticação stateless
- Middlewares de autorização
- Validação de inputs com Joi
- Proteção contra SQL injection
- CORS configurado

---

## 📈 Estatísticas do Projeto

### Código
- **Linguagem Principal**: TypeScript (100%)
- **Total de Services**: 8 módulos
- **Total de Routes**: 9 endpoints principais
- **Total de Middlewares**: 3 + validadores
- **Total de Páginas**: 7 interfaces
- **Total de Componentes**: 4 reutilizáveis

### Banco de Dados
- **Tabelas**: 8
- **Relacionamentos**: 6 foreign keys
- **Índices**: 15 otimizados
- **Permissões**: 24 granulares
- **Charset**: UTF8MB4 (suporta emojis)

### Documentação
- **Arquivos de Documentação**: 15+
- **Linhas de Documentação**: 3000+
- **Guias Técnicos**: 10
- **Diagramas**: 5+

---

## �🔄 Versionamento

**Versão Atual**: 1.0.0

**Histórico**:
- **1.0.0** (2025-11-21) - Versão completa com:
  - Sistema de autenticação JWT
  - Gestão de usuários e perfis
  - Gestão de cargos e funcionários
  - Cálculo de folha de pagamento
  - Sistema de auditoria completo
  - Documentação técnica completa
  - Compatibilidade MySQL 8+
  - Interface desktop com Electron

---

## 🎯 Roadmap Futuro

### Versão 1.1.0 (Próximos 3 meses)
- [ ] Dashboard com KPIs e gráficos
- [ ] Exportação de relatórios em PDF
- [ ] Sistema de notificações
- [ ] Busca avançada com filtros múltiplos
- [ ] Testes unitários e integração

### Versão 1.2.0 (Médio Prazo)
- [ ] Aplicativo mobile (React Native)
- [ ] Backup automático do banco
- [ ] Módulo de ponto eletrônico
- [ ] Integração com e-Social
- [ ] Multi-idiomas (i18n)

### Versão 2.0.0 (Longo Prazo)
- [ ] Multi-tenancy (SaaS)
- [ ] Deploy em cloud
- [ ] API pública documentada
- [ ] Módulo de recrutamento
- [ ] Módulo financeiro

---

## 📄 Licença

Este projeto é de propriedade de **André Ricardo**.

**Direitos Reservados** © 2025

---

## 👥 Autor

**André Ricardo**  
Desenvolvedor Full Stack  
Especialista em TypeScript, React e Node.js

---

## 🆘 Suporte e Contato

Para dúvidas, sugestões ou problemas:

1. 📖 Consulte a documentação específica
2. 🔍 Verifique os logs do servidor (terminal)
3. 📋 Consulte audit_logs no banco de dados
4. 🐛 Abra uma issue no repositório
5. 📧 Entre em contato com o desenvolvedor

---

**Última atualização**: 21 de Novembro de 2025
