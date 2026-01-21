// Controller da página inicial
// Observação: abaixo há um `create` executado no carregamento do módulo
// Isso é usado apenas como exemplo/seed na aula — em produção, não crie dados automaticamente
const HomeModel = require('../models/HomeModel');

HomeModel.create({
    titulo: 'Um titulo de testes',
    descricao: 'Uma descricao de testes'
})
.then(dados => console.log(dados)) // log curto do documento criado
.catch(e => console.log(e)) // em produção lidar melhor com erros

// Renderiza index e adiciona um objeto de sessão (exemplo de uso de sessions)
exports.paginaInicial = (req,res) => {
    req.session.usuario = {
        nome: 'André',
        logado: 'true' // string ok para exemplo; em real use boolean
    }
    res.render('index'); // renderiza view `src/views/index.ejs`
} 

// Rota POST de exemplo — atualmente apenas responde texto
exports.trataPost = (req,res) => {
    res.send('Nova rota de post')
}