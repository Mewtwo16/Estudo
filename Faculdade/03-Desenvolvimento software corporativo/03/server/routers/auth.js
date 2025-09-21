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

module.exports = router