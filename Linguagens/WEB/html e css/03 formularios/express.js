// 1. Importa o framework Express
const express = require('express');

// 2. Inicializa a aplicação Express
const app = express();

// 3. Define a porta
const port = 3000;

// 4. Cria uma "rota" para o endereço principal (/)
// Quando alguém acessar a URL raiz, esta função será executada.
// Nova rota para a API que retorna dados de um usuário
app.get('/api/user', (req, res) => {
    // Em um projeto real, esses dados viriam de um banco de dados.
    // Por enquanto, vamos criar um objeto diretamente no código.
    const usuario = {
        id: 1,
        nome: 'André',
        email: 'andre@email.com',
        profissao: 'Desenvolvedor em Formação'
    };

    // O Express converte o objeto JavaScript para JSON automaticamente!
    res.json(usuario);
});

// 5. Inicia o servidor na porta definida
app.listen(port, () => {
    console.log(`Servidor Express rodando em http://localhost:${port}/`);
});