/*
    Exercicio fazer:
    varA ter o valor de B
    varB ter o valor de C
    varC ter o valor de A

    Sem mudar o valor literal da variavel exemplo: varA = `B`;
*/

let varA = 'A'; // B
let varB = 'B'; // C
let varC = 'C'; // A

console.log(`Valores iniciais: `, varA, varB, varC);

let temp = varB;

varB = varC; // C

varC = varA; // A

varA = temp; // B

console.log(`Resultado: `, varA, varB, varC);

// O resultado foi valido, em javascript podemos usar um recurso do ES6 "Destructuring Assignment" (Atribuição via Desestruturação).
// Desta forma seria valido:  

varA = 'A'; // B
varB = 'B'; // C
varC = 'C'; // A

[varA, varB, varC] = [varB, varC, varA];

console.log("Valores finais:", varA, varB, varC);