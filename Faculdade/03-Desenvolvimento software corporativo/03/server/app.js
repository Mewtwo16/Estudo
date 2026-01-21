<<<<<<< Updated upstream
const express = require(`express`);
const path = require(`path`);
const session = require(`express-session`);
const app = express();

app.set(`view engine`, `ejs`)
app.set(`views`, path.join(__dirname, `../renderer/views`))
app.use(express.static(path.join(__dirname, `../rederer/public`)))
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: `segredo-super-seguro`,
    reserve: false,
    saveUninitialized: false,
}))

const authRouter = require(`./routers/auth`)
const dashboardRouter = require(`./routers/dashboard`)
app.use(`/`, authRouter)
app.use(`/dashboard`, dashboardRouter)

app.listen(4040, () =>{
    console.log(`Servidor inicializado em http://localhost:4040`);
=======
const express = require(`express`);
const path = require(`path`);
const session = require(`express-session`);
const app = express();

app.set(`view engine`, `ejs`)
app.set(`views`, path.join(__dirname, `../renderer/views`))
app.use(express.static(path.join(__dirname, `../renderer/public`)))
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: `segredo-super-seguro`,
    reserve: false,
    saveUninitialized: false,
}))

const authRouter = require(`./routers/auth`)
const dashboardRouter = require(`./routers/dashboard`)
const usuariosRouter = require('./routers/usuarios')

app.use(`/`, authRouter)
app.use(`/dashboard`, dashboardRouter)
app.use('/usuarios', usuariosRouter)

app.listen(4040, () =>{
    console.log(`Servidor inicializado em http://localhost:4040`);
>>>>>>> Stashed changes
})