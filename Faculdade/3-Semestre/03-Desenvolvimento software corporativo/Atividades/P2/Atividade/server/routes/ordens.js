const express = require('express');
const roteador = express.Router();
const { obterPool } = require('../modules/db');

roteador.get('/', async (req, res, next) => {
  try {
    const pool = obterPool();
    const [linhas] = await pool.query('SELECT * FROM ordens_servico ORDER BY data_criacao DESC');
    res.render('index', { ordens: linhas });
  } catch (err) {
    next(err);
  }
});

roteador.get('/os/nova', (req, res) => {
  res.render('nova');
});

roteador.post('/api/ordens', async (req, res, next) => {
  const { cliente_nome, equipamento, descricao_problema, status } = req.body;
  try {
    const pool = obterPool();
    const sql = `INSERT INTO ordens_servico (cliente_nome, equipamento, descricao_problema, status)
                 VALUES (:cliente_nome, :equipamento, :descricao_problema, COALESCE(:status, 'Aberto'))`;
    await pool.query(sql, { cliente_nome, equipamento, descricao_problema, status });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

roteador.post('/api/ordens/:id/concluir', async (req, res, next) => {
  try {
    const pool = obterPool();
    await pool.query("UPDATE ordens_servico SET status = 'Concluído' WHERE id = :id", { id: req.params.id });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

roteador.post('/api/ordens/:id/excluir', async (req, res, next) => {
  try {
    const pool = obterPool();
    await pool.query("DELETE FROM ordens_servico WHERE id = :id AND status = 'Aberto'", { id: req.params.id });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = roteador;
