/*
    Arquivo: Playlist.h
    Objetivo: Ser onde são armazenadas as musicas e podcast
*/

#ifndef PLAYLIST_H_INCLUDED
#define PLAYLIST_H_INCLUDED

#include "FaixaDeAudio.h"
#include <iostream>
#include <memory>
#include <vector>
#include <string>
#include <utility>

class Playlist{

    private:
        std::string nome;
        std::vector<std::unique_ptr<FaixaDeAudio>> faixas;

    public:
        Playlist(const std::string& n);
        void adicionarFaixas(std::unique_ptr<FaixaDeAudio> faixa);
        void tocarTodas() const;
};

Playlist::Playlist(const std::string& n) : nome(n){}

// Metodo adicionar faixas
void Playlist::adicionarFaixas(std::unique_ptr<FaixaDeAudio> faixa){
    faixas.push_back(std::move(faixa));
}

// Metodo tocar todas
void Playlist::tocarTodas() const{
    for(const auto& i : faixas){
        i->tocar();
        std::cout << "\n";
    }
}


#endif