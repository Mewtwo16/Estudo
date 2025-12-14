// Classes em typescript

// declaração de classe (ao herdar está classe ela se torna um SUPER classe)
class Pessoa {
    // Public
    public nome: string;
    public sobreNome: string
    // Private
    private cpf: string;
    // Protected
    protected idade: number;
    // classe como tipo
    public corFavorita: Cor[] = [];

    // Atributo estatico - Tem acesso pela classe e não pela instancia
    static idadePadroa = 0;

    // Construtor
    /*
        se nome estive-se: public readonly nome: string;
        apos a inicialização o valor definido como readonly não pode ser alterado
    */
    constructor(nome: string, sobreNome: string, cpf: string, idade: number) {
        this.nome = nome;
        this.sobreNome = sobreNome;
        this.cpf = cpf;
        this.idade = idade;
    }

    // Metodo statico - Tambem tem acesso pela classe e não pela instancia
    static falaOi(): void{
        console.log('Oi');
    }

    // Metodo publico
    addCor(cor: Cor): void{
        this.corFavorita.push(cor);
    }

    // Get(maneira comum em outras linguagens)
    getIdade(): number{
        return this.idade;
    }
    getCpf(): string{
        return this.cpf.replace(/D/g, '');
    }
    getNomeCompleto(): string{
        return `${this.nome} ${this.sobreNome}`;
    }

}

// classe como tipo
class Cor {
    constructor(
    public readonly descricao: string
){}
}

// Herança - A classe aluno herda tudo que tem na classe pessoa
class Aluno extends Pessoa {
    // Chamando o construtor da classe super
    constructor(
        // Sem declarar modificadores de acesso, pois não vamos sobre escrever os dados e apenas receber os mesmos
        nome: string, 
        sobreNome: string,
        cpf: string,
        idade: number,
        public _matricula: number // Declaramos o nosso novo atributo
    ) {
        super(nome, sobreNome, cpf, idade) // Passamos os valores para classe super
    }

    // Getter
    get matricula(){
        return this._matricula;
    }
    // Setter
    set matricula(matricula: number){
        this._matricula = matricula;
    }
}


// Testes
const preto = new Cor('Preto')
const vermelho = new Cor('vermelho')
const azul = new Cor('azul')
const pessoa1 = new Pessoa('André', 'Ricardo', '111.111.111-11', 24)
pessoa1.addCor(preto);
console.log(pessoa1);
const aluno = new Aluno('Tatiane', "Yure", '222.222.222-22', 27, 1000);
aluno.addCor(vermelho);
console.log(aluno);

aluno.matricula = 2000;
console.log(aluno.matricula);


export { };