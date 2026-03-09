const express = require('express')
const router = express.Router()
const db = require('../db');

route.get('/', (req, res) => {
    db.query('SELECT id, nome FROM usuarios'), (err, results) =>{
        if(err) throw err;
        res.render('usuarios', {usuarios: results})
    }
})

module.exports = router