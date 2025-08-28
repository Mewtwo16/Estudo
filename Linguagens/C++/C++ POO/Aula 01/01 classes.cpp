/*
    objetivo: Introdução a POO e estudo de classes
    Normalmente se separa o arquivo da classe do arquivo principal em um .H
*/

#include <iostream>
#include "JogadorBase.h" // me permite utilizar a função
#include "Classes.h"
#include "Movimento.h"
#include <vector>
#include <memory>


int main(){

    std::unique_ptr<JogadorBase> p1 = std::make_unique<Mago>();
    std::unique_ptr<JogadorBase> p2 = std::make_unique<Arqueiro>();
    std::unique_ptr<JogadorBase> p3 = std::make_unique<Guerreiro>();

    std::vector<std::unique_ptr<JogadorBase>> jogadores;
    jogadores.push_back(std::move(p1));
    jogadores.push_back(std::move(p2));
    jogadores.push_back(std::move(p3));

    std::cout << "\nExibindo a equipe:\n";
    for(const auto& j : jogadores){
        j->exibir();
        std::cout << "\n------------------\n";
    }

   
    return 0;
}