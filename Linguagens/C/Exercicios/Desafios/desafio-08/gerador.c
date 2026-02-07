

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "funcionario.h"

void gerador(FILE *db, int n){

    Funcionario *f = malloc(sizeof(Funcionario));

    int min = 1000;
    int max = 100000;

    srand(time(NULL));

    for(int i = 0; i < n; i++){
        f->id = i+1;
        sprintf(f->nome, "Funcionario %d", i+1);
        f->salario = ((double)rand() / RAND_MAX) * (max - min) + min;
        fwrite(f, sizeof(Funcionario), 1, db);
    }
}