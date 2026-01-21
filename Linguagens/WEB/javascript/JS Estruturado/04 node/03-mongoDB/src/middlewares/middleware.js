// Middleware de exemplo: registra passagem pela rota e segue o fluxo
// Use middleware para autenticação/validação/variáveis globais antes das rotas
module.exports = (req,res,next) => {
    console.log();
    console.log('Passei no middlreware'); // log curto para depuração
    console.log();
    next(); // importante: chama o próximo middleware/rota
}