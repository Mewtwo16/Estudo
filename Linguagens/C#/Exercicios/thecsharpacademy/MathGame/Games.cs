using System;
using System.Collections.Generic;
using System.Text;

namespace MathGame {
    class Games {

        public static void randomGame(Quest quest, Player player) {
            int loop = 0;
            while(loop < 5) {
                Difficulty d = (Difficulty)Utils.GenNumber(1, 3);
                Operator op = (Operator)Utils.GenNumber(1, 3);
                switch (op) {
                    case Operator.Addition:
                        additionGame(quest, player);
                        break;
                    case Operator.Subtration:
                        subtrationGame(quest, player);
                        break;
                    case Operator.Multiplication:
                        multiplicationGame(quest, player);
                        break;
                    case Operator.Division:
                        divisionGame(quest, player);
                        break;
                }
                quest.difficulty = Difficulty.Random;
                loop++;
            }
        }

        public static void additionGame(Quest quest, Player player) {
            quest.SetNumbers(quest.difficulty);
            quest.Result = quest.N1 + quest.N2;
            Console.WriteLine($"Whats is the answer of the sum: {quest.N1} {quest.Op.ToSymbol()} {quest.N2}");
            player.Answer = int.Parse(Console.ReadLine());
            
            if(player.Answer == quest.Result) {
                Console.WriteLine("Correct answer");
                player.Score++;
            } else {
                Console.WriteLine("Wrong answer");
                player.Score--;
            }
        }
        public static void subtrationGame(Quest quest, Player player) {
            quest.SetNumbers(quest.difficulty);
            quest.Result = quest.N1 - quest.N2;
            Console.WriteLine($"Whats is the answer of the subtration: {quest.N1} {quest.Op.ToSymbol()} {quest.N2}");
            player.Answer = int.Parse(Console.ReadLine());

            if (player.Answer == quest.Result) {
                Console.WriteLine("Correct answer");
                player.Score++;
            } else {
                Console.WriteLine("Wrong answer");
                player.Score--;
            }

        }

        public static void divisionGame(Quest quest, Player player) {
            quest.SetNumbers(quest.difficulty);

            while (quest.N1 % quest.N2 != 0) {
                quest.SetNumbers(quest.difficulty);
            }

            quest.Result = quest.N1 / quest.N2;

            Console.WriteLine($"Whats is the answer of the division: {quest.N1} {quest.Op.ToSymbol()} {quest.N2}");
            player.Answer = int.Parse(Console.ReadLine());

            if (player.Answer == quest.Result) {
                Console.WriteLine("Correct answer");
                player.Score++;
            } else {
                Console.WriteLine("Wrong answer");
                player.Score--;
            }


        }

        public static void multiplicationGame(Quest quest, Player player) {
            quest.SetNumbers(quest.difficulty);
            quest.Result = quest.N1 * quest.N2;
            Console.WriteLine($"Whats is the answer of the multiplication: {quest.N1} {quest.Op.ToSymbol()} {quest.N2}");
            player.Answer = int.Parse(Console.ReadLine());

            if (player.Answer == quest.Result) {
                Console.WriteLine("Correct answer");
                player.Score++;
            } else {
                Console.WriteLine("Wrong answer");
                player.Score--;
            }

        }

    }
}
