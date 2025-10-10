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


// Object.prototype
const objA = {
    chaveA: 'A' 
    // __proto__: Object.prototype (por baixo dos panos)
};

const objB = {
    chaveB: 'B'
}
// Coloquei o objA como __proto_ do objB
Object.setPrototypeOf(objB, objA)

// Fctory functions
function criaPessoa(nome, sobrenome){
    const pessoaPrototype = {
        falar(){
            console.log(`${nome} está falando`)
        },
        comer(){
            console.log(`${nome} está comendo`)
        },
        beber(){
            console.log(`${nome} está bebendo`)
        }
    }
    return{
        nome,
        sobrenome,
    };
    return Object.create(pessoaPrototype, {
        nome: {value: nome},
        sobrenome: {value: sobrenome}
    });
};

const p1 = criaPessoa('André', 'Ricardo');
p1.falar()
p1.comer()
p1.beber()