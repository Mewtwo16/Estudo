#ifndef HOSPITAL_H_INCLUDED
#define HOSPITAL_H_INCLUDED

#include "Paciente.h"
#include <queue>
#include <iostream>
#include <string>

class Hospital
{
    private:
        std::queue<Paciente*> fila;
    public:
        void adicionaPaciente(Paciente* p);
        void atendePaciente();
};

void Hospital::adicionaPaciente(Paciente* p){
    fila.push(p);
}

void Hospital::atendePaciente(){
    if(fila.empty()){
        std::cout << "\nA fila de atendimento está vazia!" << std::endl;
    }else{
        std::cout << "Chamando proximo paciente" << std::endl;
        // 1. Pega o ponteiro do paciente que está na frente da fila.
        Paciente* proximo = fila.front();
        // 2. Usa o ponteiro para chamar o método do paciente.
        proximo->imprimeFicha();
        // 3. Remove o paciente da fila, pois ele já foi atendido.
        fila.pop();
    }
}



#endif