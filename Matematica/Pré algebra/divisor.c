

#include <stdlib.h>
#include <stdio.h>
#include "divisor.h"

void TodosDivisores(divisor* sDiv){

    if(sDiv->dividendo <= 0){
        return;
    }

    sDiv->size = 2;
    int controle = 0;
    int divisor = 1;
    int *tempDivs;
    sDiv->total = 0;
    tempDivs = (int*)calloc(sDiv->size, sizeof(int));

    printf("Iniciada a funcao\n");

    while((divisor * divisor) < sDiv->dividendo){
        int *arr;
        if(controle == sDiv->size){
            sDiv->size = controle + controle;
            arr = (int*)realloc(tempDivs, sDiv->size * sizeof(int));
            if(arr == NULL){
                printf("[Fatal-error] Não foi possivel fazer a realocação");
                free(tempDivs);
                return;
            };
            tempDivs = arr;
        }
        if((sDiv->dividendo % divisor) == 0){
            tempDivs[controle] = divisor;
            tempDivs[controle + 1] = sDiv->dividendo / divisor;
            controle+= 2;
            sDiv->total+=2;
        }   

        divisor++;
    }

    sDiv->divisores = (int*)calloc(sDiv->size, sizeof(int));
    if(sDiv->divisores == NULL){
        printf("[Fatal-Error] Memoria insuficiente!");
        return;
    }

    sDiv->divisores = tempDivs;


    /*
    while(controle < sDiv->size){    
        if((sDiv->dividendo % divisor) == 0){
            sDiv->divisores[controle] = divisor;
            controle++;  
            sDiv->total++;
        };
        if(divisor >= sDiv->dividendo){
            return;
        }
        divisor++;
    }

    */
}
