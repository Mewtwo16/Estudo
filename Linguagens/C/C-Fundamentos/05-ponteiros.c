/*
    Arquivo: 05-ponteiros.c
    Tema: Ponteiros em C (Pointers)
    
    Descrição:
    Este arquivo demonstra o uso básico de ponteiros em C.
    Ponteiros são variáveis que armazenam endereços de memória de outras variáveis.
    
    Conceitos Chave:
    & (Operador de Endereço): Retorna o endereço de memória de uma variável.
                              Ex: &vidas -> pega o endereço onde 'vidas' está guardada.
                              
    * (Operador de Desreferência/Indireção): Acessa o valor armazenado no endereço 
                                             para o qual o ponteiro aponta.
                              Ex: int *ptr; -> Declara um ponteiro para um inteiro.
                                  *ptr = 10; -> Altera o valor no endereço apontado por ptr.
                                  
    Passagem por Referência: Permite que uma função modifique o valor de uma variável
                             original, passando seu endereço em vez de uma cópia do valor.
*/

#include <stdio.h>

#define maxLifes 10

void addVidas(int* vidas);

int main(){

    int vidas = 5;

    printf("Vidas atuais = %d \n", vidas);

    addVidas(&vidas);

    printf("Vidas atuais = %d \n", vidas);
    printf("\nEndereco de memoria de vidas = %d\n", &vidas);


    return 0;
};

void addVidas(int* vidas){
    if(*vidas == maxLifes){
        printf("\nnumero maximo de vidas atingido\n");
    } else{
        ++(*vidas);
    }
}
