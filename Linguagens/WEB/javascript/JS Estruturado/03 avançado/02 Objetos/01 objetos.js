/*
    Objetos em js
*/

// Declarando objeto literal
const pessoa = { // As chaves abrem o corpo que contera as chaves
    nome: 'André', // Chave de um objeto
    sobrenome: 'Ricardo'
}
// Notação de chave para acessar a chave de um objeto
console.log(pessoa['nome']);
// Notação de ponto
console.log(pessoa.sobrenome);

// Declarando objeto com o construtor
const pessoa1 = new Object();
pessoa1.nome = 'André';
pessoa1.sobrenome = 'Ricardo';
pessoa1.idade = 30;
// Metodo de um objeto (função dentro do objeto)
pessoa1.falarNome = () => {
    return (`${this.nome} está falando seu nome.`);
};
pessoa1.getNascimento = () => {
    const dataAtual = new Date();
    return dataAtual.getFullYear() - this.idade;
};

console.log(pessoa1.getNascimento());

for (let chave in pessoa1) {
    console.log(chave + ' ' + pessoa1[chave]);
}

// Factory e constructor functions 
// Factory
function criaPessoa(nome, sobrenome) {
    return {
        nome,
        sobrenome,
    }
}
// Constructor
function Pessoa(nome, sobrenome) {
    this.nome = nome;
    this.sobrenome = sobrenome;

    Object.freeze(this); // trava as propriedades do objeto
}
/* A constructor function utiliza new que cria um objeto vazio
pega a palavra this e atrela ao objeto
*/
const p1 = new Pessoa('Luiz', 'Mirandda');

function Produto(descricao, preco, estoque) {
    this.descricao = descricao;
    this.preco = preco

    Object.defineProperty(this, 'estoque', {
        enumerable: true, // mostra chave
        value: estoque,  // valor
        writable: false, // é alteravel?
        configurable: true // configuravel
    });
}

const produto1 = new Produto('Camiseta', 20, 3);

console.log(produto1);

// Metodos uteis para objeto

// copia objeto
const objeto1 = {nome: 'Caneca', preco: 1.8};
const caneca = Object.assign({}, objeto1);
console.log(Object.values(objeto1));

for(let [chave, valor] of Object.entries(objeto1)){
    console.log(chave, valor);
}