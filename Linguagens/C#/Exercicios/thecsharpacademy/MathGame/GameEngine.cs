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
            p1.SetName();
            Console.WriteLine($"Very nice {p1.Name}, select your challenger:");
            Console.WriteLine($"{Difficulty.Random}");
            Console.WriteLine($"{Difficulty.Easy}");
            Console.WriteLine($"{Difficulty.Normal}");
            Console.WriteLine($"{Difficulty.Hard}");
            bool isValid;
            do
            {
                string input = Console.ReadLine();

                isValid = Enum.TryParse(input, true, out quest.difficulty);

                if (!isValid)
                {
                    Console.WriteLine("Invalid option, please try again.");
                }
            } while (!isValid);







        }
    }
}

