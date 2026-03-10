

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
    int *arr;
    sDiv->total = 0;
    tempDivs = (int*)calloc(sDiv->size, sizeof(int));

    printf("Iniciada a funcao\n");

    while((divisor * divisor) <= sDiv->dividendo){
        if((sDiv->dividendo % divisor) == 0){
            if(controle +1 >= sDiv->size){
                sDiv->size = controle * 2;
                arr = (int*)realloc(tempDivs, sDiv->size * sizeof(int));
                if(arr == NULL){
                    printf("[Fatal-error] Não foi possivel fazer a realocação");
                    free(tempDivs);
                    return;
                };
                tempDivs = arr;
            }
            tempDivs[controle] = divisor;
            if((sDiv->dividendo / divisor) != divisor) {
                tempDivs[controle + 1] = sDiv->dividendo / divisor;
                controle+= 2;
                sDiv->total+=2;
            }else {
                controle+=1;
                sDiv->total+=1;
            }

        }   

        divisor++;
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
