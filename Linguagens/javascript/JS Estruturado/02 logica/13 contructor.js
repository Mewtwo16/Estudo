/*
    constructor function(função contrutora)
    Construtura sempre inicial com letra maiuscula
*/

function Pessoa(nome, sobrenome){
    // Não preciso sepeparar por virgulas diferente da factory function
    //Criando atributos privados(funciona em ambas funções)
    const id = 1;
    const metodoInterno = () =>{
        
    };

    this.nome = nome; // This aponta para objeto nome vazio
    this.sobrenome = sobrenome;
    // não necessida de return

    this.fala = function(){ // metodo do objeto
        console.log(`${this.nome}`);
    }
}

// new cria um novo objeto vazia e faz o this apontar para o objeto vazio
const p1 = new Pessoa('André', 'Ricardo');
const p2 = new Pessoa('Tatiane', 'Yure');


console.log(p1.nome);
console.log(p2.nome);
p1.fala();


