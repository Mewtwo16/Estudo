// 1. Importa o módulo http nativo do Node.js
const http = require('http');

// 2. Define a porta em que o servidor irá rodar
const port = 3000;

// 3. Cria o servidor
const server = http.createServer((req, res) => {
    // req = requisição (o que o cliente pede)
    // res = resposta (o que o servidor devolve)

    // Configura o cabeçalho da resposta para indicar que é texto plano
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    // Finaliza a resposta, enviando a mensagem para o cliente
    res.end('Meu primeiro servidor Node.js!');
});

// 4. Inicia o servidor e o faz "escutar" na porta definida
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});