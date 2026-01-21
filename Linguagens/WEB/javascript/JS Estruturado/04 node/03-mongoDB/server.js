// Configs iniciais e comentários rápidos (objetivos e curtos):
// - `.env` carrega variáveis de ambiente (não commitar credenciais).
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = process.env.CONNECTIONSTRING;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Conecta ao MongoDB usando a string em process.env.
// Por segurança, aguardamos a conexão antes de iniciar o servidor (app.emit/OK).
mongoose.connect(uri, clientOptions)
.then(() => {
    app.emit('OK'); // sinaliza que o DB está pronto
})
.catch((e) => console.log(e)); // log curto; em produção trate/recupere erros

// Session + persistência em Mongo (para manter sessões entre reinícios)
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash'); // mensagens flash (sucesso/erro)

const routes = require('./routes');
const path = require('path');
const meuMiddleware = require('./src/middlewares/middleware')

// Opções de sessão:
// - `secret`: chave para assinar o cookie de sessão
// - `store`: persiste sessões no Mongo em vez de memória (escala/estabilidade)
// - `httpOnly` evita acesso ao cookie via JS no cliente (segurança)
const sessionOptions = session({
    secret: 'safdsagsdaffsadfdsafds fdsaf dsaf dsaf sda',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

// Parser para form-data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// arquivos estáticos (pasta `public`)
app.use(express.static(path.resolve(__dirname, 'public')));

// Views: configuração do EJS e pasta de templates
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Middleware próprio (ex.: logs, variáveis globais, validações leves)
app.use(meuMiddleware);

// Rotas principais
app.use(routes);

// Start do servidor somente após conexão com o banco (evita erros de DB não pronto)
app.on('OK', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
})

