using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Text;

namespace MathGame {
    class GameEngine {
        public static void Start() {
            Player p1 = new Player();
            Quest quest = new Quest();
            Console.WriteLine("Welcome to MathGame!");
            Console.WriteLine("Would you like to say your name?");
            do {
                p1.Name = Console.ReadLine();
            } while (p1.Name != null);
            int menu = 0;
            while (menu <= 0 && menu > 3) {
                Console.WriteLine("What would you like to do:");
                Console.WriteLine("[1] Start game" +
                    "[2] Game History" +
                    "[3] Exit");
                int.TryParse(Console.ReadLine(), out menu);
                if (menu <= 0 && menu > 3) {
                    Console.WriteLine("Not a valid option!");
                }
            }

            switch (menu) {
                case 1:
                    Console.WriteLine("Select a Challanger:");
                    Console.WriteLine($"{Difficulty.Random}" +
                        $"{Difficulty.Easy}" +
                        $"{Difficulty.Normal}" +
                       $"{Difficulty.Hard}");
                    
                    break;
                case 2:
                    break;
                case 3:
                    break;
                default:
                    Console.WriteLine("Error!");
                    break;
            }
                
            



        }
    }
}

