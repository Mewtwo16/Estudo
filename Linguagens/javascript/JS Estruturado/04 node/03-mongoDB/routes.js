const express = require ("express");
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require("./src/controllers/contatoController")

// Rotas principais (curtas e objetivas):
// - GET '/' => página inicial (renderiza template)
// - POST '/' => exemplo de tratamento de formulário
// - GET '/contato' => rota de contato (resposta simples)
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost)

route.get('/contato', contatoController.homePage)

module.exports = route;