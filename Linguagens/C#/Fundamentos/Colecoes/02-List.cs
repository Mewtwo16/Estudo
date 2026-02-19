using System;
using System.Collections.Generic;
using System.Text;

namespace Fundamentos.Colecoes{

    public class Produto{
        public string Nome;
        public double Preco;

        public Produto(string nome, double preco){
            Nome = nome;
            Preco = preco;
        }
    }
    class Listas{
        public static void Executar(){
            var livro = new Produto("Livro", 5.0);

            var carrinho = new List<Produto>();
        }
    }
}

