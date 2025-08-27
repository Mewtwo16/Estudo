#ifndef FUNCIONARIO_H_INCLUDED
#define FUNCIONARIO_H_INCLUDED

#include <string>
#include <iostream>

class Funcionario{

    public:
        std::string nome;
        Funcionario(const std::string& n);
        ~Funcionario();


};

Funcionario::Funcionario(const std::string& n) : nome(n){
    std::cout << "\nContratando " << nome << "\n";
    
}
Funcionario::~Funcionario(){
    std::cout << "\n" << nome << " Deixando a empresa\n";
}

#endif