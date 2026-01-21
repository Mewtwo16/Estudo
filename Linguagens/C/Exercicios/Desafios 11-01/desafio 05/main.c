#include <stdio.h>
#include <stdlib.h>
#include "buscaSaida.h"

int mapa[5][5] = {
        {1, 0, 1, 1, 1},
        {1, 0, 1, 0, 1},
        {1, 1, 1, 0, 1},
        {1, 0, 0, 0, 1},
        {1, 1, 1, 1, 9},
    };


int main(){

    printf("\n\nIniciando!\n\n");

    printf("Mapa atual: \n\n");

    desenhaMapa();

    printf("\n");

    printf("Vamos procurar a saida!\n");

    if(buscaSaida(0,0) == 1){
        printf("Sainda encontrada");
    } else{
        printf("Mapasem saida");
    }

    printf("Mapa Depois da busca: \n\n");

    desenhaMapa();
    


    return 0;
}