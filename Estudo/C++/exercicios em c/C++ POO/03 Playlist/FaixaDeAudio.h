/*
    Arquivo: FaixaDeAudio.h
    O objetivo desta classe é ser abstrata e servir de base para as classes musica e podcast
*/

#ifndef FAIXADEAUDIO_H_INCLUDED
#define FAIXADEAUDIO_H_INCLUDED

#include <string>
#include <iostream>

class FaixaDeAudio{

    protected:
        std::string titulo;
    public:
        // Construtor
        FaixaDeAudio(const std::string& t) : titulo(t){};
        // Metodo virtual puro (torna a classe em abstrata)
        virtual void tocar() const = 0;
        // Destrutor
        virtual ~FaixaDeAudio(){};
};

#endif