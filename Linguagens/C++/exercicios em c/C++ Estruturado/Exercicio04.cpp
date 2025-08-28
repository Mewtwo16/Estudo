/*
    Objetivo: Crie um std::vector<std::string> com uma lista de 5 a 10 nomes pré-definidos. 
O programa deve pedir ao usuário para digitar um nome. Em seguida, o programa deve percorrer o vetor para verificar se o nome digitado existe na lista. 
No final, exiba uma mensagem como "Nome encontrado!" ou "Nome não encontrado.".
Dica: Use uma variável bool como "flag" para saber se o nome foi encontrado enquanto você percorre o vetor com um laço.
*/


#include <iostream>
#include <vector>
#include <string>


int main(){

    std::vector<std::string> lista;
    std::string nome;
    bool valida;
    int menu{};
    std::string add;

    do{
        std::cout << "\nProcurador\n";
        std::cout << "[1]Adicionar nomes ou limpar lista\n" << "[2]Listar nomes\n" << "[3]Procurar nomes\n" << "[4]Sair\n";
        std::cout << "Selecione:\n"; 
        std::cin >> menu;
        
            switch(menu){
                case 1:{
                    int submenu{};
                    std::cout << "Dejese adicionar ou limpar a lista\n" << "[1]Adicionar\n" << "[2]Remover\n";
                    std::cout << "\nSelecione:"; 
                    std::cin >> submenu;
                    switch (submenu){
                        case 1:{
                            std::cout << "\nAdicione 6 nomes: \n";
                            int item{};
                            for (int item=1; item<7; item++){
                                std::cout << item << ": ";
                                // Usa getline para ler nomes completos
                                std::getline(std::cin, add);
                                lista.push_back(add);
                            };
                            break;
                        };
                        case 2:{
                            lista.clear();
                            std::cout << "\nSua lista está vazia!\n";
                            break;
                        };
                        default:
                            std::cout << "Opção invalida";
                            break;
                    };
                    break;
                };
                case 2:{
                    std::cout << "Os nomes em sua lista são: \n";
                    for(const auto& list : lista){
                        std::cout << list << "\n";
                    };
                    break;
                };
                case 3:{
                    valida = false;
                    std::cout << "Qual nome deseja verificar se existe na lista: \n";
                    std::cin >> nome;
                    for(const auto& procura : lista){
                        if(procura == nome){
                            valida = true;
                            break;
                        };
                    };
                    if(valida){
                        std::cout << "O nome está na lista\n";
                    } else{
                        std::cout << "O nome não esta na lista\n";
                    }
                    break;
                };
            default:
                std::cout << "Opção invalida!\n" << "Digite apenas numeros inteiros\n";
                break;
            };
    }while(menu != 4);

    return 0;
};