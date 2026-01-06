/*
    structs em c, são o mais proximo que temos de classes em outras linguagens
    structs = estrutura de dados
*/

#include <stdlib.h>
#include <string.h>
#include <stdio.h>

//Criando structs
struct st_aluno{
    char matricula[10];
    char nome[100];
    char curso[50];
    int ano_nascimento;
}aluno2, aluno3; // Posso declarar a variavel dentro da declaração da struct
// Pode-se ser um array de alunos


int main(){

    // Declarando dentro do main
    struct st_aluno aluno1;

    printf("Informe a matricula do aluno: ");
    fgets(aluno1.matricula, 10, stdin);
    printf("Informe o nome do aluno: ");
    fgets(aluno1.nome, 100, stdin);
    printf("Informe o curso do aluno: ");
    fgets(aluno1.curso, 50, stdin);
    printf("Informe o ano de nascimento do aluno: ");
    scanf("%d", &aluno1.ano_nascimento);

    printf("========== Dados do Aluno ==========");
    printf("Matricula: %s\n", aluno1.matricula);
    printf("Nome: %s\n", aluno1.nome);
    printf("Curso: %s\n", aluno1.curso);
    printf("Ano de Nascimento: %d\n", aluno1.ano_nascimento);

    return 0;
};


