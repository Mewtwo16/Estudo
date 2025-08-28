/*
    Objetivo: incremento e decremento de variaveis
*/

#include <iostream>

using namespace std;

int main(){

    int n1, n2;

    n1 = 15;
    n2 = 10;

    cout << n1 << "\n\n";

    // formas de incremento (pode ser usado diversos operadores +, -, *, /, etc)
    //padrão
    n1 = n1 + 1;
    cout << n1 << "\n\n";
    //resumido (posso colocar o valor que quiser para incrementar ou decrementar)
    n1 + = 1;
    cout << n1 << "\n\n";
    //outra forma (esta forma vai sempre ser +1 ou -1)
    // pos fixado
    n1++;
    cout << n1 << "\n\n";
    // pre fixado
    ++n1: 
    cout << n1 << "\n\n";
    // muda quando será incrementado em comandos
    //exemplo de pré = cout << ++n1 << "\n\n";
    //exemplo de pos = cout << n1++ << "\n\n";
    // todos os comandos acima serve para a mesma função senmdo apenas uma forma resumida


    return 0;
}


