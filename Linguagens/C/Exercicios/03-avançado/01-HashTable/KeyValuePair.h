

#ifndef KEYVALUEPAIR_H
#define KEYVALUEPAIR_H

#include <stdlib.h>

typedef struct KeyValuePair {
    char* key;
    char* value;
    struct KeyValuePair* next;
} KeyValuePair;

#endif