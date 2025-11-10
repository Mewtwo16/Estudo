/*
    Classes em JS
    getters e setters
    symbol = tipo de dado primitivo
*/


// Declaração de Classes
class Pessoa {
    // Metodo construtor
    constructor(nome, sobrenome) {
        this.nome = nome;
        this.sobrenome = sobrenome;
    }
    get nomeCompleto(){
        return `${this.nome} ${this.sobrenome}`;
    }
    set nomeCompleto(valor){
        valor = valor.split(' ');
        this.nome = valor.shift();
        this.sobrenome = valor.join(' ');
    }
}

const p1 = new Pessoa('André', 'Ricardo');
console.log(p1.nomeCompleto);

const _velocidade = Symbol('velocidade');
class carro{
    constructor(nome){
        this.nome = nome;
        this[_velocidade] = 0;
    }
    // Get visualiza
    get velocidade(){
        return this[_velocidade];
    }
    // Set escreve
    set velocidade(valor){
        if(typeof valor !== 'number') return;
        if(valor >= 100 || valor <= 0) return;
        this[_velocidade] = valor;
    }

    acelerar(){
        if(this[_velocidade] >= 100) return
        this[_velocidade]++;
    }
    freiar(){
        if(this[_velocidade] <= 0) return;
        this[_velocidade]--;
    }
}

const c1 = new carro('Fusca');

c1.velocidade = 200;
console.log(c1);
c1.velocidade = -200;
console.log(c1);
c1.velocidade = 50;
console.log(c1);

