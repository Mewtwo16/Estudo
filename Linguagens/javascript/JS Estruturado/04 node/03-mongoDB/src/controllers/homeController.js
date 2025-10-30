// Envio o index para ser renderizado
const HomeModel = require('../models/HomeModel');

HomeModel.create({
    titulo: 'Um titulo de testes',
    descricao: 'Uma descricao de testes'
})
.then(dados => console.log(dados))
.catch(e => console.log(e))

exports.paginaInicial = (req,res) => {
    res.render('index');
} 

exports.trataPost = (req,res) => {
    res.send('Nova rota de post')
}