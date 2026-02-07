

#ifndef INDEX_H
#define INDEX_H

typedef struct{
    int id;
    long posicao_byte;
} Index;

Index* criar_indice(const char* nome_arquivo, int *qtd_registros);

#endif