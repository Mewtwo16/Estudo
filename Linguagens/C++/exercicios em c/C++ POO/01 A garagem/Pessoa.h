#ifndef PESSOA_H_INCLUDED
#define PESSOA_H_INCLUDED

#include <iostream>
#include <string>
#include <memory>
#include <utility> 
#include "Carro.h"

class Pessoa{

    private:
        std::unique_ptr<Carro> carro;

    public:
        std::string nome;
        // construtor
        Pessoa(std::string n);
        void mostrarCarro() const;
        void comprarCarro(std::unique_ptr<Carro> c);
        std::unique_ptr<Carro> venderCarro();
};

Pessoa::Pessoa(std::string n){
    nome = n;
};

void Pessoa::mostrarCarro() const{
    if(carro){
        std::cout << "O carro na posse de " << nome << " é o " << carro->modelo; 
    }else{
        std::cout << "\nA " << nome << " não tem um carro\n";
    }
}

void Pessoa::comprarCarro(std::unique_ptr<Carro> c){
    if(carro){
        std::cout << "\nA pessoa já tem um carro\n";
    }else{
        std::cout << "\nCarro comprado por " << nome << "\n";
        carro = std::move(c);
    };
};

std::unique_ptr<Carro> Pessoa::venderCarro(){
    return std::move(carro);
}


#endif


