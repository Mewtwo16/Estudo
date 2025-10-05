/*
    .reduce() - reduz o array
*/

const numeros = [5, 50, 80, 1, 2, 3, 5, 8, 7, 11, 15, 22, 27];
const total = numeros.reduce((acumulador, valor, indice, array) => {
    acumulador += valor;
    return acumulador;
});
console.log(total);



const pessoas = [
    {nome: 'Luiz', idade: 62},
    {nome: 'Edson', idade: 30},
    {nome: 'Tatiane', idade: 27},
    {nome: 'Michele', idade: 28},
    {nome: 'Maria', idade: 67},
    {nome: 'André', idade: 24},
];

const velho = pessoas.reduce((acumulador, valor) => {
    if(acumulador.idade > valor.idade) return acumulador;
    return valor;
});

console.log(velho);