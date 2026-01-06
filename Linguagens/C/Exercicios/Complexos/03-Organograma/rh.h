// rh.h
#ifndef RH_H // Guarda de inclusão (evita duplicidade)
#define RH_H

#include <stdio.h>

typedef struct {
    int id;
    char nome[50];
    char cargo[30];
    int id_supervisor; // 0 se for o CEO
} Funcionario;

// Protótipos
void cadastrarFuncionario(FILE *db, Funcionario *f);
int gerarNovoID(FILE *db);

void mostrarOrganograma(int id_lider, int nivel);

#endif