

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef enum{
    A_FAZER,
    EM_ANDAMENTO,
    CONCLUIDO
} Status;

typedef struct{
    int id;
    char descricao[50];
    Status status;
}  Tarefa;

void criaTarefa(char descricao[50]);
void verTarefas();
int novoID();

int main(){

    int menu = 0;
    char descricao[50];

    printf("\n\nBem vindo ao kanban!\n\n");

    printf("Menu: \n");
    printf("[1] - Criar Tarefa\n");
    printf("[2] - Ver Tarefas\n");
    printf("---: ");
    scanf("%d", &menu);
    getchar();

    switch (menu){
    case 1:
        printf("Criando Tarefa: \n");
        printf("Qual descricao da tarefa?\n");
        printf("---: ");
        fgets(descricao, sizeof(descricao), stdin);
        descricao[strcspn(descricao, "\n")] = 0;
        criaTarefa(descricao);
        break;
    case 2:
        printf("Vendo Tarefas: \n");
        verTarefas();
        break;
    
    default:
        printf("Opção invalida");
        break;
    }

    return 0;
};

void criaTarefa(char descricao[50]){

    FILE *db;
    db = fopen("db.dat", "a+");
    int id = novoID();


    Tarefa t1;

    t1.id = id;
    strcpy(t1.descricao, descricao);
    t1.status = A_FAZER;

    fwrite(&t1, sizeof(Tarefa), 1, db);

    printf("Tarefa Criada com suscesso!\n");

    fclose(db);
};

void verTarefas(){
    FILE *db;
    db = fopen("db.dat", "r");
    Tarefa t_temp;

   if(db == NULL){
    printf("Nenhuma tarefa encontrada.\n");
    return;
   };

   printf("\n=== LISTA DE TAREFAS ===\n");

    while(fread(&t_temp, sizeof(Tarefa), 1, db) == 1){
            
            printf("ID: %d | Descricao: %s", t_temp.id, t_temp.descricao);
            
            // Convertendo o ENUM (0, 1, 2) para TEXTO
            printf("Status: ");
            switch(t_temp.status){
                case A_FAZER:      printf("[A Fazer]\n"); break;
                case EM_ANDAMENTO: printf("[Em Andamento]\n"); break;
                case CONCLUIDO:    printf("[Concluido]\n"); break;
                default:           printf("[Desconhecido]\n"); break;
            }
            printf("------------------------\n");
    };

    fclose(db);

};

int novoID(){
    FILE *db;
    db = fopen("db.dat", "rb");
    Tarefa t_temp;

    if(db == NULL) return 1;

    int resultado = fseek(db, -sizeof(Tarefa), SEEK_END);

    int proximoId = 1;

    if(resultado == 0){
        fread(&t_temp, sizeof(Tarefa), 1, db);
        proximoId = t_temp.id + 1;
    };
    fclose(db);
    return proximoId;
}