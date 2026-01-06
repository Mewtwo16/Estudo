

#include <stdio.h>

int main(){

    int n1;
    int n2;
    int n3;
    int resultado;
    int valida;

    printf("Digite 3 numeros para somar: \n");
    printf("Primeiro: ");
    scanf("%d", &n1);
    printf("Segundo: ");
    scanf("%d", &n2);
    printf("Terceiro: ");
    scanf("%d", &n3);

    resultado = n1 + n2 + n3;
    printf("O Resultado da soma é: %d \n", resultado);

    printf("Agora gostaria de ver o quadrado do resultado?\n");
    printf("1 - Sim\n2 - Não\nEscolha: ");
    scanf("%d", &valida);

    if(valida == 1){
        int quadrado = resultado * 2;
        printf("O quadrado é: %d\n", quadrado);
    } else{
        printf("Programa finalizado\n");
    };

    return 0;
};