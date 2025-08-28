/*
    Objetivo: Estudo de struct(inicia a ponte de programação estruturada para POO - programação orientada a objetiso)
*/

#include <iostream>
#include <string>
#include <vector>

// sintaxe do struct
struct carro{
    std::string nome;
    std::string cor;
    int pot{};
    int velMax{};
    int vel{};

    void insere(const std::string& stNome, const std::string& stCor, const int& stPot, const int& stVelMax){
        nome = stNome;
        cor = stCor;
        pot = stPot; 
        velMax = stVelMax;
        vel=0;
    }

    void mostra(){
        std::cout << "\nNome........... " << nome << "\n";
        std::cout << "Cor.............. " << cor << "\n";
        std::cout << "Potencia......... " << pot << "\n";
        std::cout << "Velocidade atual. " << vel << "\n";
        std::cout << "Velocidade maxima " << velMax << "\n";
    }

    void mudaVel(int mv){
        vel = mv;

        if(vel > velMax){
            vel = velMax;
        }
        if(vel < 0){
            vel=0;
        }

    }


};


int main(){

    // Declarando o struct

    std::vector<carro> carros(5);

    carros[0].insere("Tornado", "Vermelho", 450, 350);
    carros[1].insere("luxo", "Preto", 250, 260);
    carros[2].insere("familia", "prata", 150, 180);
    carros[3].insere("trabalho", "Branco", 80, 120);
    carros[4].insere("padrao", "Cinza", 100, 150);

    for(int i=0; i<5; i++){
        carros[i].mostra();

    }


    return 0;
}