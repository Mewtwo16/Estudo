/*
    Estrutura de dados map
*/

const pessoas = [
    {id: 3, nome: 'André'},
    {id: 2, nome: 'Tatiane'},
    {id: 1, nome: 'Saga'},
];

// const novasPessoas = {};
// for (const {} of pessoas){
//     const {id} = pessoa
//     novasPessoas[id] = {...pessoa};
// }

const novasPessoas =new Map();
for (const pessoa of pessoas){
    const {id} = pessoa
    novasPessoas.set(id, {...pessoa});
}

console.log(novasPessoas);
console.log(novasPessoas.get(2));