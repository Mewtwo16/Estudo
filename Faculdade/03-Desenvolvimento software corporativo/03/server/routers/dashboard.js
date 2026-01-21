<<<<<<< Updated upstream
const express = require(`express`)
const router = express.Router()

router.get(`/`,(req,res)=>{
    res.render(`dashboard`, {usuario: req.session.usuario})
})

=======
const express = require(`express`)
const router = express.Router()

router.get(`/`,(req,res)=>{
    res.render(`dashboard`, {
        usuario: req.session.usuario,
        tipo: req.session.tipo
    })
})

>>>>>>> Stashed changes
module.exports = router