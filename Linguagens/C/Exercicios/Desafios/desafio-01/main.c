/*
    nivel 1
        Desafio: 

    NÍVEL 1: O Compressor de Strings (Lógica Pura)
    Conceitos: Manipulação de Strings, Loops, Lógica de Estado.

    Missão: Crie um programa que leia uma string do usuário (ex: "AAABBBCCCCDD") e imprima uma versão comprimida mostrando a contagem de cada caractere consecutivo.

    Entrada Exemplo: AAABBBCCCCDD Saída Esperada: 3A3B4C2D

    Regra Extra: Não use bibliotecas de string complexas para resolver a lógica. Faça "na mão" percorrendo o vetor.

*/

#include <stdlib.h>
#include <stdio.h>

int main(){

    //char texto[50];
    char texto[] = "aaabbb";
    int existe = 1;
    int contador = 0;

    printf("Digite seu texto de até 50 caracteres:\n");
    printf("---: ");
    //fgets(texto, 50, stdin);



    while(texto[contador] != '\0'){

        if(texto[contador] != texto[contador + 1] && texto[contador] != '\n'){
            printf("%d%c", existe, texto[contador]);
            existe = 0;
        };

        existe++;
        contador++;
    }


    return 0;
}