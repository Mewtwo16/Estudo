using System;

namespace Fundamentos.POO{
    class Metodos{
        public static void Executar(){
            var j1 = new Jogador("André", "Bruxo");
            
            Console.WriteLine(j1.Nome);
            Console.WriteLine(j1.Classe);
            Console.WriteLine(j1.Nivel);
            
            
            
        }
    }


    class Jogador{
        public string Nome;
        public string Classe;
        public double Exp;
        public int Nivel;
        private double expPorc = 1.5d;

        public Jogador(string nome, string classe, int epx = 100 ,int nivel = 0){
            Nome = nome;
            Classe = classe;
            Nivel = nivel;
        }

        
        
        
    }
}