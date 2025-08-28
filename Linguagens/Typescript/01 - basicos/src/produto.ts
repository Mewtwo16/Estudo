export class produto{
    constructor(
        public nome: string,
        public preco: number
    ){}

    exibirInfo(): void {
        console.log(`Produto: ${this.nome}, Preço: R$${this.preco}`);
    }
}
