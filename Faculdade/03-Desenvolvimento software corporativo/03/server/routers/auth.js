<<<<<<< Updated upstream
const express = require(`express`)
const router = express.Router()
const db = require(`../db`)

router.get(`/`,(req,res)=>{
    res.render(`login`)
})

router.post(`/login`, (req, res)=> {
    const {usuario, senha} = req.body
    db.query(
        'select * from usuarios where usuario = ? and senha = ?',
        [usuario, senha],
        (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                req.session.usuario = usuario;
                res.redirect(`/dashboard`);
            } else {
                res.render('login', { error: 'Usuário ou senha inválidos' });
            }
        }
    )
})

=======
const express = require(`express`)
const router = express.Router()
const db = require(`../db`)

router.get(`/`,(req,res)=>{
    res.render(`login`)
})

router.post(`/login`, (req, res)=> {
    const {usuario, senha} = req.body
    db.query(
        `SELECT u.*, t.nome_tipo FROM usuarios u
         JOIN tipo_usuario t ON u.tipo_id = t.id
         WHERE u.usuario = ? AND u.senha = ?
        `,
        [usuario, senha],
        (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                req.session.usuario = results[0].usuario
                req.session.tipo = results[0].nome_tipo
                res.redirect(`/dashboard`);
            } else {
                res.render('login', { error: 'Usuário ou senha inválidos' });
            }
        }
    )
})

>>>>>>> Stashed changes
module.exports = router