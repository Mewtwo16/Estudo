export class Produto {
    nome;
    preco;
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }
    exibirInfo() {
        console.log(`${this.nome} - R$${this.preco}`);
    }
}
//# sourceMappingURL=Produto.js.map