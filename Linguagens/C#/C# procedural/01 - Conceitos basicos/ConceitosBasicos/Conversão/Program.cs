/*
    Tipos de conversão
    C# é uma liguagem estaticamente tipada então uma variavel não pode ser declarada duas vezes ou utilizar outro tipo de dados
    nos podemos converter um tipo de dados para outro e armazenar na variavel de duas formas
        Implicita - Feita automaticamente pelo compilador(se compativel)
        Explicita - Feita manualmente
*/

Console.WriteLine( "----- Conversão de tipos -----\n" );

int varInt = 100;
// Converção implicita(pois os tipos são compativeis, int usa 4 bytes e double usa 8 bytes, ao contrario daria erro)
double varDouble = varInt;

Console.WriteLine(varDouble);

int numeroInt = 2145678;
long numeroLong = numeroInt;
float numeroFloat = numeroInt;
double numeroDouble = numeroInt;
decimal numeroDecimal = numeroInt;

Console.WriteLine(numeroInt);
Console.WriteLine(numeroLong);
Console.WriteLine(numeroFloat);
Console.WriteLine(numeroDouble);
Console.WriteLine(numeroDecimal);

double tipoDouble = 12.456;
int tipoInt = (int)tipoDouble; // Aqui daria erro, mas posso fazer um cast para forçar a conversão tendo o risco de perder a precisão dos dados

int num1 = 10;
int num2 = 4;
float resultado = (float)num1 / num2; // Se não fizer um cast, ele vai considerar o tipo dos numeros divididos e retornar um inteiro

Console.ReadLine();

Console.WriteLine("Metodo de conversão ToString()");

int valorInt = 123;
double valorDouble = 12.45;
decimal valorDecimal = 12.45678m;

string s1 = valorInt.ToString();
string s2 = valorDouble.ToString();
string s3 = valorDecimal.ToString();

Console.WriteLine(s1);
Console.WriteLine(s2);
Console.WriteLine(s3);

// Posso usar a classe convert para converter outros tipos de dados

int vlrInt = 10;
double vlrDouble = 5.35;
bool vlrBoolean = true;

Console.WriteLine(Convert.ToString(vlrInt)); 
Console.WriteLine(Convert.ToDouble(vlrInt));
Console.WriteLine(Convert.ToString(vlrBoolean));
Console.WriteLine(Convert.ToInt32(vlrDouble));

// Conversão de um tipo maior para menor, estreitamento de dados, pode retornar o erro de overflowException, um erro em tempo de execução


Console.ReadLine();