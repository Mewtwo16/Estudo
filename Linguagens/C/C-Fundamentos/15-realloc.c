/*
    realloc - realoca a memoria
*/

#include <stdio.h>
#include <stdlib.h>

int main(){

    // Alocação dinamica

    int qtd, *p;
    
    printf("\nInforme a quantidade de elementos para o vetor: ");
    scanf("%d", &qtd);

    p = (int*)malloc(qtd * sizeof(int));

    if (p == NULL) {
        printf("Erro fatal: Falha ao alocar memória.\n");
        return 1;
    }

    printf("A variável qtd ocupa %ld bytes e, memória.\n", qtd * sizeof(int));

    // Realloc
    printf("\nInforme a quantidade de elementos para o vetor: ");
    scanf("%d", &qtd);

    p = (int*)realloc(p, qtd * sizeof(int)); 

    if (p == NULL) {
        printf("Erro fatal: Falha ao alocar memória.\n");
        return 1;
    }

    printf("A variável qtd ocupa %ld bytes e, memória.\n", qtd * sizeof(int));

    free(p); // Libera a memoria evita memory leaks
    p = NULL; // Medida de seguraça que anula o ponteiro 
    
    return 0;
}