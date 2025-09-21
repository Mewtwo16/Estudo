/*
    Objetivo: Estudo de funções
*/

#include <iostream>
#include <string>
#include <vector>

// Antes de executar uma função eu devo prototipar a função antes do main
void texto();
void soma(int n1, int n2);
int soma2(int n1, int n2);
void tr(std::vector<std::string> tra);


// Já é uma função, uma função que retorna 0
// As funções pode ser feita antes ou apos o programa principal
int main(){

    int res;
    std::vector<std::string> transp = {"carro", "Moto", "Barco", "aviao"};

    for(int i=0; i < 3; i++){
        texto();
    }
    
    soma(15,5);
    res=soma2(175,25);

    std::cout << "Valor de res: " << res << "\n";

    tr(transp);

    // outro exemplo de uso
    //std::cout << "Valor de res: " << soma2(175,25) << "\n";

    return 0;
}

// sintaxe da função:
// void não retorna nenhum valor, apos o nome e dentro dos() entra os argumentso
void texto() {
    std::cout << "Iniciando\n";
}

void soma(int n1, int n2){
    std::cout << "soma dos valores: " << n1 + n2 << "\n";
}

// Função que retorna um inteiro
int soma2(int n1, int n2){
    // funções que retornam valores devem usar return
    return n1+n2;
}

// utilizar o const pois a funcão não modifica o valor original
// utilizar o & para ao inves de copiar para tra utilizar como referencia a variavel original
void tr(const std::vector<std::string>& tra){
    for(const auto& item : tra){
        std::cout << item << "\n";
    }
}
