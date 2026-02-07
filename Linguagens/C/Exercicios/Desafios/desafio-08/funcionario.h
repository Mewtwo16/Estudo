

#ifndef FUNCIONARIO_H
#define FUNCIONARIO_H

#include <stdio.h>

typedef struct{
    int id;
    char nome[50];
    double salario;


} Funcionario;

FILE* createDB();

void closeDB(FILE *db);



#endif 