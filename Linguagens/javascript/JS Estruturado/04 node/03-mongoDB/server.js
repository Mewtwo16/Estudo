/*
    Tudos os arquivos são partes da aula de express
    
*/

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
.then(() => {
    app.emit('OK');
})
.catch((e) => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const meuMiddleware = require('./src/middlewares/middleware')

const sessionOptions = session({
    secret: 'safdsagsdaffsadfdsafds fdsaf dsaf dsaf sda',
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.use(express.urlencoded(
    { extended: true, }
))

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(meuMiddleware);
app.use(routes);

app.on('OK', () => {
    app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
});
})

