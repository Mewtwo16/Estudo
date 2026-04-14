static class Badge
{
    public static string Print(int? id, string name, string? department)
    {
        if(department is null) department = "OWNER";
        if(id is null) return $"{name} - {department.ToUpper()}";

        return $"[{id}] - {name} - {department.ToUpper()}";
    }
}
