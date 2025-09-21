// Formatando a saida de dados:

Console.WriteLine("Saida de dados: Formatação ");
Console.WriteLine();

int idade = 25;
string nome = "Andre";

// Metodo trabalhoso
Console.Write(nome); // sem o line ele não pula linha
Console.Write(" tem ");
Console.Write(idade);
Console.Write(" anos ");
Console.WriteLine("----------concatenção----------");

// Utilizando concatenação com operador +
Console.WriteLine(nome + " tem " + idade + " anos."); // Escrevo tudo no mesmo comando posso usar apenas Console.Write
Console.WriteLine("----------Interpolação----------");
// Posso utilizar a interpolação de strings utilizando operador $ e colocando variaveis entre {}
Console.WriteLine($"{nome} tem {idade} anos"); // Forma atual de se fazer utilizando interpolação
Console.WriteLine("---------Place Holders-----------");

// Posso utilizar place holders : usa {} com nuemração inicial em zero

Console.WriteLine("{0} tem {1} anos",  nome, idade); // Utilizando place holders(não muito utilizado)

Console.WriteLine();

Console.WriteLine("Podemos utilizar sequencia de escapes");

// Resolve o erro ao utilizar "" e \\ dentro de strings

/*
    \b = backspace
    \n = nova linha
    \\ = \(barra invertida)
 */

// string textoEscape = "c:\\DEV\\texto.txt";
string exemplo = "\nPizza\tde\tmussalela";

Console.WriteLine(exemplo);

Console.ReadLine();
