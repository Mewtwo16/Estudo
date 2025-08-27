/*
    Objetivo: Estudo de if-else
*/

#include <iostream>
#include <cstdlib>
#include <limits>

int main(){

    /*
    int num1, num2, res;
    char opc='s';

    cout << "Digite um numero inteiro:";
    cin >> num1;
    cout << "Digite um numero inteiro:";
    cin >> num2;


    // bloco da estrura de if-else
    if(num1 > num2){
        cout << "Valor do primeiro numero maior que segundo"; 
    } else if(num1 < num2){
        cout << "Valor do primeiro numero menor que segundo";
    } else{
        cout << "Valores iguails";
    }
    */

    inicio:
    system("cls");

    int n1{};
    std::cout << "Digite o valor da nota 1: ";
    std::cin >> n1;

    int n2{};
    std::cout << "Digite o valor da nota 2: ";
    std::cin >> n2;

    int res = n1 + n2;

    if(res >= 60){
        std::cout << "\nAluno Aprovado\n";
    } else if(res >= 40){
        std::cout << "\nAluno em recuperação\n";
    } else{
        std::cout << "\nAluno reprovado\n";
    }

    char opc = 's';
    std::cout << "\nDigitar outras notas?[s/n]: ";
    std::cin >> opc;

    if(opc == 's' || opc == 'S'){
        goto inicio;
    }

    return 0;
}