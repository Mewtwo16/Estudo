/*
    Malloc - para declaração dinamica de memoria
*/

#include <stdio.h>
#include <stdlib.h>

int main(){

    int n = 9; // Declaração estatica de valores
    int ns[3]; // Ocupa o valor estatico de 3 ints 
    ns[0] = 55;
    ns[1] = 43;
    ns[2] = 2;



    // Valor em memoria ocupado por cada varaivel
    printf("A variavel n vale %d e ocupa %ld bytes em memoria\n", n, sizeof(n));
    printf("A variavel ns[0] vale %d e ocupa %ld bytes em memoria\n", ns[0], sizeof(ns[0]));
    printf("A variavel ns[1] vale %d e ocupa %ld bytes em memoria\n", ns[1], sizeof(ns[1]));
    printf("A variavel ns[2] vale %d e ocupa %ld bytes em memoria\n", ns[2], sizeof(ns[2]));
    printf("O Array ns ocupa %ld bytes em memoria\n", sizeof(ns));

    // Alocação dinamica

    int qtd, *p;
    
    printf("\nInforme a quantidade de elementos para o vetor: ");
    scanf("%d", &qtd);

    p = (int*)malloc(qtd * sizeof(int));

    // Sempre validar se o programa conseguiu pegar toda a memoria necessaria ou ele ira crashar
    if (p == NULL) {
        printf("Erro fatal: Falha ao alocar memória.\n");
        return 1;
    }

    for(int i = 0; i < qtd; i++){
        printf("\nInforme o valor para posição %d do vetor: ", i);
        scanf("%d", &p[i]);
    };

    for(int i = 0; i < qtd; i++){
        printf("No vetor qtd[%d] está o valor %d \n", i, p[i]);
    };

    printf("A variável qtd ocupa %ld bytes e, memória.\n", qtd * sizeof(int));

    free(p); // Libera a memoria evita memory leaks
    p = NULL; // Medida de seguraça que anula o ponteiro 
    
    return 0;
}