class RemoteControlCar
{

    protected int Distance = 0;
    protected int Battery = 100;
    public static RemoteControlCar Buy() => new RemoteControlCar();

    public string DistanceDisplay() => $"Driven {Distance} meters";

    public string BatteryDisplay() => (Battery == 0) ? "Battery empty" : $"Battery at {Battery}%";

    public void Drive()
    {
        if (Battery == 0) return;
        Battery -= 1;
        Distance += 20;
    }
}
