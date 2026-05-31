using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;

namespace MathGame {
    class GameEngine {
        public static void Start() {
            Player player = new Player();
            Quest quest = new Quest();
            History history = new History();
            int menu = 0;
            Console.WriteLine("Welcome to MathGame!");
            Console.WriteLine("Would you like to say your name?");
            player.SetName();
            Console.WriteLine($"Very nice {player.Name}!");

            while (menu != 9) {

                player.Score = 0;

                Console.WriteLine("What would you like to do:");
                Console.WriteLine("[1] - Start Game");
                Console.WriteLine("[2] - History");
                Console.WriteLine("[9] - Exit");
                int.TryParse(Console.ReadLine(), out menu);

                switch (menu) {
                    case 1:
                        quest.SetDifficulty();
                        if (quest.difficulty != Difficulty.Random) {
                            quest.SetOp();
                        } else if (quest.difficulty == Difficulty.Random) {
                            Games.randomGame(quest, player, history);
                        }
                        int loop = 0;
                        while (loop < 5) {
                            switch (quest.Op) {
                                case Operator.Addition:
                                    Games.additionGame(quest, player, history);
                                    break;
                                case Operator.Subtration:
                                    Games.subtrationGame(quest, player, history);
                                    break;
                                case Operator.Multiplication:
                                    Games.multiplicationGame(quest, player, history);
                                    break;
                                case Operator.Division:
                                    Games.divisionGame(quest, player, history);                                    
                                    break;
                                default:
                                    Console.WriteLine("Invalid Option!");
                                    break;
                            }
                            loop++;
                        }
                        Console.WriteLine($"Final score: {player.Score}");

                        if (player.Score == 5) {
                            Console.WriteLine("Congratilations!!!");
                            Console.WriteLine($"Your answer for the 5 quests was corret!");
                        }
                        if (player.Score > 2 && player.Score <= 4) {
                            Console.WriteLine("You did good, but can be better!");
                            Console.WriteLine($"You anwsred {player.Score} questions correctly.");
                        }
                        if (player.Score <= 1) {
                            Console.WriteLine("Keep trying");
                            Console.WriteLine($"You only {player.Score} questions correctly...");
                        }
                        break;
                    case 2:
                        history.GetHistory();
                        break;
                    case 9:
                        Console.WriteLine("Thank you for playing!");
                        break;
                    default:
                        Console.WriteLine($"{menu} is not a valid option");
                        break;
                }
            }

        }
    }
}

