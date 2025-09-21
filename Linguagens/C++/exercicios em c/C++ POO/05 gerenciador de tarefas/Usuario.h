// Classe que define parametros para usuario

#ifndef USUARIO_H_INCLUDED
#define USUARIO_H_INCLUDED

#include <string>
#include <iostream>

class Usuario{

    public:
        // Metodo construtor
        std::string nome;
        Usuario(const std::string& n);
};

// Implementaçãod o metodo construtor
Usuario::Usuario(const std::string& n) : nome(n){
    std::cout << "\nUsuario: " << nome << "\nLogado com suscesso!";
}

#endif