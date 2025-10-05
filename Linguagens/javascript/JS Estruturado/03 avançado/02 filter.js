/*
    Metodos
    .filter() - sempre retornar um array com a mesma quantidade ou menos 
*/

//Filter - filtra o array

const numeros = [5, 50, 80, 1, 2, 3, 5, 8, 7, 11, 15, 22, 27];

function callbackFilter(valor, indice, array){
    return valor > 10;
}

const numerosFiltrados = numeros.filter(valor => valor > 10);
console.log(numerosFiltrados);

const pessoas = [
    {nome: 'Luiz', idade: 62},
    {nome: 'Edson', idade: 30},
    {nome: 'Tatiane', idade: 27},
    {nome: 'Michele', idade: 28},
    {nome: 'Maria', idade: 67},
    {nome: 'André', idade: 24},
];

const pessoas2 = pessoas.filter((obj) => obj.nome.length > 5);
const pessoas3 = pessoas.filter((obj) => obj.nome.toLowerCase().endsWith('e'));  

console.log(pessoas2);
console.log(pessoas3);
