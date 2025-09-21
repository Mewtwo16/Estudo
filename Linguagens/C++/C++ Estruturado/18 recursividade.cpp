/*
    Objetivo: Funções recursivas
    Funções que chamam a si mesmas
*/

#include <iostream>
#include <string>
#include <vector>

void contador(int num, int cont=0);

int main(){

    contador(20);

    return 0;
}

void contador(int num, int cont){
    std::cout << cont << "\n";
    if(num > cont){
        contador(num,++cont);
    }
}