


public class Player
{
    public int RollDie()
    {
        var rand = new Random();
        return rand.Next(1, 19);
    }

    public double GenerateSpellStrength()
    {
        var rand = new Random();
        return 0.0 + (rand.NextDouble() * (100.0 - 0.0));
    }
}
