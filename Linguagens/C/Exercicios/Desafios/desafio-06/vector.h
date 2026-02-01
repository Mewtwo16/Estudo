#ifndef VECTOR_H
#define VECTOR_H

typedef struct{
    void *dados;
    size_t size;
    size_t load;
    size_t element_size;
} Vector;

Vector* vector_create(size_t element_size);
void vector_push(Vector *v, void *elemento);
void* vector_get(Vector *v, size_t index);
void vector_free(Vector *v);


#endif