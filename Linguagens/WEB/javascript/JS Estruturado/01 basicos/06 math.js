/*
    Objeto math
    Objeto com varias funções que auxiliam com a matematica em javascript
*/

let n1 = 9.5487;

let r1 = Math.floor(n1); // Arredonda para baixo
console.log(r1);

r1 = null;
r1 = Math.ceil(n1); // Arredonda para cima
console.log(r1)

r1 = null;
r1 = Math.round(n1); // Arredonda para o numero mais proximo
console.log(r1);

console.log(Math.max(1,2,3,4,5, -10,-50,-1500)); // Retorna o maior numero da sequencia
console.log(Math.min(1,2,3,4,5, -10,-50,-1500)); // Retorna o menor numero da sequencia
console.log(Math.random()); // Gera um numero aleatorio entre 0 e 1
// Crio um numero aleatorio
const aleatorio = Math.round(Math.random() * (10 - 5) + 5); // Posso multiplicar * (maximo - min) + min; Desta forma terei um numero aleatorio dentro do valor definido
console.log(aleatorio);
// Posso passar as funções de string para tratar o numero aleatorio

