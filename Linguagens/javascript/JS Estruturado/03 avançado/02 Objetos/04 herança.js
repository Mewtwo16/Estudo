/*
    Heranças em js(prototipos)
*/

<<<<<<< HEAD:Linguagens/javascript/JS Estruturado/03 avançado/02 Objetos/04 herança.js
// Camiseta = cor, caneca = material
=======
>>>>>>> origin/master:Linguagens/javascript/JS Estruturado/03 avançado/Objetos/04 herança.js
function Produto(nome, preco) {
    this.nome = nome;
    this.preco = preco;
}
Produto.prototype.aumento = (quantia) => {
    this.preco += quantia;
};
Produto.prototype.desconto = (quantia) => {
    this.preco -= quantia;
};

<<<<<<< HEAD:Linguagens/javascript/JS Estruturado/03 avançado/02 Objetos/04 herança.js
// Função construtora para camiseta
function Camiseta(nome, preco, cor) {
    Produto.call(this, nome, preco); // Herdando os atributos de Produto
    this.cor = cor;
}
Camiseta.prototype = Object.create(Produto.prototype);
Camiseta.prototype.constructor = Camiseta; // Define o construtor real
Camiseta.prototype.aumento = (percentual) => {
    this.preco = this.preco + (this.preco * (percentual / 100));
}

function Caneca(nome, preco, material, estoque){
    Produto.call(this, nome, preco);
    this.material = material;
    Object.defineProperty(this, 'estoque', {
        enumerable: true,
        configurable: false,
        get: () => estoque,
        set: (valor) => {
            if(typeof valor !== 'number') return;
            estoque = valor;
        }
    })
}
Caneca.prototype = Object.create(Produto.prototype);
Caneca.prototype.constructor = Caneca;
=======
function Camiseta(nome, preco, cor) {
    Produto.call(this, nome, preco); // Herdando os atributos de Produto
}
Camiseta.prototype = Object.create(Produto.prototype);
>>>>>>> origin/master:Linguagens/javascript/JS Estruturado/03 avançado/Objetos/04 herança.js

const camiseta = new Camiseta('Regata', 7.5, 'Preta');
camiseta.aumento(10);
console.log(camiseta);
<<<<<<< HEAD:Linguagens/javascript/JS Estruturado/03 avançado/02 Objetos/04 herança.js

const caneca = new Caneca('copo', 10, plastico, 5);
console.log(caneca.estoque);
=======
>>>>>>> origin/master:Linguagens/javascript/JS Estruturado/03 avançado/Objetos/04 herança.js
