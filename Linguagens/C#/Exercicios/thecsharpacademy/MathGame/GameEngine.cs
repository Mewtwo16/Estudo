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
            Console.WriteLine($"Very nice {p1.Name}!");
            quest.SetDifficulty();
            Console.WriteLine($"Chosen: {quest.difficulty}");
            if (quest.difficulty != Difficulty.Random) {
                quest.SetOp();
            }else if(quest.difficulty == Difficulty.Random){
                Games.randomGame(quest);
            }

        }
    }
}

