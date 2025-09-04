/* 
    Basico sobre objetos
*/

// Criando objetos

// objeto literal
/*
const pessoa1 = {
    nome: `Andre`,
    sobreNome: `Ricardo`,
    idade: 25
};

console.log(pessoa1.nome);
console.log(pessoa1.sobreNome);
console.log(pessoa1.idade);
*/


// Posso criar uma função que cria objetos
// Função factory para criar pessoa
function criaPessoa (nome, sobrenome, idade){
    return {
        nome,
        sobrenome,
        idade,

        fala() {
            console.log(`Ola, meu nome é ${this.nome}${this.sobrenome} e tenho ${idade} anos!`)
        }
    };
}; // A função retorna um tipo objeto

const p1 = criaPessoa(`Tatiane`, `Yure`, 26);
console.log(p1.nome, p1.sobrenome, p1.idade);
console.log(p1.fala());

