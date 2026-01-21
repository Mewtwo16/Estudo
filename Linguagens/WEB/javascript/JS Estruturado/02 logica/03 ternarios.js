/*
    Operadores ternarios

    sintaxe: ? :

*/

const pontuacaoUser = 999;

// laço normal
if (pontuacaoUser >= 1000){
    console.log(`Vip`);
}else {
    console.log(`Normal`);
}

const pontuacaoUser2 = 1001
// Ternário                     Condição   true    false
const nivelUser = pontuacaoUser2 >= 1000 ? `VIP` : `Normal`;
console.log(nivelUser);

// Posso usar operadores para setar Padrões
const corUsuario = null;
// Define a cor padrão para preto se corUsuario for nula
const corPadrao = corUsuario || `Preta`;
console.log(corPadrao);


