/*
    Ojetivo: Criar um programa que calcule e liste as notas
    No seu main, crie um std::vector<double> já preenchido com as seguintes notas: {8.5, 9.0, 5.5, 4.0, 7.5, 10.0, 6.0}.
    Seu programa deve calcular e exibir a média de todas as notas e, em seguida, contar e exibir quantos alunos ficaram com a nota acima da média.
*/

#include <iostream>
#include <string>
#include <vector>


int main(){

    // vetor com 6 notas
    std::vector<double> notas;
    double soma{};
    double media{};
    double add{};
    int menu{};

    do{

        // Menu
        std::cout << "\nCalculadora de media de notas\n";
        std::cout << "Selecione a opção desejada: \n\n";
        std::cout << "[1]Adicionar notas\n" << "[2]Calcular media\n" << "[3]Situação da nota\n" << "[4]Ver notas\n" << "[5]Sair \n";
        std::cout << "\nselecione: ";
        std::cin >> menu;

        std::cout << "\n";

        switch (menu){
        
        // Mostrando as notas
        case 1:{
            notas.clear();
            std::cout << "Adicione 6 notas: \n";
            for (int item=1; item<7; item++){
                std::cout << item << ": ";
                std::cin >> add;
                notas.push_back(add);
            };
            std::cout << "\n";
            break;
        }
        // Calculando a media    
        case 2:{
            soma = 0.0; // <-- A correção mais importante! (se eu não zerar a variavel ele vai acumulando as somas infinitamente)
            std::cout << "\nA media da turma é: ";
                for(const auto& nota : notas){
                    soma += nota;
                };
            media = soma / 6;
            std::cout << media << "\n";
            break;
        };
        // Ranqueado as notas
        case 3:{
            if(media == 0){
                std::cout << "Calcule a media primeiro na opção [2]\n";
                break;
            }else {
                std::cout << "\nOs alunos ficaram: \n";
                for(const auto& nota : notas){
                    if(nota > media){
                        std::cout << nota << " Acima da media" << "\n";
                    } else if(nota < media){
                        std::cout << nota << " Abaixo da media" <<  "\n";
                    }else{
                        std::cout << "Não foi possivel calcular media";
                    };
                };
            };
            break;
        };
        case 4:{
            std::cout << "\nAs notas são: \n";
            for(const auto& valor : notas){
                std::cout << valor << "\n";
            };
            break;}
        default:
            std::cout << "\nOpção invalida!\n";
            break;

        };

    }while(menu != 5);
    
    return 0;
};