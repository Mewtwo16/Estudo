#include <stdio.h>
#include <stdlib.h>
#include "vector.h"

typedef struct {
    int id;
    float saldo;
} Conta;

int main() {
    printf("=== TESTE 1: Inteiros ===\n");
    // Criando vetor que guarda INT (4 bytes)
    Vector *v = vector_create(sizeof(int));

    // Inserindo dados
    for (int i = 0; i < 5; i++) {
        int x = i * 10;
        vector_push(v, &x); // Passa o endereço!
    }

    // Lendo dados
    for (size_t i = 0; i < v->size; i++) {
        int *p = (int*) vector_get(v, i); // Recebe void*, converte pra int*
        printf("[%zu]: %d\n", i, *p);
    }
    vector_free(v);

    printf("\n=== TESTE 2: Structs Complexas ===\n");
    // Criando vetor que guarda CONTA (8 bytes)
    Vector *v_conta = vector_create(sizeof(Conta));

    Conta c1 = {1, 100.50};
    Conta c2 = {2, 5000.99};

    vector_push(v_conta, &c1);
    vector_push(v_conta, &c2);

    Conta *resgate = (Conta*) vector_get(v_conta, 1);
    printf("Conta ID: %d | Saldo: %.2f\n", resgate->id, resgate->saldo);

    vector_free(v_conta);

    return 0;
}