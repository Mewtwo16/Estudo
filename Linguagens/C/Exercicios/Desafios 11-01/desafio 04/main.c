

#include <stdio.h>
#include <stdlib.h>
#include "editor.h"

int main(){

    FILE *db;
    int vetor[5] = {10, 20, 30, 40, 50};
    int indice = 0;
    int valor = 0;
    int temp;

    db = fopen("Numeros.bin", "wb");
    fwrite(&vetor, sizeof(int), 5, db);
    fclose(db);

    printf("\nInforme um indice: ");
    scanf("%d", &indice);
    printf("\nInforme um valor para colocar neste indice: ");
    scanf("%d", &valor);
    editor(indice, valor);

    db = fopen("Numeros.bin", "rb");

    while(fread(&temp, sizeof(int), 1, db) == 1){
        printf("%d\n", temp);
    }

    fclose(db);

    return 0;
}