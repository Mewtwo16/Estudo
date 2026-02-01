#ifndef STACK_H
#define STACK_H

#include "vector.h"

typedef struct {
    Vector *vector; // A Pilha "é" um wrapper do vetor
} Stack;

// Cria uma pilha inicializando o vetor interno
Stack* stack_create(size_t element_size);

// Empilha: Usa vector_push
void stack_push(Stack *s, void *element);

// Desempilha: Remove o último elemento e retorna o ponteiro para ele
// CUIDADO: Ao diminuir o size do vetor, o dado continua na memória (sujo), 
// mas o próximo push vai sobrescrever.
void* stack_pop(Stack *s);

// Espia: Retorna o último elemento sem remover
void* stack_peek(Stack *s);

// Tamanho: Retorna quantos itens tem
size_t stack_size(Stack *s);

// Limpa tudo
void stack_free(Stack *s);

#endif