

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "index.h"
#include "funcionario.h"

Index* criar_indice(const char* nome_arquivo, int *qtd_registros){

    FILE *db = fopen(nome_arquivo, "rb");
    if (db == NULL) {
        return NULL;
    }

    fseek(db, 0, SEEK_END);
    long tamanho_bytes = ftell(db);
    rewind(db);

    int total_itens = tamanho_bytes / sizeof(Funcionario);
    *qtd_registros = total_itens;

    Index *ar = malloc(total_itens * sizeof(Index));
    if(ar == NULL){
        return NULL;
    }

    Funcionario temp;
    for(int i = 0; i < total_itens; i++){
        ar[i].id = temp.id;
        ar[i].posicao_byte = ftell(db);

        fread(&temp, sizeof(Funcionario), 1, db);

        ar[i].id = temp.id;
    }

    fclose(db);
    return ar;


}
