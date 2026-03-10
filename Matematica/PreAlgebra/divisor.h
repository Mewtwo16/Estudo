
#ifndef DIVISOR_H
#define DIVISOR_H

typedef struct{
    int dividendo;
    int size;
    int total;
    int *divisores;
} divisor;


void TodosDivisores(divisor* sDiv);

#endif