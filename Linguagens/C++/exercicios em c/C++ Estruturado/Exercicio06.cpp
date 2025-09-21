/*
    objetivo: Gerenciador de Lista de Tarefas
*/

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <numeric>
#include <thread>
#include <vector>

std::string validaEntrada(const std::string& prompt);
void imprimeLista(const std::vector<std::string>& item);
void search(std::vector<std::string>& lista);


int main(){

    std::vector<std::string> lista;
    std::string add;
    std::string tarefa;
    int menu{};
    


    do{
        std::cout << "\n\nBem vindo ao gerenciador de tarefas!\n\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
        std::cout << "Gerenciador de tarefas\n";
        std::cout << "Menu: \n [1]Adicionar tarefas\n [2]Listar tarefas\n [3]Buscar tarefas\n [4]Sair\n" << "Selecione: ";
        std::cin >> menu;
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
        std::this_thread::sleep_for(std::chrono::milliseconds(200));



        switch(menu){
            case 1:{
                int subMenu{};
                std::cout << "\nAdicionar tarefas!\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
                while(subMenu != 2){
                    add = validaEntrada("\nQual tarefa que deseja adicionar: ");
                    lista.push_back(add);
                    add.clear();
                    std::cout << "Deseja adicionar outra tarefa?\n [1]Sim\n [2]Nao\n Selecione: ";
                    std::cin >> subMenu;
                }
                break;
            }
            case 2:{
                std::cout << "\nListando tarefas!\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
                std::sort(lista.begin(), lista.end());
                imprimeLista(lista);
                break;
            }
            case 3:{
                std::cout << "\nBuscar tarefas!\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
                std::cout << "\nQual tarefa deseja buscar: ";
                search(lista);
                break;
            }
            case 4:{
                std::cout << "\nVoce escolhe sair!\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
                std::cout << "\nObrigado por utilizar o sistema!\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
                break;
            }
            default:
                std::cout << "\nOpção invalida\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
                break;
        }
    }while(menu != 4);



    return 0;
}


std::string validaEntrada(const std::string& prompt){
    std::string entrada;
    while(true){
        std::cout << prompt;
        std::getline(std::cin, entrada);
        if(entrada.empty() || std::all_of(entrada.begin(), entrada.end(), ::isspace)){
            std::cout << "\nErro!\n";
            std::cout << "Valor digitado invalido.";;
        } else{
            std::cout << "A tarefa adicionada foi " << entrada << "\n"; 
            return entrada;
        }
    }
}

void imprimeLista(const std::vector<std::string>& item){
    for(const auto& list : item){
        std::cout << list << "\n";
    }
}

void search(std::vector<std::string>& lista){
    std::string termo;
    bool validaProcura = false;
    std::getline(std::cin, termo);

    for(const auto& item : lista){
        if(item.find(termo) != std::string::npos){
            validaProcura = true;
        }
    };

    if(validaProcura){
        std::cout << "Tarefa " << termo << " encontrada na lista";
    }else {
        std::cout << "Tarefa " << termo << " nao encontrada na lista";
    }
}


