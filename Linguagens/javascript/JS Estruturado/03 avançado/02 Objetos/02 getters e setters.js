/*
    Getters e setters
 */

// Em uma função construtora
function Produto(descricao, preco, estoque) {
    this.descricao = descricao;
    this.preco = preco;
    let estoquePrivado = estoque;

    Object.defineProperty(this, 'estoque', {
        enumerable: true, 
        // value: estoque, 
        // writable: false, 
        configurable: true,
        get: () => {return estoquePrivado;},
        set: (valor) => {
            if(typeof valor !== 'number'){
                throw new TypeError('Erro');
            }

            estoquePrivado = valor;
        }
    });
}

// Em uma factory function
function criaProduto(nome){
    return {
        get nome(){
            return nome;
        },
        set nome(valor){
            nome = valor;
        }
    }
}