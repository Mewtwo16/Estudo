/*
    objetivo: Estudo de ponteiros
    Os ponteiros armazenam o endereço memoria de outras variaveis
    utilizamos os operadores: 
    & = "O endereço de" se voce colocar &nomeVariavel ele não vai imprimir o valor da varial e sim o endereço dememoria dela
    * = "O valor apontado por" você "segue o endereço" e pega o valor que está guardado naquele local da memória
*/

#include <iostream>
#include <string>
#include <vector>

void somar(float *var, float valor);

int main(){
    /*
    std::string veiculo = "carro";
    std::string *pv = nullptr;

    pv=&veiculo;

    std::cout << veiculo << " está alocado na memoria = " << &veiculo << "\n";

    *pv="moto"; // altera o valor da variavel que o ponteiro está direciando

    std::cout << veiculo << " está alocado na memoria = " << &veiculo << "\n";



    int *p = nullptr;
    std::vector<int> vetor = {1,2,3,4,5,6,7,8,9,10};
    
    p=&vetor[0];
    *p=10;
    std::cout << "\n" << vetor[0] << "\n"; 

    *(p+=1);
    *p=20;
    std::cout << "\n" << vetor[1] << "\n"; 

    *(p+=1);
    *p=30;
    std::cout << "\n" << vetor[2] << "\n"; 
    */

    float num = 0;
    

    somar(&num, 15);

    std::cout << num;
    




    return 0;
}


void somar(float *var, float valor){
        *var+=valor;
}