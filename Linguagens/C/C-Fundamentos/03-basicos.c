/*
    Arryas e Matrizes
    char é um array de caracteres
*/

#include <stdio.h>

int main(){

    // Declaração de arrays
    char nome[50];
    printf("Qual seu nome?\n");
    gets(nome);
    printf("Seu nome é %s\n", nome);

    int contador = 0;
    char letras[26];
    for(int i = 97; i <=122; i++){
        letras[contador] = i;
        contador = contador + 1;
    };

    for(int i = 0; i < 26; i++){
        printf("%d == %c\n", letras[i], letras[i]);
    };

    int numeros[10][10]; // matriz de numeros
    float valores[5];// De pontos flutuantes

    
    return 0;
}