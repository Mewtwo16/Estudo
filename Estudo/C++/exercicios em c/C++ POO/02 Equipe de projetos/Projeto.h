#ifndef PROJETO_H_INCLUDED
#define PROJETO_H_INCLUDED

#include <memory>
#include <string>
#include <iostream>
#include <vector>
#include "Funcionario.h"

class Projeto{

    public:
        std::string nome_projeto;
        Projeto(const std::string& nome);
        void adicionaFuncionario(std::shared_ptr<Funcionario> f);
        void mostraEquipe() const;

    private:
        std::vector<std::shared_ptr<Funcionario>> equipe;
};

Projeto::Projeto(const std::string& nome) : nome_projeto(nome){
    std::cout << "\nProjeto " << nome_projeto << " criado\n";
}

void Projeto::adicionaFuncionario(std::shared_ptr<Funcionario> f){
    if(f){
        std::cout << "\nFuncionario " << f->nome << " entrando no projeto";
        equipe.push_back(f);
    }
}

void Projeto::mostraEquipe() const {
    std::cout << "\n--- Equipe do Projeto: " << nome_projeto << " ---\n";
    if (equipe.empty()) {
        std::cout << "A equipe esta vazia.\n";
    } else {
        for (const auto& funcionario : equipe) {
            if (funcionario) {
                std::cout << " - " << funcionario->nome << "\n";
            }
        }
    }
    std::cout << "-------------------------------------\n";
}




#endif