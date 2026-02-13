using System;
using System.Diagnostics.Metrics;

namespace Fundamentos.POO {
    class Classes{
        public static void Executar(){
            MathGame mathGame = new MathGame();
            int menu;
            int resposta;
            Console.WriteLine("Bem vindo ao jogo de matemática!");
            do{
                Console.WriteLine("1 - Jogar\n2 - Ver histórico\n \n3 - Sair");
                menu = int.Parse(Console.ReadLine());
                switch(menu){
                    case 1:
                        Console.WriteLine(mathGame.GetQuestion());
                        resposta = int.Parse(Console.ReadLine());
                        if (resposta == mathGame.GetAnswer()){
                            Console.WriteLine("Parabéns! Você acertou!");
                        } else {
                            Console.WriteLine("Que pena! Você errou!");
                        }
                        break;
                    case 2:
                        Console.WriteLine("Histórico de operações:");
                        for(int i = 0; i < mathGame.History.Length; i++){
                            Console.WriteLine(mathGame.GetHistory(i));
                        }
                        break;
                    case 3:
                        Console.WriteLine("Saindo do jogo...");
                        break;
                    default:
                        Console.WriteLine("Opção inválida! Tente novamente.");
                        break;
                }
                
                
            } while (menu != 3);

        }
    }

    class MathGame{
        private readonly int _min = 0;
        private readonly int _max = 10;
        private int _num1;
        private int _num2;
        private string _operation;
        private int _answer;
        public string[] History = new string[10];
        
        public int GetRandom(){
            Random random = new Random();
            return random.Next(_min, _max);
        }

        private string GetOperation(){
            Random random = new Random();
            int op = random.Next(0, 3);
            string[] operations = {"+", "-", "*"};
            return operations[op];
        }

        public string GetQuestion(){
            _operation = GetOperation();
            this._num1 = GetRandom();
            this._num2 = GetRandom();
            return $"Qual a resposta da operação: {_num1} {_operation} {_num2} ?";
        }

        public int GetAnswer(){
            switch (_operation){
                case "+":
                    _answer = _num1 + _num2;
                    break;
                case "-":
                    _answer = _num1 - _num2;
                    break;
                case "*":
                    _answer = _num1 * _num2;
                    break;
            }

            List<string> temp = History.ToList();
            temp.Add($"{_num1} {_operation} {_num2} = {_answer}");
            History = temp.ToArray();
            return _answer;
        }
        
        public string GetHistory(int index){
            return History[index];
        }
        
        
        
    }
}