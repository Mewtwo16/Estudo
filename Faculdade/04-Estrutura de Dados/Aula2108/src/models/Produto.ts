export class Produto{
    constructor(
        private nome: string,
        private preco: number
    ){}

    getNome(): string{
        return this.nome;
    }

    setNome(nome: string): void{
        this.nome = nome;
    }

    getPrec(): number{
        return this.preco;
    }

    setPreco(preco: number): void{
        this.preco = preco;
    }

    exibirInfo():void{
        console.log(`${this.nome} - R$${this.preco}`);
    }
}