/*
    calloc
*/

#include <stdio.h>
#include <stdlib.h>

int main(){

    // Alocação dinamica

    int qtd, *p;
    
    printf("\nInforme a quantidade de elementos para o vetor: ");
    scanf("%d", &qtd);

    // Preenche toda a memoria com zeros na alocação(demora mais, porem é oferece uma segurança maior)
    p = (int*)calloc(qtd, sizeof(int)); // Difere em pouca coisa a declaração para o malloc

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