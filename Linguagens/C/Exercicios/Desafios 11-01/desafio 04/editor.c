#include <stdio.h>
#include <stdlib.h>
#include "editor.h"

void editor(int indice, int valor){


    FILE *db = fopen("Numeros.bin", "rb+");

    fseek(db, indice * sizeof(int), SEEK_SET);
    fwrite(&valor, sizeof(int), 1, db);

    rewind(db);

    fclose(db);

}