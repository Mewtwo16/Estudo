/*
    objetivo: sobrecarga de funções e omissão de argumentos e argumentos padrões
*/

#include <iostream>
#include <string>
#include <vector>

// prototipa ambas as funçoes de mesmo nome
void soma(int n1, int n2);
void soma();

// Exemplo de omissão de argumento
// Coloco um valor padrão
void imp(std::string txt="André");


int main(){

    soma(20,30);
    soma();

    //Função com argumento omitido
    imp(); 
    // Se eu colocar um valor na função imprime o valor da chamada da funções
    imp("Ricardo");

    return 0;
}

// duas funçoes com o mesmo nome e parametros diferentes
// representação da sobre carga de funções
void soma(int n1, int n2){
    int re;
    re = n1 + n2;
    std::cout << "Soma de n1 e n2 = " << re << "\n";
}
void soma(){
    int n1{}; int n2{}; int re{};
    n1 = 10;
    n2 = 20;
    re = n1 + n2;
    std::cout << "Soma de n1 e n2 = " << re << "\n";
}


void imp(std::string txt){
    std::cout << "\n" << txt << "\n";
}
