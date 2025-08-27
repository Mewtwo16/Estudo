/*
    Objetivo: Estudo de pilhas/stacks
    trabalha com o principio, primeiro elemento a entrar é o ultimo a sair
    basicamente ele empilha os elementos
*/

#include <iostream>
#include <string>
#include <vector>
#include <thread>
#include <chrono>
// Bibliteca para utilizar stack
#include <stack>
// Estrutura para usar std::this_thread::sleep_for(std::chrono::milliseconds(500));

int main(int argc, char* argv[]){


    std::stack<std::string> cartas;

    // Metodo .empty() se a pilha estiver vazia ele retorna verdadeiro
    // pode utilizar o .size() ficando if(cartas.empty() == 0)
    if(cartas.empty()){
        std::cout << "Pilha vazia!\n\n";
    } else{
        std::cout << "Pilha com cartas\n\n"
    }
    std::this_thread::sleep_for(std::chrono::milliseconds(200));

    // metodo .push() para incluir itens a pilha
    cartas.push("Rei de Copas");
    cartas.push("Rei de Espadas");
    cartas.push("Rei de Ouros");
    cartas.push("Rei de Paus");
    // Metodo .size() retorna o numero de itens na pilha
    std::cout << "Tamanho da pilha: " << cartas.size() << "\n";
    std::this_thread::sleep_for(std::chrono::milliseconds(200));
    // Metodo .top() retorna o elemento que está no topo
    std::cout << "Carta no topo " << cartas.top() << "\n";
    std::this_thread::sleep_for(std::chrono::milliseconds(200));

    // Metoto .pop() faz a retirada do ultimo elemento adicionado
    cartas.pop();
    std::cout << "Tamanho da pilha: " << cartas.size() << "\n";
    std::cout << "Nova carta no top " << cartas.top() << "\n";
    std::this_thread::sleep_for(std::chrono::milliseconds(200));

    // Enquanto cartas não for vazio
    // Combinação de metodos para zerar as pilhas
    while(!cartas.empty()){
        cartas.pop()
    }

    return 0;
}
