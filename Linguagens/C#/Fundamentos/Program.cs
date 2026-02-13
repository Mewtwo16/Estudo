using System;
using System.Collections.Generic;

using Fundamentos.Basicos;
using Fundamentos.POO;

namespace Fundamentos {
    class Program {
        static void Main(string[] args) {
            var central = new CentralDeExercicios(new Dictionary<string, Action>() {
                // Basicos
                {"Variaveis e output - Fundamentos", Variaveis.Executar},
                {"Manipulação de dados - Fundamentos", Manipulacao.Executar},
                {"Operadores - Fundamentos", Operadores.Executar},
                {"Unarios e Ternarios - Fundamentos", UnariosTernarios.Executar},
                {"Estruturas de Controle - Fundamentos", EstruturasDeControle.Executar},
                // Classes e metodos
                {"Classes - Classes", Classes.Executar},
            });

            central.SelecionarEExecutar();
        }
    }
}