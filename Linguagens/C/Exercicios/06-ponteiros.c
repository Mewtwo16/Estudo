


#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){

    printf("\n\n\nExercicio 01:\n\n\n");
    /*
        1. Faça um programa que declare um inteiro, um real e um char, e ponteiros para inteiro, real e char. Associe
        as variáveis aos ponteiros (use &). Modifique os valores de cada variável usando os ponteiros. Imprima os
        valores das variáveis antes e após a modificação. 
    */


    int inteiro = 10;
    float real = 20.5;
    char texto[50] = "Andre";

    printf("%d\n", inteiro);
    printf("%f\n", real);
    printf("%s\n", texto);

    int* p_i = &inteiro;
    float* p_f = &real;
    char *p_texto = texto;

    *p_i = 50;
    *p_f = 99.9;

    strcpy(p_texto, "Ricardo");

    printf("Inteiro: %d\n", inteiro);
    printf("Real: %.2f\n", real);
    printf("Texto: %s\n", texto);


    printf("\n\n\nExercicio 02:\n\n\n");
    /*
        2. Faça um programa que contenha duas variáveis inteiras. Leia estas variáveis do teclado. Em seguida,
        compare seus endereços e exiba o conteúdo do maior endereço. 
    */

    int n1 = 0;
    int n2 = 0;

    printf("Informe o primeiro numero: \n");
    scanf("%d", &n1);
    printf("Informe o segundo numero: \n");
    scanf("%d", &n2);

    if(&n1 > &n2){
        printf("O endereço de n1(%d): %p -- é maior que o endereço de n2: %p", n1 ,&n1, &n2);
    } else{
        printf("O endereco de n2(%d): %p -- é maior que o endereço de n1: %p", n2, &n2 , &n1);
    };


    printf("\n\n\nExercicio 03:\n\n\n");
    /*
        3. Faça um programa que contenha um array de inteiros contendo 5 elementos. Utilizando apenas aritmética
        de ponteiros, leia este array do teclado e imprima o dobro de cada valor lido.
    */

    int vetor[5];
    int *ptr = vetor; // Aponta para o inicio do vetor

    // LEITURA
    printf("Digite 5 numeros:\n");
    for(int i = 0; i < 5; i++){
        printf("Posicao %d: ", i);
        // Em vez de &vetor[i], usamos a aritmética: (ptr + i)
        // Isso calcula o endereço do índice i automaticamente
        scanf("%d", (ptr + i)); 
    }

    // IMPRESSÃO DO DOBRO
    printf("\nO dobro dos valores lidos:\n");
    for(int i = 0; i < 5; i++){
        // Em vez de vetor[i], usamos *(ptr + i) para acessar o VALOR
        int valor = *(ptr + i); 
        printf("Original: %d | Dobro: %d\n", valor, valor * 2);
    }


    return 0;
}