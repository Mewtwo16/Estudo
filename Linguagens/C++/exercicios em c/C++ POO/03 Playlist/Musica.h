/*
    Arquivo: Musica.h
    Objetivo: Definir os parametros da classe musica
*/

#ifndef MUSICA_H_INCLUDED
#define MUSICA_H_INCLUDED

#include "FaixaDeAudio.h"
#include <iostream>
#include <string>

class Musica : public FaixaDeAudio {

    private:
        std::string artista;
    
    public:
        Musica(const std::string& t, const std::string& a);
        void tocar() const override;

};

// Metodo construtor
Musica::Musica(const std::string& t, const std::string& a) : FaixaDeAudio(t), artista(a){}

// Metodo tocar sobreescrito pela classe musica
void Musica::tocar() const{
    std::cout << "Tocando: " << titulo << "\nArtista - " << artista << std::endl;
}

#endif