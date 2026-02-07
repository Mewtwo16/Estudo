

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "funcionario.h"

FILE* createDB(){

    FILE *f = fopen("funcionario.bin", "wb");

    if(f == NULL){
        return NULL;
    };

    return f;
}

void closeDB(FILE *db){
    if(db != NULL){
        fclose(db);
    }
}