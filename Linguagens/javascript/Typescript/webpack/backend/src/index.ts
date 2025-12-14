import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

// ==========================================
// MIDDLEWARES
// ==========================================

// Middleware para processar JSON no body das requisições
// Sem isso, não conseguimos ler req.body em POST/PUT
app.use(express.json());

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
// Permite que o frontend (porta 3000) se comunique com o backend (porta 3001)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite qualquer origem (em produção, especifique o domínio)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Métodos HTTP permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Headers permitidos
    next(); // Passa para o próximo middleware/rota
});

// ==========================================
// INTERFACES E TIPOS
// ==========================================

// Interface define a estrutura de um usuário
// O TypeScript vai garantir que todos os usuários sigam essa estrutura
interface User {
    id: number;
    name: string;
    email: string;
    age?: number; // O '?' indica que é opcional
}

// ==========================================
// "BANCO DE DADOS" (Array em memória)
// ==========================================

// Em produção, isso seria um banco de dados real (MongoDB, PostgreSQL, etc.)
// Aqui usamos um array para facilitar o estudo
let users: User[] = [
    { id: 1, name: 'João Silva', email: 'joao@example.com', age: 25 },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com', age: 30 },
    { id: 3, name: 'Pedro Oliveira', email: 'pedro@example.com', age: 28 }
];

// Variável para controlar o próximo ID (auto-incremento)
let nextId = 4;

// ==========================================
// ROTA RAIZ (GET /)
// ==========================================

// Rota de boas-vindas para testar se o servidor está funcionando
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'API RESTful TypeScript está rodando! 🚀',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            users: '/api/users',
            singleUser: '/api/users/:id'
        }
    });
});

// ==========================================
// CRUD - CREATE (POST)
// ==========================================

// POST /api/users - Criar um novo usuário
// Body esperado: { "name": "Nome", "email": "email@example.com", "age": 25 }
app.post('/api/users', (req: Request, res: Response) => {
    // Extrai os dados do body da requisição
    const { name, email, age } = req.body;

    // Validação básica - verifica se os campos obrigatórios foram enviados
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Nome e email são obrigatórios',
            received: req.body
        });
    }

    // Validação de email duplicado
    const emailExists = users.find(u => u.email === email);
    if (emailExists) {
        return res.status(409).json({ 
            error: 'Email já cadastrado',
            existingUser: emailExists
        });
    }

    // Cria o novo usuário com ID auto-incrementado
    const newUser: User = {
        id: nextId++,
        name,
        email,
        age: age || undefined // Se age não foi enviado, fica undefined
    };

    // Adiciona o usuário ao array
    users.push(newUser);

    // Retorna status 201 (Created) e o usuário criado
    res.status(201).json({
        message: 'Usuário criado com sucesso!',
        user: newUser
    });
});

// ==========================================
// CRUD - READ (GET)
// ==========================================

// GET /api/users - Listar todos os usuários
// Suporta query params para filtros: ?name=João&age=25
app.get('/api/users', (req: Request, res: Response) => {
    // Query params são opcionais e vêm da URL
    const { name, age } = req.query;

    let filteredUsers = users;

    // Filtro por nome (case insensitive)
    if (name && typeof name === 'string') {
        filteredUsers = filteredUsers.filter(u => 
            u.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    // Filtro por idade
    if (age) {
        const ageNumber = parseInt(age as string);
        filteredUsers = filteredUsers.filter(u => u.age === ageNumber);
    }

    // Retorna os usuários (todos ou filtrados)
    res.json({
        total: filteredUsers.length,
        users: filteredUsers
    });
});

// GET /api/users/:id - Buscar um usuário específico por ID
// Exemplo: GET /api/users/1
app.get('/api/users/:id', (req: Request, res: Response) => {
    // Params vêm da URL (rota dinâmica)
    const id = parseInt(req.params.id);

    // Validação: verifica se o ID é um número válido
    if (isNaN(id)) {
        return res.status(400).json({ 
            error: 'ID inválido. Deve ser um número.',
            received: req.params.id
        });
    }

    // Busca o usuário no array
    const user = users.find(u => u.id === id);
    
    if (user) {
        // Status 200 (OK) é o padrão
        res.json(user);
    } else {
        // Status 404 (Not Found) quando o recurso não existe
        res.status(404).json({ 
            error: 'Usuário não encontrado',
            id: id
        });
    }
});

// ==========================================
// CRUD - UPDATE (PUT e PATCH)
// ==========================================

// PUT /api/users/:id - Atualizar usuário COMPLETO
// Substitui todos os dados do usuário
// Body esperado: { "name": "Nome", "email": "email@example.com", "age": 25 }
app.put('/api/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, email, age } = req.body;

    // Validação do ID
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    // Validação dos campos obrigatórios
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Nome e email são obrigatórios no PUT'
        });
    }

    // Busca o índice do usuário no array
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica se o email já existe em outro usuário
    const emailExists = users.find(u => u.email === email && u.id !== id);
    if (emailExists) {
        return res.status(409).json({ 
            error: 'Email já cadastrado por outro usuário'
        });
    }

    // Atualiza TODOS os dados (PUT substitui completamente)
    users[userIndex] = {
        id, // Mantém o mesmo ID
        name,
        email,
        age: age || undefined
    };

    res.json({
        message: 'Usuário atualizado com sucesso!',
        user: users[userIndex]
    });
});

// PATCH /api/users/:id - Atualizar usuário PARCIALMENTE
// Atualiza apenas os campos enviados
// Body: pode ser { "name": "Novo Nome" } ou { "age": 26 } ou ambos
app.patch('/api/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updates = req.body;

    // Validação do ID
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    // Verifica se foi enviado algum dado para atualizar
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ 
            error: 'Nenhum campo para atualizar foi enviado'
        });
    }

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Se está tentando alterar o email, verifica duplicação
    if (updates.email) {
        const emailExists = users.find(u => u.email === updates.email && u.id !== id);
        if (emailExists) {
            return res.status(409).json({ 
                error: 'Email já cadastrado por outro usuário'
            });
        }
    }

    // Atualiza apenas os campos enviados (PATCH é parcial)
    users[userIndex] = {
        ...users[userIndex], // Mantém os dados existentes
        ...updates,           // Sobrescreve com os novos dados
        id                    // Garante que o ID não mude
    };

    res.json({
        message: 'Usuário atualizado parcialmente com sucesso!',
        user: users[userIndex]
    });
});

// ==========================================
// CRUD - DELETE
// ==========================================

// DELETE /api/users/:id - Deletar um usuário
app.delete('/api/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    // Validação do ID
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    // Busca o índice do usuário
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ 
            error: 'Usuário não encontrado',
            id: id
        });
    }

    // Remove o usuário do array
    const deletedUser = users.splice(userIndex, 1)[0];

    // Status 200 (OK) com confirmação da deleção
    res.json({
        message: 'Usuário deletado com sucesso!',
        deletedUser: deletedUser
    });
});

// ==========================================
// ROTA 404 - Rota não encontrada
// ==========================================

// Esta rota pega todas as requisições que não foram capturadas pelas rotas acima
// Deve ser sempre a última rota definida
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        method: req.method,
        path: req.path,
        availableRoutes: {
            'GET /': 'Informações da API',
            'GET /api/users': 'Listar todos os usuários',
            'GET /api/users/:id': 'Buscar usuário por ID',
            'POST /api/users': 'Criar novo usuário',
            'PUT /api/users/:id': 'Atualizar usuário completo',
            'PATCH /api/users/:id': 'Atualizar usuário parcialmente',
            'DELETE /api/users/:id': 'Deletar usuário'
        }
    });
});

// ==========================================
// INICIALIZAÇÃO DO SERVIDOR
// ==========================================

app.listen(PORT, () => {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`${'='.repeat(50)}`);
    console.log(`\n📝 Rotas disponíveis:\n`);
    console.log(`   GET    /                    - Informações da API`);
    console.log(`   GET    /api/users           - Listar usuários`);
    console.log(`   GET    /api/users/:id       - Buscar usuário`);
    console.log(`   POST   /api/users           - Criar usuário`);
    console.log(`   PUT    /api/users/:id       - Atualizar completo`);
    console.log(`   PATCH  /api/users/:id       - Atualizar parcial`);
    console.log(`   DELETE /api/users/:id       - Deletar usuário`);
    console.log(`\n${'='.repeat(50)}\n`);
});
