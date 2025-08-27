/*
    objetivo: estudo de shared_ptr
*/

#include <iostream>
#include <vector>
#include <memory>
#include <string>
#include "Funcionario.h"
#include "Projeto.h"

int main(int argc, char* argv[]){

    auto ana = std::make_shared<Funcionario>("Ana");
    auto beto = std::make_shared<Funcionario>("Beto");
    auto carla = std::make_shared<Funcionario>("Carla");

    auto alpha = std::make_shared<Projeto>("Projeto Alpha");
    auto beta = std::make_shared<Projeto>("Projeto Beta");

    alpha->adicionaFuncionario(ana);
    alpha->adicionaFuncionario(beto);

    beta->adicionaFuncionario(carla);
    beta->adicionaFuncionario(beto);

    alpha->mostraEquipe();
    beta->mostraEquipe();


}