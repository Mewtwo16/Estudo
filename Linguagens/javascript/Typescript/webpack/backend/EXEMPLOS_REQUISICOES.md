# Exemplos de Requisições - API RESTful

Este arquivo contém exemplos de como testar todas as rotas da API usando `curl` ou qualquer cliente HTTP (Postman, Insomnia, etc.).

## 📋 Pré-requisito

Certifique-se de que o servidor está rodando:
```bash
npm run dev
```

---

## 1. GET / - Informações da API

### Curl:
```bash
curl http://localhost:3001/
```

### Resposta esperada:
```json
{
  "message": "API RESTful TypeScript está rodando! 🚀",
  "version": "1.0.0",
  "timestamp": "2025-11-16T...",
  "endpoints": {
    "users": "/api/users",
    "singleUser": "/api/users/:id"
  }
}
```

---

## 2. GET /api/users - Listar todos os usuários

### Curl:
```bash
curl http://localhost:3001/api/users
```

### Com filtro por nome:
```bash
curl "http://localhost:3001/api/users?name=João"
```

### Com filtro por idade:
```bash
curl "http://localhost:3001/api/users?age=25"
```

### Resposta esperada:
```json
{
  "total": 3,
  "users": [
    { "id": 1, "name": "João Silva", "email": "joao@example.com", "age": 25 },
    { "id": 2, "name": "Maria Santos", "email": "maria@example.com", "age": 30 },
    { "id": 3, "name": "Pedro Oliveira", "email": "pedro@example.com", "age": 28 }
  ]
}
```

---

## 3. GET /api/users/:id - Buscar usuário específico

### Curl:
```bash
curl http://localhost:3001/api/users/1
```

### Resposta esperada (sucesso):
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "age": 25
}
```

### Resposta esperada (não encontrado):
```bash
curl http://localhost:3001/api/users/999
```
```json
{
  "error": "Usuário não encontrado",
  "id": 999
}
```

---

## 4. POST /api/users - Criar novo usuário

### Curl:
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Costa",
    "email": "ana@example.com",
    "age": 27
  }'
```

### Sem a idade (campo opcional):
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos Silva",
    "email": "carlos@example.com"
  }'
```

### Resposta esperada (sucesso):
```json
{
  "message": "Usuário criado com sucesso!",
  "user": {
    "id": 4,
    "name": "Ana Costa",
    "email": "ana@example.com",
    "age": 27
  }
}
```

### Resposta esperada (erro - campos obrigatórios faltando):
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Teste"}'
```
```json
{
  "error": "Nome e email são obrigatórios",
  "received": { "name": "Teste" }
}
```

### Resposta esperada (erro - email duplicado):
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Outro João",
    "email": "joao@example.com"
  }'
```
```json
{
  "error": "Email já cadastrado",
  "existingUser": { "id": 1, "name": "João Silva", "email": "joao@example.com", "age": 25 }
}
```

---

## 5. PUT /api/users/:id - Atualizar usuário completo

**Diferença PUT vs PATCH:**
- **PUT**: Substitui TODO o recurso (todos os campos obrigatórios devem ser enviados)
- **PATCH**: Atualiza apenas os campos enviados

### Curl:
```bash
curl -X PUT http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Atualizado",
    "email": "joao.novo@example.com",
    "age": 26
  }'
```

### Resposta esperada (sucesso):
```json
{
  "message": "Usuário atualizado com sucesso!",
  "user": {
    "id": 1,
    "name": "João Silva Atualizado",
    "email": "joao.novo@example.com",
    "age": 26
  }
}
```

### Resposta esperada (erro - campos obrigatórios faltando):
```bash
curl -X PUT http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "João"}'
```
```json
{
  "error": "Nome e email são obrigatórios no PUT"
}
```

---

## 6. PATCH /api/users/:id - Atualizar usuário parcialmente

### Atualizar apenas o nome:
```bash
curl -X PATCH http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva Junior"}'
```

### Atualizar apenas a idade:
```bash
curl -X PATCH http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"age": 30}'
```

### Atualizar múltiplos campos:
```bash
curl -X PATCH http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "age": 31
  }'
```

### Resposta esperada (sucesso):
```json
{
  "message": "Usuário atualizado parcialmente com sucesso!",
  "user": {
    "id": 1,
    "name": "João Silva Junior",
    "email": "joao@example.com",
    "age": 25
  }
}
```

---

## 7. DELETE /api/users/:id - Deletar usuário

### Curl:
```bash
curl -X DELETE http://localhost:3001/api/users/1
```

### Resposta esperada (sucesso):
```json
{
  "message": "Usuário deletado com sucesso!",
  "deletedUser": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "age": 25
  }
}
```

### Resposta esperada (não encontrado):
```bash
curl -X DELETE http://localhost:3001/api/users/999
```
```json
{
  "error": "Usuário não encontrado",
  "id": 999
}
```

---

## 🎯 Status HTTP Códigos Usados

- **200 OK**: Requisição bem-sucedida (GET, PUT, PATCH, DELETE)
- **201 Created**: Recurso criado com sucesso (POST)
- **400 Bad Request**: Dados inválidos ou faltando
- **404 Not Found**: Recurso não encontrado
- **409 Conflict**: Conflito (ex: email duplicado)

---

## 💡 Dicas para Testar

### Usando Postman ou Insomnia:
1. Crie uma nova coleção chamada "API TypeScript"
2. Adicione as requisições acima
3. Configure o header `Content-Type: application/json`
4. Teste cada rota e observe as respostas

### Usando VS Code REST Client:
Instale a extensão "REST Client" e crie um arquivo `.http` com as requisições.

### Testando a sequência completa:
```bash
# 1. Listar usuários
curl http://localhost:3001/api/users

# 2. Criar um novo
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Teste", "email": "teste@example.com", "age": 20}'

# 3. Buscar o criado (use o ID retornado)
curl http://localhost:3001/api/users/4

# 4. Atualizar parcialmente
curl -X PATCH http://localhost:3001/api/users/4 \
  -H "Content-Type: application/json" \
  -d '{"age": 21}'

# 5. Deletar
curl -X DELETE http://localhost:3001/api/users/4

# 6. Verificar que foi deletado
curl http://localhost:3001/api/users/4
```

---

## 🚀 Próximos Passos para Estudo

1. **Validação avançada**: Use bibliotecas como Zod ou Yup
2. **Banco de dados**: Integre com MongoDB (Mongoose) ou PostgreSQL (Prisma)
3. **Autenticação**: Adicione JWT para rotas protegidas
4. **Testes**: Escreva testes com Jest ou Vitest
5. **Documentação**: Use Swagger/OpenAPI
6. **Paginação**: Adicione limites e offsets nas listagens
7. **Relacionamentos**: Crie outras entidades (Posts, Comments, etc.)
