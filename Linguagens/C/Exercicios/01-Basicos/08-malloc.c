

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct{
    char nome[50];
    float nota;
} Aluno;

void cadastrarNotas(Aluno **a, int *capaidade, int *total);

int main(){

    int menu, total = 0, capacidade = 2;
    Aluno *a = (Aluno*) malloc(capacidade * sizeof(Aluno));
    if(a == NULL){
        printf("[Erro Fatal] Incapacidade de alocar memoria ou Memoria insuficiente");
        return 1;
    };

    printf("Bem vindo ao sistema de cadastro de notas!\n\n");

    do{
        printf("[1] - Cadastrar nova nota\n");
        printf("[2] - Listas notas\n");
        printf("[3] - Sair\n");
        printf("---: ");
        scanf("%d", &menu);

        switch (menu){
        case 1:
            printf("Cadastrando novas notas: \n");
            cadastrarNotas(&a, &capacidade, &total);
            break;
        case 2:
            printf("Listando notas cadastradas: \n");
            for(int i = 0; i < total; i++){
                printf("\n\n====== Aluno %d ======\n", i + 1);
                printf("Aluno: %s --- Nota %.2f \n\n", a[i].nome, a[i].nota);
            }
            printf("\n\n");
            break;
        case 3:
            printf("Sainda do sistema!\n");
            break;

        default:
            printf("Opção invalida\n");
            break;
        }
        
    } while (menu != 3);
    
    free(a);
    a = NULL;

    return 0;

}


void cadastrarNotas(Aluno **a, int *capacidade, int *total){

    if(*total >= *capacidade){
        *capacidade += *capacidade * 2;
        printf("--> [DEBUG] Vetor cheio. Expandindo para %d slots...\n", *capacidade);
        Aluno *temp = (Aluno*) realloc(*a, *capacidade * sizeof(Aluno));
        *a = temp;
    };

    if(*a == NULL){
        printf("[Erro Fatal] Memoria insuficiente!\n");
    }

    printf("Qual o nome do aluno?\n");
    getchar();
    fgets((*a)[*total].nome, 50, stdin);
    (*a)[*total].nome[strcspn((*a)[*total].nome, "\n")] = 0;
    printf("Qual a nota do aluno: \n");
    printf("---: ");
    scanf("%f", &(*a)[*total].nota);

    (*total)++;
    
    printf("Aluno cadastrado com sucesso! Total: %d\n", *total);
}