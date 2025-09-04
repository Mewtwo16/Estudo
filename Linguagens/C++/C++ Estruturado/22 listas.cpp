/*
    Objetivo: Estudo de listas
*/

//bibliote de listas



#include <list>
#include <iostream>
#include <string>
#include <chrono>
#include <thread>


int main(){

    // posso declaras listas
    // std::list<int> aula(5); lista com 5 posições
    // std::list<int> aula(5,50); lista com 5 posições que valem 50
    // std::list<int> aula, codigo, nome; // varias listas declaras

    std::list<int> aula;
    int tam = 10;
    std::list<int>::iterator it;

    for(int i = 0; i<tam; i++){
        aula.push_front(i);
    }

    it=aula.begin();
    advance(it,5);
    aula.insert(it,0);
    
    std::cout << "Tamanho da lista: " << tam << "\n";

    tam=aula.size();
    for(int i=0; i<tam; i++){
        std::cout << aula.front() << "\n";
        aula.pop_front();
    }


    return 0;
}