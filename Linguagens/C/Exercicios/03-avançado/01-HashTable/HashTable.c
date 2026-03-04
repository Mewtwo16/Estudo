

#include <stdio.h>
#include <stdlib.h>
#include "KeyValuePair.h"
#include "HashTable.h"

HashTable* createTable( int size){

    if(size <= 0){
        return NULL;
    };

    HashTable *table = malloc(sizeof(HashTable));
    if(table == NULL){
        return NULL;
    };

    // Limpar a memoria e inicializar valores
    table->size = size;
    table->count = 0;

    // calloc para um ponteiro duplo, deve-se pegar o tamanho do valor 
    table->buckets = calloc(size, sizeof(KeyValuePair*));
    if(table->buckets == NULL){
        return NULL;
    }

    return table;

}