/*
    Objetivo: Arquivo Main, o principal do sistema vai rodar em loop
*/

#include "Musica.h"
#include "Podcast.h"
#include "Playlist.h"
#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <utility>

int main(){

    auto minhasMusicas = std::make_unique<Playlist>("Minhas Musicas");


    // Criando as musicas e Podcasts
    auto m1 = std::make_unique<Musica>("Abyss", "The Weeknd");
    auto m2 = std::make_unique<Musica>("Judas", "Lady Gaga");
    auto m3 = std::make_unique<Musica>("Paint, it black", "The Rolling Stones");

    auto p1 = std::make_unique<Podcast>("01-BURRO", "PODPAH");
    auto p2 = std::make_unique<Podcast>("02-NOIA", "PODPAH");
    auto p3 = std::make_unique<Podcast>("03-MULA", "PODPAH");

    minhasMusicas->adicionarFaixas(std::move(m1));
    minhasMusicas->adicionarFaixas(std::move(p1));

    minhasMusicas->tocarTodas();

    return 0;
}