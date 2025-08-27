/*
    Objetivo: Estudo de queues ou filas
    neste caso o primeiro a entrar é o primeiro que sai exatamente como um fila
*/

/*
    metodos: 
    .empty() retorna verdadeiro se fila vazia
    .size() retorna o tamanho da fila
    .front() retorna o primeiro na fila
    .back() retorna o ultimo da fila
    .push() adiciona a fila
    .pop() remove o primeiro da fila
*/

// biblioteca para utilização de filas
#include <queue>
#include <iostream>
#include <string>
#include <chrono>
#include <thread>

int main(){

    std::queue<std::string> impressora;

    std::cout << "Adicionando itens a impressora";
    impressora.push("Documento 1");
    impressora.push("Documento 2");
    impressora.push("Documento 3");

    while(!impressora.empty()){
        std::string status = impressora.front();

        std::cout << "Imprimindo " << status << "\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(1000));
        impressora.pop();
        std::cout << "Concluido";
    }

    std::cout << "\nTodos os trabalhos foram impressos.\n";

    return 0;
}