/*
    .map() - usa o array original para criar um novo com valor alterado
*/

const numeros = [5, 50, 80, 1, 2, 3, 5, 8, 7, 11, 15, 22, 27];
const numerosDobro = numeros.map((valor) =>  valor * 2);

console.log(numerosDobro)


const pessoas = [
    {nome: 'Luiz', idade: 62},
    {nome: 'Edson', idade: 30},
    {nome: 'Tatiane', idade: 27},
    {nome: 'Michele', idade: 28},
    {nome: 'Maria', idade: 67},
    {nome: 'André', idade: 24},
];

const nomes = pessoas.map(obj => obj.nome);
const idades = pessoas.map(obj => ({idade: obj.idade}));
const comIds = pessoas.map((obj, indice) => {
    obj.id = indice
    return obj;
})

console.log(nomes, idades, comIds)