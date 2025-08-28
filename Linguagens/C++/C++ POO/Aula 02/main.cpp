/*
    objetivo: Estudo de getters e setters
*/

#include <iostream>
#include <string>
#include "classes.h"


int main(){

    Veiculo *v1= new Veiculo(1);
    Veiculo *v2= new Veiculo(2);
    Veiculo *v3= new Veiculo(3);

    v1->setLigado(1);
    v2->setLigado(2);
    v3->setLigado(3);

    std::cout << v1->getVelMax() << std::endl;
    std::cout << v2->getVelMax() << std::endl;
    std::cout << v3->getVelMax() << std::endl;

    if(v1->getLigado()){
        std::cout << "O veiculo 1 esta ligado!\n";
    }else{
        std::cout << "O veiculo 1 esta desligado!\n";
    };
    if(v2->getLigado()){
        std::cout << "O veiculo 2 esta ligado!\n";
    }else{
        std::cout << "O veiculo 2 esta desligado!\n";
    };
    if(v3->getLigado()){
        std::cout << "O veiculo 3 esta ligado!\n";
    }else{
        std::cout << "O veiculo 3 esta desligado!\n";
    };

    return 0;
}
