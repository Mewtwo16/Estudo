using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks.Sources;

namespace MathGame {

    public enum Difficulty {
        Random,
        Easy,
        Normal,
        Hard,
    }
    public enum Operation {
        Addition,
        Subtraction,
        Multiplication,
        Division,
    }

    public static class OperationExtensions {
        public static string ToSymbol(this Operation op) => op switch {
            Operation.Addition => "+",
            Operation.Subtraction => "-",
            Operation.Multiplication => "*",
            Operation.Division => "/",
            _ => "?"
        };
    }

    class Game {

      
        private struct QA {
            public int n1;
            public int n2;
            public int result;
            public int uAnswer;
            public int score;
            public Operation op;
            public Difficulty level;
        }

        private Random rnd = new Random();
        private List<QA> qaHistory = new List<QA>();
        public void Start() {
            QA quest = new QA();
            int menu;
            Console.WriteLine("What game would you like to play?");
            Console.WriteLine($"[0] - {Difficulty.Random}");
            Console.WriteLine($"[1] - {Difficulty.Easy}");
            Console.WriteLine($"[2] - {Difficulty.Normal}");
            Console.WriteLine($"[3] - {Difficulty.Hard}");
            Console.WriteLine($"[4] - History");
            Console.WriteLine($"[9] - Exit");
            int.TryParse(Console.ReadLine(), out menu);
            if (menu > 0 && menu < 3) {
                quest.level = (Difficulty)menu;
            }
            Console.WriteLine($"Selecionado: {quest.level} ");
            if (quest.level != 0 && menu < 4) {
                Console.WriteLine("Select your challenger");
                Console.WriteLine($"[0] - {Operation.Addition}");
                Console.WriteLine($"[1] - {Operation.Subtraction}");
                Console.WriteLine($"[2] - {Operation.Multiplication}");
                Console.WriteLine($"[3] - {Operation.Division}");
            }

            if (menu >= 0 && menu < 4) {
                genQuest(ref quest);
                Console.WriteLine($"Your score was: {quest.score}");
            } else if (menu == 4) {
                GenHistory(ref quest);
            } else if (menu == 9) {
                Console.WriteLine("Thank you for playing");
            } else {
                Console.WriteLine("Opção invalida");
            }
        }
                
        private void genQuest(ref QA quest) {
            int count = 0;
            while(count < 5) {
                genNumbers(ref quest);
                Console.WriteLine($"Answer: {quest.n1} {quest.op.ToSymbol()} {quest.n2}: ");
                int.TryParse(Console.ReadLine(), out quest.uAnswer);
                if (quest.uAnswer == quest.result) {
                    quest.score++;
                    Console.WriteLine("you beat it!");
                } else {
                    Console.WriteLine("Sorry, you fail!");
                    Console.WriteLine($"Correct answer: {quest.result}");
                }
                addHistory(quest);
                count++;
            }
        }

        private void addHistory(QA quest) {
            qaHistory.Add(quest);
        }

        private void GenHistory(ref QA quest) {
            int count = 1;
            if (qaHistory == null) {
                Console.WriteLine("Nothing Here");
                return;
            }

            foreach (var h in qaHistory) {
                Console.WriteLine($"========== Game {count} ==========");
                Console.WriteLine($"Question: {h.n1} {quest.op.ToSymbol()} {h.n2}");
                Console.WriteLine($"Result: {h.result}");
                Console.WriteLine($"Your Answer: {h.uAnswer}");
                Console.WriteLine("==========   =========   ==========");
            }
        }

        private void genNumbers(ref QA quest) {
            int min = 0, max = 0;
            if (quest.level == Difficulty.Random) {
                quest.op = (Operation)rnd.Next(0, 4);
                min = 1;
                max = 100;
            }

            if (quest.level == Difficulty.Easy) {
                min = 1;
                max = 10;
            } else if (quest.level == Difficulty.Normal) {
                min = 2;
                max = 50;
            } else if (quest.level == Difficulty.Hard) {
                min = 2;
                max = 100;
            }

            if (quest.op == Operation.Division) {
                quest.n2 = rnd.Next(min, max);
                quest.result = rnd.Next(min, max);
                quest.n1 = quest.result * quest.n2;
            } else {
                quest.n1 = rnd.Next(min, max);
                quest.n2 = rnd.Next(min, max);
                quest.result = quest.op switch {
                    Operation.Addition => quest.n1 + quest.n2,
                    Operation.Subtraction => quest.n1 - quest.n2,
                    Operation.Multiplication => quest.n1 * quest.n2,
                    Operation.Division => quest.n1 / quest.n2,
                    _ => 0
                };
            }
        }
    }
}

