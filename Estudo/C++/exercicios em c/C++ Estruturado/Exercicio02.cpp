/*
    Objetivo: Crie um programa que peça ao usuário para digitar 5 itens para uma lista de compras. 
    Armazene cada item em um std::vector<std::string>. 
    Depois que todos os 5 itens forem inseridos, o programa deve exibir a lista de compras completa na tela.
*/

#include <iostream>
#include <vector>
#include <string>

int main(){

    std::vector<std::string> lista;
    std::string add{};
    int valida{};
    
    do{
        std::cout << "Lista de compras!\n";
        std::cout << "[1] Adicionar item\n";
        std::cout << "[2] Ver lista\n";
        std::cout << "[3] Limpar lista\n";
        std::cout << "[4] Sair\n";
        std::cin >> valida;

        switch(valida){

            case 1: {
                for (int item=1; item<6; item++){
                    std::cout << "Adicione o " << item << ":\n";
                    std::cin >> add;
                    lista.push_back(add);
                }
            std::cout << "\n";
            break;
            }

            case 2: {
                if(lista.empty()){
                    std::cout << "Lista vazia!";
                } else{
                    for(const auto& item: lista){
                        std::cout << "\nOs itens são: " << item;
                        std::cout << "\n";
                    }
                }
            std::cout << "\n\n";
            break;
            }
            case 3:{
                lista.clear();
                std::cout << "Lista limpa!";
                break;
            }
            default:
                std::cout << "Opção invalida";
                break;
        }
    }while(valida != 4);


    return 0;
};



