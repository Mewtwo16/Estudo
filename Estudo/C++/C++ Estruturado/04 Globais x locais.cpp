/*
    Objetivo: Variaveis Globais x Locais e operadores matematicos
    Operadores: + adição, - Subtração, / Divisão, * Multiplicação, % Resto
    Operações dentro de () tem prioridade, assim como na matematica classica 
*/

#include <iostream>
using namespace std;

// Variaveis Globais, podem ser acessadas em todas as funções
int n1,n2;

int main(){

    // Variaveis locais, só podem ser acessadas dentro do main
    int n3,n4;
    int res, res2;

    n1=11;
    n2=3;
    n3=5;
    n4=2;

    res1 = n1/n2;
    res2 = n1%n2;

    cout << "Divis: " << res1 << "\n";
    cout << "Resto: " << res2 << "\n\n";



    return 0;
}