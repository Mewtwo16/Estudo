/*
        Abstração: Isolamento dos detalhes de implementação de um objeto,
    mostrando apenas as características essenciais ao usuário.
        Herança: Mecanismo que permite criar novas classes baseadas em classes existentes,
    herdando atributos e métodos.
        Polimorfismo: Capacidade de diferentes classes responderem de maneira distinta
    a uma mesma mensagem ou método.
        Encapsulamento: Restrição do acesso direto a alguns componentes de um objeto,
    protegendo seu estado interno e expondo apenas o necessário.

    Em typeScript classes podem ser tipos
*/

//Criando uma classe

export class Empresa{
    // Criando atributos - forma longa
    public readonly nome: string;
    private readonly colaboradores: Colaborador[] = [];
    protected readonly cnpj: string;
    // Construtor
    constructor(nome: string, cnpj: string){
        this.nome = nome
        this.cnpj = cnpj
    }

    public addColaborador(colaborador: Colaborador): void{
        this.colaboradores.push(colaborador)
    }

    public mostrarColaboradores(): void{
        for(const colaborador of this.colaboradores){
            console.log(colaborador)
        }
    }
}

export class Colaborador {
    // Criando atributos - forma curta
    constructor(public readonly nome: string, public readonly sobrenome: string){}
}

const empresa1 = new Empresa('Google', '00.000.000/0001-00');
const colaborador1 = new Colaborador('João', 'Silva');
const colaborador2 = new Colaborador('Maria', 'Oliveira');
const colaborador3 = new Colaborador('José', 'Souza');
empresa1.addColaborador(colaborador1)
empresa1.addColaborador(colaborador2)
empresa1.addColaborador(colaborador3)
empresa1.mostrarColaboradores()

