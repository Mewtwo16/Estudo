/*
    C# é fortemente tipada e deve ser declarado qual tipo de dados vai ser usado em cada variavel
        
    Os tipos de dados de 
        REFERENCIA não armazenam diretamente na variavel e sim são armazenados na memoria heap(armazena objetos mais complexos)  
        VALOR armazenam diretamente seus dados na variavel na memoria tipo stack (LIFO - last-in fist-out, o ultimo que entra é o primeiro que sai)

    Convenções:
        Em nome de variavel, aprametros e campos internos privados
            Camel case = primeiraPalavra minusculo e subsequentes maisculo
        Em classes, métodos, interfaces e propriedades
            Pascal Case - PrimeiraLetra de cada palavra iniciada em maiscula
        Em constantes normalmente em MAIUSCULO
        (_) Sublinhados se alinham com camel case e são utilizados em campos internos privados e somente leitura
          
*/

/// Declarando variaveis em C#

Console.WriteLine("Declarando as variaveis numericas:");
byte valor1 = 255;
sbyte valor2 = -127;
int valor3 = -2147483647;
uint valor4 = 2147483647;
long valor5 = -21474836489;

Console.WriteLine( valor1);
Console.WriteLine( valor2);
Console.WriteLine( valor3);
Console.WriteLine( valor4);
Console.WriteLine( valor5);
Console.ReadLine();

// Declarando as variaveis de ponto flutuante cujo valor inicial sempre é zero se não inicializada
// São valores armazenados na stack
Console.WriteLine("Declarando as Variaveis de ponto flutuante: ");
Console.WriteLine();
// utilizam sufixo para serem inicializados (float = f-F, Decimal = m-M, Double = d-D)

// Não é obritatorio sufixo no double
double n1 = 1.234; // tamanho de 8 bytes
// Nos outros se fazem necessario sufixo
float n2 = 1.234f; // Tamanho de 4 bytes
decimal n3 = 1.234m; // Tamanho de 16 Bytes

Console.WriteLine("Imprimindo numero 1 tipo double = " + n1);
Console.WriteLine("Imprimindo numero 2 tipo float = " + n2);
Console.WriteLine("Imprimindo numero 3 tipo decimal = " + n3);
Console.ReadLine();

Console.WriteLine("Comparando a precisão de cada um deles:");
Console.WriteLine();

float x = 1f / 3f;
double y = 1d / 3d;
decimal z = 1m / 3m;

Console.WriteLine("Precisão de float = " + x);
Console.WriteLine("Precisão de  double = " + y);
Console.WriteLine("Precisão de decimal = " + z);
Console.ReadLine();

// Tipos boleanos
/*
    bool = true or false, valor padrão false (utiliza 8bits)
    char = Armazena um unico caracter unicode, valor padrão null (utiliza 16bits)
*/

Console.WriteLine("Declarando variaveis de tipo boleanas:");
Console.WriteLine();

bool ativo = true;
Boolean inativo = false;

Console.WriteLine( ativo );
Console.WriteLine(inativo);
Console.WriteLine();
int a = 10;
int b = 15;
Console.WriteLine(a == b); // Comparações retornam true or false um tipo booleano

Console.WriteLine("Tipo char: ");

// Aceita apenas caracteres unicode
char letra1 = 'A'; // Deve ser declarado usando aspas simples '' tudo em aspas duplas "" é uma string
// Formato unicode: 
char letra2 = '\u0041';

Console.WriteLine(letra1);
Console.WriteLine(letra2);

Console.Read();

// Valores de tipo são armazenados na memoria heap
Console.WriteLine("Declarando Tipos de referencia: ");

/*
    Tipo:
        string representa uma sequencia de zero ou mais caracteres unicode
        object é a base para todos os outros tipos
        dynamic são resolvidos em tempo de execução(se comporta como tipo object em diversos casos)
    Valor padrão de todas é null
*/

// Tipo string
string nome = "Teste de string"; // Tem por caracteristica ser imutavel
Console.WriteLine("Exibindo a variavel tipo string = " + nome);
nome = "Mudando valor"; // aloquei outro espaço na memoria
// Se o programa alterasse varias vezes poderia encher a memoria de lixo
// o C# tem um garbage colector, porem é de boa pratica evitar disperdicios
Console.WriteLine(nome);

// Tipo object
// O mesmo se daria se eu utlizasse o tipo dynamic
object t1 = "Nome";
object t2 = 5;
object t3 = true;
object t4 = 5.186m;
Console.WriteLine(t1);
Console.WriteLine(t2);
Console.WriteLine(t3);
Console.WriteLine(t4);
Console.ReadLine();

// Tipo de dados DateTime representa um momento no tempo e o valor padrão é  01/01/0001 00:00:00
// Representa a hora no formato do sistema

Console.WriteLine("Declarando tipo datetime: ");

DateTime dataAtual = DateTime.Now; // Obtem a data atual
Console.WriteLine(dataAtual);
// Cria uma nova data deve utilizar o padrão AAAA, MM, DD
DateTime dataHoje = new DateTime(2022, 09, 06);
Console.WriteLine(dataHoje);
// Para criar com a hora junta deve se utilizar o mesmo padrão acrescentando HH, MM, SS\
DateTime dataHoraHoje = new DateTime(2022,09,06, 21,10,30);
Console.WriteLine(dataHoraHoje);
//Metodos para extrair data: 
Console.WriteLine(dataAtual.Year);
Console.WriteLine(dataHoje.Month);
Console.WriteLine(dataHoje.Day);
Console.WriteLine(dataAtual.Hour);
Console.WriteLine(dataHoje.Minute);
Console.WriteLine(dataHoje.Second);
Console.WriteLine(dataHoje.Millisecond);
// Adicionando valores
Console.WriteLine(dataAtual.AddDays(30));
Console.WriteLine(dataAtual.AddMonths(1));
Console.WriteLine(dataAtual.AddHours(2));
Console.WriteLine(dataAtual.AddYears(5));
// Obtendo dias da semana e do ano
Console.WriteLine(dataAtual.DayOfWeek);
Console.WriteLine(dataAtual.DayOfYear);
// Data no formato longo e curto
Console.WriteLine(dataAtual.ToLongDateString());
Console.WriteLine(dataAtual.ToShortDateString());
Console.WriteLine(dataAtual.ToLongTimeString());
Console.WriteLine(dataAtual.ToShortTimeString());


Console.ReadLine();

// Tipos de nullable ou tipos anulaveis
// Por padrão int não pode ser = a null

Console.WriteLine("Declarando valores do tipo null: ");

Nullable<int> e = null; // Os tipos null não são iguais aos tipos de valor
Nullable<double> f = null;
Nullable<bool> g = null;
Console.WriteLine("Exibindo um int null = " + e);
Console.WriteLine("Exibindo um double null = " + f);
Console.WriteLine("Exibindo um bool null = " + g);

int? i = null; // Simplificando a declaração usando o operador ?
Console.WriteLine("Exibindo um int null simplificado = " + i);
int j = i ?? 0; // O operador ?? retorna o valor a a esquerda se ele não for null, caso seja null retorna o valor a direita
Console.WriteLine(i);
// em nullable types posso usar .HasValue para retornar true se tiver valor e false se for null

Console.ReadLine();













