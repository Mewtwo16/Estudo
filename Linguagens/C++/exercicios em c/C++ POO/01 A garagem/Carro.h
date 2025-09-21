#ifndef CARRO_H_INCLUDED
#define CARRO_H_INCLUDED

#include <string>
#include <iostream>

class Carro{

    public:
        std::string modelo;


    Carro(std::string m);


    ~Carro();
};

Carro::Carro(std::string m){
    modelo = m;
    std::cout << "Carro " << modelo << " criado";
};

Carro::~Carro(){
        std::cout << "\nCarro " << modelo << " destruido";
};



#endif