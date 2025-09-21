/*
    Arquivo: Podcast.h
    Objetivo: Definição da classe objetivo e definição de seus atributos e metodos
*/
#ifndef PODCAST_H_INCLUDED
#define PODCAST_H_INCLUDED

#include "FaixaDeAudio.h"
#include <iostream>
#include <string.h>

//Classe Podcast define os parametros para podcasts
class Podcast : public FaixaDeAudio{

    private:
        std::string apresentador;
    public:
        Podcast(const std::string& t, const std::string& ap);
        void tocar() const override;
};

// Metodo construtor inicializado
Podcast::Podcast(const std::string& t, const std::string& ap) : FaixaDeAudio(t), apresentador(ap){}

// Metodo tocar personalizado para podcast
void Podcast::tocar() const{
    std::cout << "Tocando podcast: " << titulo << " \nApresentado por: " << apresentador << std::endl;
}


#endif