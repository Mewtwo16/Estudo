#include <stdio.h>

// Função select sort
void select_sort(int vetor[], int tam){
    int menor = 0; // O(1);
    int troca = 0; // O(1);

    for(int i = 0; i < (tam - 1); i++){ // O(n)
        menor = i;
        for(int j = (i + 1); j < tam; j++ ){ // O(n)
            if(vetor[j] < vetor[menor]){ // O(1);
                menor = j; // O(1);
            };
        };
        if(i != menor){ // O(1);
            troca = vetor[i]; // O(1);
            vetor[i] = vetor[menor]; // O(1);
            vetor[menor] = troca; // O(1);
        }
    }
} // Este algoritimo tem um custo f(n) = n2 + 8, tendo complexidade:  O(n2) quadradico

void insert_sort(int vetor[], int tam){
    int troca = 0; // O(1)

    for(int i = 1; i < tam; i++){ // O(n)
        int proximo = i; // O(1)
        while((proximo !=0 ) && (vetor[proximo] < vetor[proximo - 1])){ // O(n) no pior caso ou O(1) no melhor caso
            troca = vetor[proximo]; // O(1)
            vetor[proximo] = vetor[proximo - 1]; // O(1)
            vetor[proximo - 1] = troca; // O(1)
            proximo--; // O(1)
        };
    };
} // Outro algoritimo com custo f(n) = n * n + 6 tendo complexidade: O(n) no melhor caso O(n2) quadradico no pior caso

void bubble_sort(int vetor[], int tam){
    int troca = 0; // O(1)
    int proximo = 0; // O(1)

    for(int i = 0; i < tam; i++){ // O(n)
        for(int j = 0; j < (tam -1); j++){ // O(n)
            if(vetor[j] > vetor[j+1]){ // O(1)
                proximo = vetor[j]; // O(1)
                vetor[j] = vetor[j+1]; // O(1)
                vetor[j+1] = proximo; // O(1)
            }
        }
    }
} // Complexidade O(n2) ou O(n) em um algoritimo com verificador de troca

void shell_sort(int vetor[], int tam){
    int grupo = 1; // O(1)

    while(grupo < tam){ // O(1)
        grupo = 3 * grupo + 1; // O(1)
    }

    while (grupo > 1){ // O(n)
        grupo /= 3; // O(1)
        for(int i = grupo; i < tam; i++){ // O(n)
            int troca = vetor[i]; // O(1)
            int j = i - grupo; // O(1)
            while(j >= 0 && troca < vetor[j]){ // O(n) ou O(1)
                vetor[j + grupo] = vetor[j]; // O(1)
                j -= grupo; // O(1)
            }
            vetor[j + grupo] = troca; // O(1)
        }
    }
} // Complexidade O(n2)

void quick_sort(int vetor[], int tam){
    int i, j, grupo, troca;

    if(tam < 2){
        return;
    } else{
        grupo = vetor[tam / 2];
    }

    for(i = 0, j = tam - 1;; i++, j--){
        while(vetor[i] < grupo){
            i++;
        }
        while(grupo < vetor[j]){
            j--;
        }

        if(i >= j){
            break;
        } else{
            troca = vetor[i];
            vetor[i] = vetor[j];
            vetor[j] = troca;
        }
    }
    quick_sort(vetor, i);
    quick_sort(vetor + i, tam - i);
}

int main(){

    int vetor[10];
    int num = 0;
    int opcao = 0;

    printf("\n\nInforme 10 numeros de forma aleatoria: \n");
        for(int i = 0; i < 10; i++){
            printf("\ninforme o %d: ", (i + 1));
            scanf("%d", &num);
            vetor[i] = num;
        }
        printf("\nImprimindo o vetor: \n");
        for(int i = 0; i < 10; i++){
            printf("-");
            printf("%d", vetor[i]);
            printf("-");
        }
    
    do{

        printf("Escolha como deseja ordenar o vetor: \n\n");
        // Este metodo compara todos os itens do array para encontrar o menor e mover para o primeiro index
        // Repetindo suscetivamente o processo, colocando o segundo menor para o segundo index até ordenar todo o vetor
        printf("[1] Select sort\n");
        // Percorre o vetor da esquerda para a direita verificando se o valor é menor que o anterior até alinhar todo o vetor
        printf("[2] insert sort\n");
        // Percorre todo o vetor varias vezes movando o maior item sempre para o final
        printf("[3] bubble sort\n");
        // Separa em grupos menores e compara se há trocas
        printf("[4] shell sort\n");
        // Dividir para conquistar
        printf("[5] quicksort\n");
        scanf("%d", &opcao);

        switch (opcao)
        {
        case 1:
            select_sort(vetor, 10);
            printf("Imprimindo vetor ordenado: \n");
            for(int i = 0; i < 10; i++){
                printf("-");
                printf("%d", vetor[i]);
                printf("-");
            }
            break;
        case 2: 
            insert_sort(vetor, 10);
            printf("Imprimindo vetor ordenado: \n");
            for(int i = 0; i < 10; i++){
                printf("-");
                printf("%d", vetor[i]);
                printf("-");
            }
            break;
        case 3: 
            bubble_sort(vetor, 10);
            printf("Imprimindo vetor ordenado: \n");
            for(int i = 0; i < 10; i++){
                printf("-");
                printf("%d", vetor[i]);
                printf("-");
            }
            break;
        case 4: 
            shell_sort(vetor, 10);
            printf("Imprimindo vetor ordenado: \n");
            for(int i = 0; i < 10; i++){
                printf("-");
                printf("%d", vetor[i]);
                printf("-");
            }
            break;
        case 5:
            quick_sort(vetor, 10);
            printf("Imprimindo vetor ordenado: \n");
            for(int i = 0; i < 10; i++){
                printf("-");
                printf("%d", vetor[i]);
                printf("-");
            }
            break;
        case 9: 
            printf("\nSaindo do programa...\n");
            break;
        default:
            printf("\nOpção invalida!");
            break;
        }
    }while(opcao != 9);

    return 0;
}