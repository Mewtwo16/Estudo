

#include <stdio.h>
#include <string.h>

// Union separa e utiliza apenas o espaço da maior variavel
union pessoa{
    char nome[100];
    int idade
};


int main(){

    union pessoa pes;
    
    strcpy(pes.nome, "Angelina Jolie");
    printf("Dados de %s\n", pes.nome);

    pes.idade = 39;
    printf("Ela tem %d anos\n", pes.idade);

    printf("A variavel pes ocupa %ld bytes\n", sizeof(pes));

    return 0;
}