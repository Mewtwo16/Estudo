using System;
using System.Collections.Generic;
using System.Text;

namespace MathGame {
    class Games {

        public static void randomGame(Quest quest) {
            Difficulty d = (Difficulty)Utils.GenNumber(1, 3);
            Operator op = (Operator)Utils.GenNumber(1, 3);

            switch (op) {
                case Operator.Addition:
                    additionGame(quest);
                    break;
                case Operator.Subtration:
                    subtrationGame(quest);
                    break;
                case Operator.Multiplication:
                    multiplicationGame(quest);
                    break;
                case Operator.Division:
                    divisionGame(quest);
                    break;
            }

            quest.difficulty = Difficulty.Random;

        }

        public static void additionGame(Quest quest) {



        }
        public static void subtrationGame(Quest quest) {

        }

        public static void divisionGame(Quest quest) {

        }

        public static void multiplicationGame(Quest quest) {

        }

    }
}
