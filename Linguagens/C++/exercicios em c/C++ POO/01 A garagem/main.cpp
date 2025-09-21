/*
    Objetivo: Garagem de posso unica
*/

#include <memory>
#include <iostream>
#include <utility>
#include <string>
#include "Pessoa.h"
#include "Carro.h"

int main(){

    // Criação de um ponteiro inteligente do tipo Classe carro, make_unique uma função que passa tudo dentro de ("") para o construtor 
    //std::unique_ptr<Carro> fusca = std::make_unique<Carro>("Fusca");
    // Desta forma o compilador sabe que auto fusca é um tipo unique_ptr
    auto fusca = std::make_unique<Carro>("Fusca");
    Pessoa andre("André");
    Pessoa saga("Saga");

    andre.comprarCarro(std::move(fusca));
    andre.mostrarCarro();

    saga.comprarCarro(std::move(andre.venderCarro()));
    andre.mostrarCarro();
    saga.mostrarCarro();


    return 0;
}