/*
    Visão inicial de arrays(vetores)
    array em javascript é considerado um object
*/

// Criação dos arrays
// Pode conter mais de 1 tipo de dados(não é uma boa pratica)
// Array de strings a , separa os elementos do array
const alunos = [`André`, `Tatiane`, `Saga`]; // Arrays são indexados por elementos

console.log(alunos); // Acessei todos os elementos do array
console.log(alunos[2]);// Acessei o terceiro elemento do array

// Posso editar um valor
alunos[2] = `João`;
console.log(alunos);
// Ou adicionar um valor
alunos[3] = `Saga`; // Complica em arrays muito longos
console.log(alunos);

// Posso saber o tamanho do array com a função .length()
console.log(alunos.length);

// Posso adicionar no final do array com
alunos.push(`Eduardo`);
console.log(alunos);
// Posso adicionar no começo com
alunos.unshift(`Ricardo`);
console.log(alunos);
// Posso remover do fim com .pop()
alunos.pop(); // Posso salvar o valor removido em uma variavel Exemplo const removido = alunos.pop();
console.log(alunos);
// Posso remover do começo
alunos.shift();
console.log(alunos);
// Posso remover sem alterar os indices
delete alunos[2]; // Cria um bloco vazio
console.log(alunos);
// Posso acessar um indice que não existe
console.log(alunos[50]); // Retorna undefined
// Posso usar funções como .slice() para fatiar o array
console.log(alunos.slice(0, 3));
console.log(alunos.slice(0, -2));