/*
    Objetivo: Entendimento do laço while

    formas de uso: 
    While (O Cauteloso): Testa a condição antes da primeira execução. Pode nunca rodar.
    Do-while (O Otimista): Testa a condição depois da primeira execução. Roda sempre pelo menos uma vez.
*/



#include <iostream>
#include <string>

int main(){

    int cont{};

    cont=0;

    // exemplo de while
    while(cont < 5){
        std::cout << "Contando - " << cont << "\n";
        cont++;
    }

    std::cout << "\nRotina finalizada\n";

    cont = 0;

    // exemplo de DO-While

    do{
        std::cout << "Contando - " << cont << "\n";
        cont++;
    }while(cont < 5);

    std::cout << "\nRotina finalizada\n";


    return 0;
}
