using System;
using System.Collections;
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
            QA quest = new QA();
            int count = 0;
            do{
                Console.WriteLine("What game would you like to play?");
                Console.WriteLine($"[0] - {tLevel(0)}");
                Console.WriteLine($"[1] - {tLevel(1)}");
                Console.WriteLine($"[2] - {tLevel(2)}");
                Console.WriteLine($"[3] - {tLevel(3)}");
                Console.WriteLine($"History");
                Console.WriteLine($"[9] - Exit");
                int.TryParse(Console.ReadLine(), out quest.level);
                if (quest.level != 0)
                {
                    Console.WriteLine("Select your challenger");
                    Console.WriteLine($"[0] - {tOp(0)}");
                    Console.WriteLine($"[1] - {tOp(1)}");
                    Console.WriteLine($"[2] - {tOp(2)}");
                    Console.WriteLine($"[3] - {tOp(3)}");
                    int.TryParse(Console.ReadLine(), out quest.op);
                }
                switch (quest.level)
                {
                    case 0:
                        while(count < 5) {
                            genQuest(ref quest);
                            count++;
                        }
                        break;
                    case 1:
                        while (count < 5) {
                            genQuest(ref quest);
                            count++;
                        }
                        break;
                    case 2:
                        while (count < 5) {
                            genQuest(ref quest);
                            count++;
                        }
                        break;
                    case 3:
                        while (count < 5) {
                            genQuest(ref quest);
                            count++;
                        }
                        break;
                    case 4:
                        GenHistory();
                        break;
                    case 9:
                        Console.WriteLine("Good bye");
                        break;
                    default:
                        Console.WriteLine("Sorry, maybe one of the values is not valid!");
                        break;
                }

                

            }while(quest.level != 9);




        }

        private void genQuest(ref QA quest)
        {
            genNumbers(ref quest);
                Console.WriteLine($"Answer: {quest.n1} {tOp(quest.op)} {quest.n2}: ");
                int.TryParse(Console.ReadLine(), out quest.uAnswer);
                if(quest.uAnswer == quest.result) {
                    Console.WriteLine("you beat it!");
                } else {
                    Console.WriteLine("Sorry, you fail!");
                }
                qaHistory.Add(quest);
            
        }

        private void GenHistory() {
            int count = 1;
            foreach(var h in qaHistory) {
                Console.WriteLine($"========== Game {count} ==========");
                Console.WriteLine($"Question: {h.n1} {tOp(h.op)} {h.n2}");
                Console.WriteLine($"Result: {h.result}");
                Console.WriteLine($"Your Answer: {h.uAnswer}");
                Console.WriteLine("==========   =========   ==========");
            }
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
