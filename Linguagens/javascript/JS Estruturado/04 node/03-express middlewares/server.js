/*
    Tudos os arquivos são partes da aula de express
        - express: servidor backend para responder e receber requisições http
        - nodemon: Atualiza o servidor express em tempo real

        // req.params - vem das rotas da url
        // req.query  - vem das query string
        // req.body   - Vem das requisições do body
*/

/*
    CRUD -> CREATE READ UPDATE DELETE
    HTTP -> POST   GET  PUT    DELETE
*/

// Inicialização padrão por convenção
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const meuMiddleware = require('./src/middlewares/middleware')

// Define um listener para uma porta
app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
});

app.use(routes);

app.use(express.urlencoded(
    { extended: true, }
))
app.use(meuMiddleware);

// Define os arquivos estaticos
app.use(express.static(path.resolve(__dirname, 'public')));

// Definindo a pasta de views e a engine de render
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


// // red.params
// app.get('/teste/:idUsuarios', (req, res) => {
//     console.log(req.params);
//     res.send(req.params.idUsuarios);
// })

// // Recebe posts do http
// app.post('/', (req, res) => {
//     console.log(req.body); //req.body
//     res.send('Recebi o formulário');
// })




