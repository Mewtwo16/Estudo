

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "divisor.h"

int main(){

    int menu = 0;

    while(menu != 9) {
        printf("\n\n=======Calculadora=======\n\n");
        printf("Qual Operação deseja realizar: \n");
        printf("1. Divisor\n");
        printf("2. Multiplicadores\n");
        printf("9. Sair\n");
        printf("Escolhido: ");
        scanf("%d", &menu);

        switch(menu) {
            case 1: {

                divisor div = {0}; // Inicializa a estrutura com todos valores zerados

                printf("Iniciando calculo de divisores\n");
                printf("Qual numero deseja saber os divisores?");
                scanf("%d", &div.dividendo);

                TodosDivisores(&div);

                printf("\nNo total foram encontrados %d para o numero %d\n", div.total, div.dividendo);
                printf("Todos os divisores de %d: \n", div.dividendo);
                for(int i = 0; i < div.total; i++){
                    printf("%d", div.divisores[i]);
                    printf(" ");
                };

                free(div.divisores);
                break;
            }
            case 2: {
                printf("Iniciando calculo de multiplicadores\n");

                break;
            }
            case 9:{
                printf("Saindo do programa!\n");
                break;
            }

        }
    }



    return 0;
}