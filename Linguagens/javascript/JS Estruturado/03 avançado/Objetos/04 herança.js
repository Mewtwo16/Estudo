/*
    Heranças em js(prototipos)
*/

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

function Camiseta(nome, preco, cor) {
    Produto.call(this, nome, preco); // Herdando os atributos de Produto
}
Camiseta.prototype = Object.create(Produto.prototype);

const camiseta = new Camiseta('Regata', 7.5, 'Preta');
camiseta.aumento(10);
console.log(camiseta);
