/*
    Operadores de comparação
        > maior que
        < menor que
        >= maior igual que
        <= menor igual que
        == igualdade (valor)
        === igualdade estrita (valor e tipo)
        != diferente (valor)
        !== diferente estrito (valor e tipo)

    Operadores Logicos
        && - AND - E
        || - OR - ou
        ! - NOT - NÃO        
*/

// Avaliação de curto circuito com AND

console.log(true && 0 && `André`); // Retorna o primeiro valor que for falso


/*
    Valores que sempre avaliam em false(falsy):
        0
        `` '' ""
        null / undefined
        NaN    
*/

// Exemplo de uso:

// Funcão
function falaOi(){
    return `oi`;
}

// Variavel verificadora
const vaiExecutar = false;

console.log(vaiExecutar && falaOi()); // QUando a variavel for verdadeira ela executa a função
// Pode se utilizar com laços
