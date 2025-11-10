
class Eletronico {
    constructor(nome) {
        this.nome = nome;
        this.ligado = false;
    }
    ligar(){
        if(this.ligado) {
            console.log(this.nome + ' Já ligado');
            return;
        };
        this.ligado = true;
    }
    desligar(){
        if(!this.ligado) {
            console.log(this.nome + ' Já desligado');
            return;
        }
        this.ligado = false;
    }
}

// const d1 = new Eletronico('smartphone');
// d1.ligar();
// d1.ligar();
// d1.desligar();
// d1.desligar();
// console.log(d1);

// Herança
class Smartphone extends Eletronico {
    constructor(nome, cor, modelo){
        super(nome);
        this.cor = cor;
        this.modelo = modelo;
    }
}

const s1 = new Smartphone('Samsung', 'Preto', 'S10');
console.log(s1);
