

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "stack.h"

Stack* stack_create(size_t element_size){

    Stack *s = malloc(sizeof(Stack));

    if(s == NULL){
        return NULL;
    }

    s->vector = vector_create(element_size);

    return s;

}

void stack_push(Stack *s, void *element){

    vector_push(s->vector, element);

}

void* stack_pop(Stack *s){

    if(s->vector->size == 0){
        return NULL;
    }

    void *temp = vector_get(s->vector, s->vector->size - 1);

    s->vector->size--;

    return temp;
}

void* stack_peek(Stack *s){

    void *temp = vector_get(s->vector, s->vector->size - 1);

    return temp;
}

size_t stack_size(Stack *s){

    return s->vector->size;
}

void stack_free(Stack *s){

    if(s != NULL){
        vector_free(s->vector);
        free(s);
    }
    

}