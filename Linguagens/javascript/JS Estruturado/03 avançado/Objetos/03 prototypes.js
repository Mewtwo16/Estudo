/*
    prototypes, é a base do javascript para heranças e outros conceitos de POO
*/

function Pessoa(nome, sobrenome) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.nomeCompleto = () => { 'orignal', this.nome + ' ' + this.sobrenome; }
}

const pessoa1 = new Pessoa('André', 'Ricardo');
const data = new Date();

Pessoa.prototype.nomeCompleto = () => { this.nome + ' ' + this.sobrenome; };

console.dir(pessoa1);
console.dir(data);