using System;
using System.Collections.Generic;
using System.Text;

namespace MathGame {
    class History
    {
        private record CompletedQuest(Player player, Quest quest);
        private List<CompletedQuest> _cqHistory = new List<CompletedQuest>();

        public void AddHistory(Player player, Quest quest)
        {
            _cqHistory.Add(new CompletedQuest(player, quest));
        }

        public void GetHistory()
        {
            foreach (var cqHistory in _cqHistory)
            {
                Console.WriteLine("===== ===== ===== =====");
                Console.WriteLine($"Player: {cqHistory.player.Name}");
                Console.WriteLine($"Question: {cqHistory.quest.N1} {cqHistory.quest.Op.ToSymbol()} {cqHistory.quest.N2}");
                Console.WriteLine($"Player Answer: {cqHistory.player.Answer}");
                Console.WriteLine($"Correct Answer: {cqHistory.quest.Result}");
                // Console.WriteLine($"ResponseTime: {cqHistory.ResponseTime}");
            }
        }

    }
}
