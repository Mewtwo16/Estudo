
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "rh.h"

void cadastrarFuncionario(FILE *db, Funcionario *f){

    if(!db){
        printf("Erro, banco de dados inexistente!");
    };

    fwrite(f, sizeof(Funcionario), 1,db);

    printf("\n\n========== Funcionario ==========\n");
    printf("Id: %d\n", f->id);
    printf("Nome: %s\n", f->nome);
    printf("Cargo: %s\n", f->cargo);
    printf("Id Supervisor: %d\n", f->id_supervisor);
    printf("=================================\n\n");
    printf("Funcionario cadastrado com suscesso!\n");
}

int gerarNovoID(FILE *db){
    db = fopen("banco_rh.dat", "rb");
    Funcionario f_temp;

    if(db == NULL) return 1;

    int resultado = fseek(db, -sizeof(Funcionario), SEEK_END);

    int proximoId = 1;

    if(resultado == 0){
        fread(&f_temp, sizeof(Funcionario), 1, db);
        proximoId = f_temp.id + 1;
    };
    fclose(db);
    return proximoId;
};

void mostrarOrganograma(int id_lider, int nivel){

    Funcionario f_temp;

    FILE *db = fopen("banco_rh.dat", "rb");

    if(db == NULL){
        printf("Erro no banco de dados\n");
        return;
    };

    while(fread(&f_temp, sizeof(Funcionario), 1, db ) == 1){
        
        // 3. O Filtro: "Você é subordinado deste líder?"
        if(f_temp.id_supervisor == id_lider){
            
            // Desenha a identação visual
            for(int i = 0; i < nivel; i++){
                printf("    |--"); 
            }

            // Imprime o funcionário encontrado
            printf(" ID: %d | %s (%s)\n", f_temp.id, f_temp.nome, f_temp.cargo);

            // 4. A RECURSÃO: "Agora ache os seus subordinados"
            // Note: Não passamos arquivo, passamos apenas o ID dele.
            // O nível aumenta em 1.
            mostrarOrganograma(f_temp.id, nivel + 1);
            
            // Importante: Como abrimos um arquivo novo a cada chamada,
            // não precisamos de rewind() aqui. O cursor DESTE loop
            // continua intacto lendo o próximo registro.
        }

        }

    fclose(db);
}