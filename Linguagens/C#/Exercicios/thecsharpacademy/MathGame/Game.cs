using System;
using System.Collections.Generic;
using System.Text;

namespace MathGame {
    
    class Game {

        enum difficulty {
            Random,
            Easy,
            Normal,
            Hard,
        }

        enum operation{
            Addition,
            Subtraction,
            Multiplication,
            Division,
        }
        private struct QA
        {
            public int n1;
            public int n2;
            public int result;
            public int uAnswer;
            public int op;
            public int level;
        }

        private Random rnd = new Random();
        private List<QA> qaHistory;
        public void Start() {
            Console.WriteLine("What game would you like to play?");
            Console.WriteLine($"{tLevel(0)}");
            Console.WriteLine($"{tLevel(1)}");
            Console.WriteLine($"{tLevel(2)}");
            Console.WriteLine($"{tLevel(3)}");
        }

        private void genQuest(ref QA quest)
        {
            Console.WriteLine($"Qual a resposta? {quest.n1} {tOp(quest.op)} {quest.n2}: ");
        }

        private void genNumbers(ref QA quest)
        {
            int min = 0, max = 0;
            if (quest.level == 0)
            {
                quest.op = rnd.Next(0, 4);
                quest.level = rnd.Next(1, 4);
            }

            if (quest.level == 1)
            {
                min = 1;
                max = 10;
            }else if (quest.level == 2)
            {
                min = 2;
                max = 50;
            }
            else if (quest.level == 3)
            {
                min = 2;
                max = 100;
            }

            if (quest.op == 3)
            {
                quest.n1 = rnd.Next(min, max);
                quest.result = rnd.Next(min, max);
                quest.n2 = quest.result * quest.n1;
            }
            else
            {
                quest.n1 = rnd.Next(min, max);
                quest.n2 = rnd.Next(min, max);
            }
        }

        private string tOp(int op)
        {
            if (op == 0)
            {
                return "+";
            }

            if (op == 1)
            {
                return "-";
            }

            if (op == 2)
            {
                return "*";
            }

            if (op == 3)
            {
                return "/";
            }
            return "missing";
        }

        private string tLevel(int level)
        {
            if (level == 0)
            {
                return "Random";
            }

            if (level == 1)
            {
                return "Easy";
            }

            if (level == 2)
            {
                return "Normal";
            }

            if (level == 3)
            {
                return "Hard";
            }

            return "Missing";
        }

    }

}
