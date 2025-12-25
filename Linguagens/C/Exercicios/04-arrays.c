

#include <stdio.h>

<<<<<<< Updated upstream
int main(){

    int A[] = {1, 0, 5, -2, -5, 7}; // Atribuição, complexidade  O(1)

    int soma = A[0] + A[1] + A[5];

    A[4] = 100;

    for(int i = 0; i <= 5; i++){
        printf("%d", A[i]);
        printf("\n");
    }

    int vetor[] = {8, 23, 41, 57, 12, 89, 34, 76, 5, 62};

    int impar = 0, par = 0;

    for(int i = 0; i < 10; i++){
        if(vetor[i] % 2){
            printf("%d é um numero impar\n", vetor[i]);
            impar++;
        } else{
            printf("%d é um numero par\n", vetor[i]);
            par++;
        };
    };

    printf("\n\nNo total %d Foram par e %d Foram impar\n\n", par, impar);

    int vetor2[] = {-9, 4, -2, 10, -7, 0, 3, -1, 8, -5};

    for(int i = 0; i < 10; i++){
        if(vetor2[i] < 0){            
            printf("\n%d é um numero negativo, trocando por 0", vetor2[i]);
            vetor2[i] = 0;
        } else {
            printf("\n%d é um numero positivo!" ,vetor2[i]);
        };
    };

    return 0;
=======
int main(void){

    int A[] = {1, 0, 5, -2, -5, 7};
    

    int soma = A[0] + A[1] + A[5];
    printf(" %d ", soma);





>>>>>>> Stashed changes
}