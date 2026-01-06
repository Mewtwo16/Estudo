

#include <stdio.h>

// Enum - enumeração

enum dias_da_semana{
    domingo,
    segunda,
    terca,
    quarta,
    quinta,
    sexta,
    sabado
};

int main(){


    enum dias_da_semana d1, d2;

    d1 = quinta;

    d2 = 4;

    if(d1 == d2){
        printf("Os dias são iguais\n");
    } else{
        printf("os dias não são iguais\n");
    }

    return 0;
}