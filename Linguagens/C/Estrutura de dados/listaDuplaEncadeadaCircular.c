#include <stdio.h>
#include <stdlib.h>

// Definição da estrutura do Nó
typedef struct No {
    int valor;
    struct No* prox; // Ponteiro para o próximo
    struct No* ant;  // Ponteiro para o anterior
} No;

// Função para criar um novo nó (aloca memória)
No* criarNo(int valor) {
    No* novo = (No*)malloc(sizeof(No));
    if (novo) {
        novo->valor = valor;
        // Na criação, ele aponta para si mesmo (ciclo fechado de 1 elemento)
        novo->prox = novo;
        novo->ant = novo;
    }
    return novo;
}

// Função para inserir no FINAL da lista
// Note que usamos ponteiro duplo (**lista) para poder alterar o ponteiro principal se necessário
void inserirFinal(No** cabeca, int valor) {
    No* novo = criarNo(valor);
    if (!novo) return; // Erro de memória

    // CASO 1: A lista está vazia
    if (*cabeca == NULL) {
        *cabeca = novo; // O novo nó vira a cabeça
    } 
    // CASO 2: A lista já tem elementos
    else {
        // O truque da lista circular duplamente encadeada:
        // O "anterior" da cabeça é SEMPRE o último nó da lista!
        No* ultimo = (*cabeca)->ant; 

        // 1. Configurar o NOVO nó
        novo->prox = *cabeca; // O próximo do novo será a cabeça (ciclo)
        novo->ant = ultimo;   // O anterior do novo será o antigo último

        // 2. Atualizar o ANTIGO último nó
        ultimo->prox = novo;  // O próximo do antigo último agora é o novo

        // 3. Atualizar a CABEÇA
        (*cabeca)->ant = novo; // O anterior da cabeça agora é o novo nó (ciclo fechado)
    }
    printf("Inserido: %d\n", valor);
}

// Função para imprimir a lista (Sentido Horário / Frente)
void imprimirFrente(No* cabeca) {
    if (cabeca == NULL) {
        printf("Lista Vazia!\n");
        return;
    }

    No* atual = cabeca;
    printf("Lista (Frente): ");
    
    // Usamos do-while porque o while simples (atual != cabeca) falharia na primeira volta
    do {
        printf("[%d] -> ", atual->valor);
        atual = atual->prox;
    } while (atual != cabeca); // Para quando der a volta completa e chegar no início
    
    printf("(volta ao inicio)\n");
}

// Função para imprimir a lista (Sentido Anti-Horário / Trás)
// Isso prova que os ponteiros 'ant' estão funcionando corretamente
void imprimirTras(No* cabeca) {
    if (cabeca == NULL) return;

    No* ultimo = cabeca->ant; // Começamos pelo último!
    No* atual = ultimo;

    printf("Lista (Tras):   ");
    do {
        printf("[%d] -> ", atual->valor);
        atual = atual->ant; // Andamos para trás
    } while (atual != ultimo); // Para quando der a volta completa
    
    printf("(volta ao fim)\n");
}

int main() {
    No* minhaLista = NULL; // Ponteiro para o início da lista

    // Inserindo elementos
    // A lógica circular cuida de tudo automaticamente
    inserirFinal(&minhaLista, 10);
    inserirFinal(&minhaLista, 20);
    inserirFinal(&minhaLista, 30);
    inserirFinal(&minhaLista, 40);

    printf("\n--- Testando os Ponteiros ---\n");
    
    // Testa idas (Next)
    imprimirFrente(minhaLista);
    
    // Testa voltas (Prev)
    imprimirTras(minhaLista);

    // Demonstração visual do ciclo infinito
    printf("\n--- Navegando infinitamente (apenas 6 passos) ---\n");
    No* temp = minhaLista;
    for(int i=0; i<6; i++) {
        printf("%d... ", temp->valor);
        temp = temp->prox;
    }
    printf("\n");

    return 0;
}