/*
    Conceitos: malloc, Ponteiros, Aritmética de Vetores, Passagem por Referência (ou retorno de ponteiro).

    Missão: Escreva um programa que:

    Pergunte ao usuário o tamanho do Vetor A (tamA) e do Vetor B (tamB).

    Aloque memória dinamicamente para os dois vetores.

    Peça para o usuário preencher os valores de A e de B.

    Implemente e chame uma função com a seguinte assinatura (ou similar): int* intercalar(int *v1, int tam1, int *v2, int tam2)

    Dentro da função:

    Aloque dinamicamente um terceiro vetor (Vetor C) que terá o tamanho da soma dos dois (tam1 + tam2).

    Preencha este vetor intercalando os valores (A[0], B[0], A[1], B[1]...).

    Regra de Sobra: Se um vetor acabar antes do outro, apenas copie o restante do vetor maior para o final do Vetor C.

    No Main:

    Receba o ponteiro retornado.

    Imprima o vetor resultante.

    Libere toda a memória alocada (A, B e C).

    Exemplo de Lógica:

    Vetor A (tam 3): [10, 20, 30]

    Vetor B (tam 5): [1, 2, 3, 4, 5]

    Resultado C: [10, 1, 20, 2, 30, 3, 4, 5]


*/

#include <stdlib.h>
#include <stdio.h>

int* intercalar(int *v1, int *v2,int tam1, int tam2);

int main(){

    int tam1, tam2, *v1, *v2, *v3; // O(1)

    printf("\nQual o tamanho do vetor 1: "); // O(1) 
    scanf("%d", &tam1); // O(1)
    printf("\nQual o tamanho do vetor 2: "); // O(1)
    scanf("%d", &tam2); // O(1)

    v1 = (int*)malloc(tam1 * sizeof(int)); // O(n)
    v2 = (int*)malloc(tam2 * sizeof(int)); // O(n)

    if(v1 == NULL){ // O(1)
        printf("Erro ao alocar memoria no vetor 1"); // O(1)
        return 1; // O(1)
    }
    if(v2 == NULL){ // O(1)
        printf("Erro ao alocar memoria no vetor 2"); // O(1)
        return 1; // O(1) 
    }

    printf("\nDigite caracteres para o vetor 1: "); // O(1) 
    for(int i = 0; i < tam1; i++){ // O(n)
        printf("\n%d:", i + 1); // O(1)
        scanf("%d", &v1[i]); // O(1) 
    };
    printf("Imprimindo vetor 1: \n");
    for(int i = 0; i < tam1; i++){ // O(n)
        printf("Na posição [%d] está o valor: %d\n", i ,v1[i]); // O(1)
    }
    printf("\nDigite caracteres para o vetor 2: ");
    for(int i = 0; i < tam2; i++){ // O(n)
        printf("\n%d:", i + 1); // O(1)
        scanf("%d", &v2[i]); // O(1)
    };
    printf("Imprimindo vetor 2: \n");
    for(int i = 0; i < tam2; i++){ // O(n)
        printf("Na posição [%d] está o valor: %d\n", i ,v2[i]); // O(1)
    }

    printf("\n\nintercalando!\n\n"); // O(1)

    // Complexidade da função é o calculo do algoritimo interno
    v3 = intercalar(v1, v2, tam1, tam2); // Será = O(n)


    printf("Imprimindo: \n"); // O(1)
    for(int i = 0; i < tam1 + tam2; i++){ // O(n)
        printf("Na posição [%d] está o valor: %d\n", i ,v3[i]); // O(1)
    };



   
    // tudo a baixo complexidade = O(1)
    free(v1);
    free(v2);
    free(v3);
    v1 = NULL;
    v2 = NULL;
    v3 = NULL;

    return 0;
};


int* intercalar(int *v1, int *v2,int tam1, int tam2){

    int tam3 = tam1 + tam2; // declaração de variavel = O(1)
    printf("tam3 = %d \n", tam3); // O(1)

    // Alocação de memoria é mais complexo mas provavelmente vai ter uma complexidade = O(n)
    int *vetor3 = (int*)malloc(tam3 * sizeof(int));
    if(vetor3 == NULL){ // comparação = O(1)
        printf("Erro ao alocar memoria"); // O(1)
    };
    // declaração de variavel = O(1)
    int i = 0;
    int j = 0;
    int h = 0;

    // Loop de repetição simples = O(n)
    while(i < tam3){
        printf("Entrou no while\n"); // O(1)

        if(j < tam1){ // comparação = O(1)
            printf("Entrou no if v1\n"); // (1)
            vetor3[i] = v1[j]; // O(1)
            i++; // O(1)
            j++; 
        }
        if(h < tam2){ // comparação = O(1)
            printf("Entrou no if v2\n"); // O(1)
            vetor3[i] = v2[h]; // O(1)
            i++; // O(1)
            h++; // O(1)
        }
        
    };

    printf("Retornou o ponteiro\n"); // O(1) 
    return vetor3; // O(1)

};