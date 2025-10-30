const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const { iniciarBancoDados } = require('./modules/db');
const rotasOrdens = require('./routes/ordens');

const aplicativo = express();
const PORTA = process.env.PORT || 3000;

aplicativo.set('view engine', 'ejs');
aplicativo.set('views', path.join(__dirname, 'views'));

aplicativo.use('/public', express.static(path.join(__dirname, '..', 'public')));

aplicativo.use(express.urlencoded({ extended: true }));
aplicativo.use(express.json());

aplicativo.get('/saude', (req, res) => res.json({ ok: true }));

aplicativo.use('/', rotasOrdens);

iniciarBancoDados()
  .then(() => {
    aplicativo.listen(PORTA, () => {
      console.log(`Servidor Express ouvindo em http://localhost:${PORTA}`);
    });
  })
  .catch((err) => {
    console.error('Falha na inicialização do banco de dados:', err);
    process.exit(1);
  });

module.exports = aplicativo;
