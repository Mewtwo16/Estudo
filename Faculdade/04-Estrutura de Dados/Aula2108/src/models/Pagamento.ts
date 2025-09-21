export class Pagamento{
    constructor(
        public valor:number,
        public data: Date
    ){}

    processar():void{
        console.log("Processando pagamento generico...");
    }
}

export class PagamentoCartao extends Pagamento{

    constructor(
        valor:number,
        data: Date,
        public numeroCartao: string
    ){
        super(valor, data);
    }

    processar(): void {
        console.log(`Pagamento de R$${this.valor} 
            no cartao ${this.numeroCartao} autorizado`);
    }
}

export class PagamentoBoleto extends Pagamento{
    constructor(
        valor:number,
        data: Date,
        public codigoBarras: string
    ){
        super(valor,data);
    }

    processar(): void {
        console.log(`Boleto gerado no valor de 
            R$${this.valor} Codigo: ${this.codigoBarras}`);
    }
}