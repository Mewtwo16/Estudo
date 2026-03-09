

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "divisor.h"

int main(){

    divisor div;

    printf("Qual numero deseja saber os divisores?");
    scanf("%d", &div.dividendo);
 
    TodosDivisores(&div);

    printf("\nNo total foram encontrados %d para o numero %d\n", div.total, div.dividendo);
    printf("Todos os divisores de %d: \n", div.dividendo);
    for(int i = 0; i < div.size; i++){
        if(div.divisores[i] == 0){
            break;
        }
        printf("%d", div.divisores[i]);
        printf(" ");
    };

    free(div.divisores);
    return 0;
}