#include <iostream> // biblioteca io(entrada e saida ou in e out)
#include <stdio.h> // bibloteca tambem de entrada e saida

using namespace std; //std = standard informa onde irão buscar as biblotecas


int main() //Função int de inteiro é um retorno de valor inteiro, main de principal está é a função principal de c++
{

    int variavel;

    // entrada padrão com cin
    cin >> variavel;
    // Saida de testo com cout
    cout << "O valor de variavel é: " << variavel << endl;

    // entrada com scanf
    scanf("%d", &variavel);
    // Saida de texto com printf
    printf("Agora o valor da variavel é: %d", variavel);
/*
    %d ou %i: para int (inteiro decimal)
    %f: para double ou float (ponto flutuante)
    %c: para char (caractere único)
    %s: para strings no estilo C (char*)
    %p: para ponteiros (imprime o endereço de memória)
    %%: para imprimir o próprio símbolo de porcentagem %
*/


    return 0;

}

/*
Operações dentro de () tem prioridade, assim como na matematica classica 
Operadores: + adição, - Subtração, / Divisão, * Multiplicação, % Resto
Operadores logicos: 

1 = verdadeiro
0 = falso

Todas as condições devem ser verdadeiras
AND(e) = &&

Uma ou mais condicões devem ser verdadeiras
OR(ou) = ||

Inverte a operação se for o valor for verdadeiro = falso se o valoir for falso = verdadeiro
NOT(não) = !

*/



/* <- esta estrutura serve para comentar varias linhas

tudo até aqui foi comentado -> */