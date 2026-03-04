

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "rh.h"

int main(){


    FILE *db; 
    int menu = 0; 
    int searchID = 0;

    Funcionario f; 


    printf("Bem vindo ao organograma da empresa!\n"); 
    
    do{
        printf("[1] - Adicionar Usuario\n");
        printf("[2] - Vizualizar arvore\n");
        printf("[3] - Sair do Programa\n");
        printf("---: ");
        scanf("%d", &menu);
        getchar();
        switch (menu){
        case 1:
            system("clear"); 
            db = fopen("banco_rh.dat", "a+");
            printf("\n\nCadastrar Usuario:\n\n");
            f.id = gerarNovoID(db);
            printf("Seu nome?\n");
            printf("---: ");
            fgets(f.nome, sizeof(f.nome), stdin);
            f.nome[strcspn(f.nome, "\n")] = 0;
            printf("\nQual seu cargo?\n");
            printf("---: ");
            fgets(f.cargo, sizeof(f.cargo), stdin);
            f.cargo[strcspn(f.cargo, "\n")] = 0;
            printf("Qual id do supervisor?\n");
            printf("---: ");
            scanf("%d", &f.id_supervisor);
            cadastrarFuncionario(db, &f);
            fclose(db);
            break;
        case 2:
            system("clear");
            db = fopen("banco_rh.dat", "r");
            printf("Apatir de qual id deseja consultar:\n");
            printf("---: ");
            scanf("%d", &searchID);
            getchar();
            mostrarOrganograma(searchID, 0);
            fclose(db);
            break;
        case 3:
            printf("Saindo do programa!\n");
            break;
        default:
            printf("Opção invalida!\n");
            break;
        }

    }while(menu != 3);
    
    return 0;
};