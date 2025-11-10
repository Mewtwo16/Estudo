// Classe que define parametros para tarefas

#ifndef TAREFA_H_INCLUDED
#define TAREFA_H_INCLUDED

#include <memory>
#include <iostream>
#include <string>
#include "Usuario.h" // recebe a herança da classe usuario

class Tarefa{

    public:
        std::string descricao;
        std::shared_ptr<Usuario> responsavel;
        // Metodo construtor
        Tarefa(const std::string& d, std::shared_ptr<Usuario> r);
};

Tarefa::Tarefa(const std::string& d, std::shared_ptr<Usuario> r) : descricao(d), responsavel(r) {
    std::cout << "Tarefa: " << descricao << " criada com suscesso!\n";
    // Para imprimir um ponteiro, eu tenho que apontar para oque eu quero imprimir dele
    std::cout << "Responsavel atual: " << responsavel->nome << std::endl;
}


#endif