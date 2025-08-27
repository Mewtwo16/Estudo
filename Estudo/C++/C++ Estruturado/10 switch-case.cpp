/*
    Objetivo: Switch-case
*/

#include <iostream>
#include <string>

int main(){

    int val;

    std::cout << "Selecione uma cor: \n";
    std::cout << "[1] Verde, [2] Azul, [3] Vermelho\n";
    std::cin >> val;


    // estrutura de switch case, pode ser usado a opção [[fallthrough]];
    switch(val){
        case 1:
            std::cout << "verde";
            
            break;
        case 2:
            std::cout << "Azul";
            break;
        case 3:
            [[fallthrough]];
            // a ausencia do break e a presença do fallthrough 
            //indica que quando for 3 ele vai cair para o 4 verificando multiplas condições
        case 4:
            std::cout << "Vermelho";
            break; // para a verificação
        default:
            std::cout << "Cor não encontrada";
    }
    


    return 0;
}