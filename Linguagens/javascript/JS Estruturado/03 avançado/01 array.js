/*
    Arrays avançados
    arrays são dados por referencia
*/

// Oque já se sabe
const nomes = ['Eduardo', 'Maria', 'Joana']; // Criação normal de arrays
const nomes2  = new Array('Eduardo', 'Maria', 'Joana'); // Criação com construtor
// se eu declarar const array2 = array1 , tudo que eu fizer em um reflete no outro
const novo = [...nomes]; // Desta forma usando resto pego todos os itens do array e posso modificar livremente

const removido = nomes.pop(); // Remove do final
const removido2 = nomes.shift(); // Remove do começo
nomes.push('João'); // Adiciona no final do array
nomes.push('Edson');
nomes.unshift('Wallace') // Adiciona no começo da array
nomes.unshift('Gabriel')

const fatiado = nomes.slice(1, 3); // pego os indices referenciados vai do 1 ao 2 o ultimo referenciado não é includo
const fatiado2 = nomes.slice(1, -1); // Pode-se trabalhar com numeros negativos

console.log(nomes, removido, removido2);

const nome = 'André Ricardo Monteiro da Rocha';
const nomeSeparado = nome.split(' '); // Separa pelo elemento definido dentro das ''
console.log(nomeSeparado);

const nomeJunto = nomeSeparado.join(' '); // Junta o array
console.log(nomeJunto);


// Função splice()
// nomes.splice(indice, pop, push, push2, push3)
console.log(nomes);
nomes.splice(-1, 1);
console.log(nomes);
nomes.splice(nomes.length, 0, 'André');
console.log(nomes);


// Concatenar arrays

const a1 = [1,2,3];
const a2 = [4,5,6];
// a3 = a1 + a2; iria criar uma string
const a3 = a1.concat(a2, [7, 8 ,9], 'André');
console.log(a3)
console.log(typeof(a3));
const a4 = [...a1 ,...a2, ...[7, 8, 9]] // usando o ... spread operator 
console.log(a4)
console.log(typeof(a4));

