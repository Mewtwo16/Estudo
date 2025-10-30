const mysql = require('mysql2/promise');

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'inova_tech_db';

let poolConexoes;

async function iniciarBancoDados() {
  poolConexoes = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    namedPlaceholders: true,
  });
  await poolConexoes.query('SELECT 1');
}

function obterPool() {
  if (!poolConexoes) throw new Error('Pool do BD não inicializado. Chame iniciarBancoDados() primeiro.');
  return poolConexoes;
}

module.exports = { iniciarBancoDados, obterPool };
