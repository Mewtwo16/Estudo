

#include <stdio.h>

int main(){

    int n1 = 0;
    int soma  = 0;

    // Estruturas de repetição
    //for
    for(int i = 0; i < 5; i++){
        printf("Informe um numero: \n");
        scanf("%d", &n1);

        soma = soma + n1;
    };
    printf("A soma é %d", soma);
    soma = 0;

    // While
    printf("Informe um numero: \n");
    scanf("%d", &n1);

    while(n1 != 0){
        soma = soma + n1;

        printf("Informe um numero: \n");
        scanf("%d", &n1);

    };
    printf("A soma é %d", soma);
    soma = 0;

    // Do While
    do{
        printf("Informe um numero: \n");
        scanf("%d", &n1);
        soma = soma + n1;
    }while(n1 != 0);
    printf("A soma é %d", soma);

    return 0;
}