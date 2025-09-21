#ifndef PACIENTE_H_INCLUDED
#define PACIENTE_H_INCLUDED

#include <string>
#include <vector>
#include <iostream>
#include <algorithm>

class Paciente{

    private:
        std::string nome;
        std::string sintoma;
        std::vector<std::string> observacao;
    public:
        Paciente(const std::string& n, const std::string s);
        void imprimeFicha() const;
        void adicionaOb(const std::string& ob);
};

Paciente::Paciente(const std::string& n, const std::string s) : nome(n), sintoma(s){}

void Paciente::adicionaOb(const std::string& ob){
    observacao.push_back(ob);
}

void Paciente::imprimeFicha() const{
    std::cout << "\n---------- Ficha do Paciente ----------\n";
    std::cout << "Nome: " << nome << std::endl;
    std::cout << "Sintoma: " << sintoma << std::endl;
    std::cout << "Comentarios: " << std::endl;
    if(observacao.empty()){
        std::cout << "Não há observações registradas" << std::endl;
    }else{
        for(const auto& i : observacao){
            std::cout << i << std::endl;
        }
    }
    std::cout << "\n---------- Fim da Ficha ----------\n";
}


#endif