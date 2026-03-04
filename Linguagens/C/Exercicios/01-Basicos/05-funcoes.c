

#include <stdio.h>


void maior(int vetor[]);
void imprime(int v);

int main(){

    imprime(5);

    int vetor[10];

    printf("\n\nDigite 10 numeros: \n");
    for(int i = 0; i < 10; i++){
        printf("\nDigite o %d numero: ", i+1);
        scanf("%d", &vetor[i]);
        printf("\n %d adicionado ao vetor", vetor[i]);
    };

    maior(vetor);

    return 0;
}

void maior(int vetor[]){

    int maior = 0;

    for(int i = 0; i < 10; i++){
        if(maior < vetor[i]){
            maior = vetor[i];
        }
    }

    printf("\n\nO Maior numero do vetor é: %d \n", maior);

};

void imprime(int v){

    int contador = 0;

    while(contador < v){
        if(contador != v){
            contador++;
            for(int i = 0; i < contador; i++){
                printf("!");
            };
            printf("\n");
        };
    
    };
    
};