using System;
using System.Collections.Generic;
using System.Text;

namespace MathGame {
    class Games {

        public static void randomGame(Quest quest, Player player, History history) {
            int loop = 0;
            while(loop < 5) {
                Difficulty d = (Difficulty)Utils.GenNumber(1, 3);
                Operator op = (Operator)Utils.GenNumber(0, 3);
                quest.difficulty = d;
                quest.Op = op;
                switch (op) {
                    case Operator.Addition:
                        additionGame(quest, player, history);
                        break;
                    case Operator.Subtration:
                        subtrationGame(quest, player, history);
                        break;
                    case Operator.Multiplication:
                        multiplicationGame(quest, player, history);
                        break;
                    case Operator.Division:
                        divisionGame(quest, player, history);
                        break;
                }
                loop++;
            }
            quest.difficulty = Difficulty.Random;
        }

        public static void additionGame(Quest quest, Player player, History history) {
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
            history.AddHistory(player, quest);
        }
        public static void subtrationGame(Quest quest, Player player, History history) {
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
            history.AddHistory(player, quest);
        }

        public static void divisionGame(Quest quest, Player player, History history) {
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
            history.AddHistory(player, quest);

        }

        public static void multiplicationGame(Quest quest, Player player, History history) {
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
            history.AddHistory(player, quest);

        }

    }
}
