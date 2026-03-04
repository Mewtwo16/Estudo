

#ifndef HASHTABLE_H
#define HASHTABLE_H

#include "KeyValuePair.h"

typedef struct {
    int size;
    int count;
    KeyValuePair** buckets;
} HashTable;

HashTable* createTable(int size);

void put(HashTable* table, char* key, char* value);

char* get(HashTable* table, char* key);

void del(HashTable* table, char* key);

void drop(HashTable* table);

unsigned int hash(char* key, int size);


#endif