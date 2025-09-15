/*
    Desestruturação de arrays
*/

let a = `a`;
let b = `b`;
let c = `c`;

const numeros = [1, 2, 3];
[a, b, c] = numeros; // Desestruturação de arrays

console.log(a, b, c);

const num = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000]
 // com operardor ".. rest, ... spread" pegamos o resto do array via desestruturação
const [um, dois, tres, , cinco, ...resto] = num; // com espaços vazios pulamos valores
console.log(um, dois, tres, cinco); 

// Uma matriz(array de arrays);
const num2 = [
//     0        1       3     
//   0 1 2    0 1 2    0 1 2
    [1,2,3], [4,5,6], [7,8,9] // Os indices são intuitivos e deve passar indices que deseja pegar ex: [1][2] para o numero 6
];

// A desestruturação se torna extremamente complexa (compensa?)
const [,[,,seis]] = num2; // [,[indice desejado]] , pula o indice e [] abre no indice desejado
console.log(seis);

// Mais facil pegar as listas e desestruturar as listas individuais
const [l1, l2, l3] = num2;

/* 
    desestruturação para objetos
*/

const pessoa = {
    nome: `André`,
    sobrenome: `Ricardo`,
    idade: `30`,
    endereco: {
        rua: `Ary carlos`,
        n: 108
    }
};

// atribução via desestruturação
const {nome = 'Não existe', sobrenome, idade} = pessoa; // setei um valor padrão
// poderia mudar o nome da variavel seguindo o exemplo \/
// const {nome: n1 = 'Não existe', sobrenome, idade} = pessoa; 
console.log(nome, sobrenome, idade);

// pegando um objeto de dentro de outro objeto
const {endereco: {rua: r = `não localizado`, n}, 
endereco
} = pessoa;
console.log(r, n, endereco);

const {nome1, ...rest} = pessoa;
console.log(nome, rest);



