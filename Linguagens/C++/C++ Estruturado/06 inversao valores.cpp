/*
    Objetivo: Entender ivnersão de valores de variaveis (lembrando que sinais iguals positivo, sinais diferentes negativo)
*/


#include <iostream>

using namespace std;

int main(){

    int num=10;
    cout << num << "\n\n";


    // Uma das formas de inverter o valor
    // grava na variavel
    num = num *-1;
    cout << num << "\n\n";
     // não grava na variavel
    cout << -num << "\n\n";

    // na leitura do codigo num deve estar negativo
    cout << num << "\n\n";

    // simplificado
    num=-num; //inverte a variavel
    cout << num << "\n\n";


    return 0;
}