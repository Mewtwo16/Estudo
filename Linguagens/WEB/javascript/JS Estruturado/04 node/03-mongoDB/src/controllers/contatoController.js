// Controller simples para /contato
// Retorna uma resposta de agradecimento (exemplo rápido sem view)
exports.homePage = (req,res) => {
    res.send('Obrigado por entrar em contato.');
}