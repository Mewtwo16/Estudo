/*
    Diretivas de compilação
*/

#include <stdio.h>

//ifndef - diretiva de compilação
#ifndef PI // Se não foi definido(constante), defina ela
    #define PI 3.14567 //Constante
#endif // Fim do SE(if)

int main(){

    #ifdef PI // Se está definido, faça:
        printf("PI vale %f\n", PI);
    #endif

    return 0;
}