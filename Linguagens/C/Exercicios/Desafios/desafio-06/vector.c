
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "vector.h"

Vector* vector_create(size_t element_size){

    Vector *v = malloc(sizeof(Vector));

    if(v == NULL){
        return NULL;
    }

    v->size = 0;
    v->load = 10;    
    v->dados = malloc(v->load * element_size);
    

    if(v->dados == NULL){
        free(v);
        return NULL;
    }

    v->element_size = element_size;

    return v;

}

void vector_push(Vector *v, void *elemento){

    void *temp;

    if(v->size == v->load){
        temp = realloc(v->dados, (v->load * 2) * v->element_size);
        
        if(temp == NULL){
            free(temp);
            return;
        };

        v->load = v->load * 2;
        v->dados = temp;
    };

    memcpy((char*)v->dados + (v->size * v->element_size), elemento, v->element_size);

    v->size++;


}

void* vector_get(Vector *v, size_t index){

    if(index >= v->size){
        return NULL;
    };

    void *temp = (char*)v->dados + (index * v->element_size);



    return temp;

}

void vector_free(Vector *v) {
    if (v != NULL) {
        if (v->dados != NULL) {
            free(v->dados); 
        }
        free(v); 
    }
}