/*
    Mais sobre numeros

    Deve ter cuidado, pois em javascript pode se dividir por zero
    retorna o tipo da dado "infinity"
    
*/

let n1 = 10;
let n2 = 2.5;
let n3 = 10.541891523;

console.log(n1.toString()); // Converte temporariamente para string
// n1 = n1.toString(); Alteraria de forma permente para string
console.log(n1.toString(2)) // Se eu passar o valor 2 para a função ele me retorna o valor binario
console.log(n3.toFixed(4)); // Limita o numero de casas decimais
console.log(Number.isInteger(n1)); // Verifica se o numero é um inteiro

let num1 = 0.7;
let num2 = 0.1;
let resultado = num1 + num2;
// O java script tem uma imprecisão em alguns calculos
console.log(resultado); // Não retorna 0.8
// Uma forma de contornar isso é 
console.log(parseFloat(resultado.toFixed(2))); // Uma das soluções um toFixed Dentro de um parseFloat
resultado = null;
console.log(`Zerando resultado`, resultado);
resultado = ((num1 * 100) + (num2 * 100)) / 100; // Outra solução fazer a conta em numeros altos e depois retornar a numeros baixos
console.log(resultado);





