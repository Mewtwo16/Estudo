Console.WriteLine("Entendendo a entrada de dados");

/*
    .ReadLine(): Le uma unica linha de entrada - Retornar uma string
    .Read(): Le apenas um unico caracter - Retorna valor ASCII
    .ReadKey(): Le apenas um unico caracter(apenas a proixima tecla pressionada) - retorna ConsoleReadKey
*/

Console.WriteLine("\nInforme seu nome: ");

string nome = Console.ReadLine();

Console.WriteLine("\nInforme a sua idade: ");

int idade = Convert.ToInt32(Console.ReadLine());

Console.WriteLine($"\nO seu nome é {nome}");

Console.WriteLine($"\nA sua idade é: {idade}");

Console.ReadKey();