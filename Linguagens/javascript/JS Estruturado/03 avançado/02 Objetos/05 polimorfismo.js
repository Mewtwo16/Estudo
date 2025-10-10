//superclass
function Conta(agencia, conta, saldo) {
    this.agencia = agencia;
    this.conta = conta;
    this.saldo = saldo;
}

Conta.prototype.verSaldo = () => {
    console.log(`AG/C: ${this.agencia} / ${this.conta} | Saldo: R$${this.saldo.toFixed(2)}`);
};
Conta.prototype.sacar = (valor) => {
    if(this.saldo < valor) {
    console.log(`Saldo insuficiente: ${this.saldo}`)
    return;
    }
    this.saldo -= valor;
};
Conta.prototype.depositar = (valor) => {
    this.saldo += valor;
    this.verSaldo();
};


const conta1 = new Conta(11,20,10);
conta1.depositar(10);
conta1.sacar(5);
conta1.verSaldo();

function ContaCorrente(agencia, conta, saldo, limite) {
    Conta.call(this, agencia, conta, saldo)
    this.limite = limite;
}
ContaCorrente.prototype = Object.create(Conta.prototype);
ContaCorrente.prototype.constructor = ContaCorrente;

ContaCorrente.prototype.sacar = (valor) => {
        if(valor > (this.saldo + this.limite)){
            console.log(`Saldo insuficiente: ${this.saldo}`);
            return;
        };

        this.saldo -= valor;
        this.verSaldo();
};

const cc = new ContaCorrente(11,22,0,100);
cc.depositar(10);
cc.sacar(20);

function CP(agencia, conta, saldo) {
    Conta.call(this, agencia, conta, saldo)
    this.limite = limite;
}
CP.prototype = Object.create(Conta.prototype);
CP.prototype.constructor = CP;

CP.prototype.sacar = (valor) => {
        if(valor > this.saldo){
            console.log(`Saldo insuficiente: ${this.saldo}`);
            return;
        };

        this.saldo -= valor;
        this.verSaldo();
};

const cp = new CP(11,22,0,100);
cp.depositar(10);
cp.sacar(20);