/*
    Objetivo: Estudo de argumentos do main
*/

#include <iostream>
#include <string.h>
#include <vector>
#include <stdlib.h>

// Tipos de argumento
// int argc (Argument Count - Contador de Argumentos) - é uma inteira que guarda a quantidade de parametros informados 
// char* argv[] (Argument Vector - Vetor de Argumentos) - é um parametro tipo char que é um ponteiro para uma matriz de ponteiros
// int main(in argc, char*argv[])

// O primeiro argumento é sempre o nome do programa
int main(int argc, char* argv[]){

    // sempre verificar a Quantidade de Argumentos
    /*
    if(argc > 5){
        std::cout << "Modo invalido(alta quantidade de parametros)";
        return 1;
    }
    */

    /* Exemplo:
    std::cout << argv[0] << "\n";
    std::cout << argv[1] << "\n";
    std::cout << argv[2] << "\n";
    std::cout << argv[3] << "\n";
    // saida de quantos parametros informados
    std::cout << argc << "\n";
    */

    if (argc > 1){
        // strcmp compara duas strings
        // se as strings forem iguais = 0
        if(!strcmp(argv[1], "sol")){
            std::cout << "Ir ao clube.\n\n";
        } else if(!strcmp(argv[1], "nublado")){
            std::cout << "Ir ao cinema.\n\n";
        } else{
            std::cout << "Ficar em casa. \n\n";
        }
    }

    system("pause");

    return 0;
}