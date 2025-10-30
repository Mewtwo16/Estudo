// Envio o index para ser renderizado
exports.paginaInicial = (req,res) => {
    res.render('index');
} 

exports.trataPost = (req,res) => {
    res.send('Nova rota de post')
}