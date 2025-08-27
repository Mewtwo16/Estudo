/*
    Objetivo: rodar a simulação do projeto com as classes Hospital e Paciente
*/

#include <iostream>
#include <vector>
#include <memory>    
#include <utility>   
#include "Paciente.h"
#include "Hospital.h"

int main(){

    std::vector<std::unique_ptr<Paciente>> listaDeDonos;

    auto p1 = std::make_unique<Paciente>("Andre", "Dor de cabeca");
    auto p2 = std::make_unique<Paciente>("Saga", "Febre");
    auto p3 = std::make_unique<Paciente>("Gemini", "Codigo nao compila");

    listaDeDonos.push_back(std::move(p1));
    listaDeDonos.push_back(std::move(p2));
    listaDeDonos.push_back(std::move(p3));

    Hospital santaCasa;

    std::cout << "\n--- Pacientes chegando na recepcao do hospital ---\n";

    for (const auto& pacientePtr : listaDeDonos){
        santaCasa.adicionaPaciente(pacientePtr.get());
    }
    santaCasa.atendePaciente(); 
    santaCasa.atendePaciente();

}