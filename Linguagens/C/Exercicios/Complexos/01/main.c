/*
    Este exercício foi desenhado para durar entre 20 a 30 minutos. 
    Ele exige que você manipule o valor de uma variável indiretamente (via ponteiro) 
    enquanto processa um fluxo de dados (arquivo).

    O Cenário: Você precisa enviar uma mensagem secreta para um servidor, 
    mas o canal não é seguro. Você deve criar um programa que leia um arquivo de texto comum e 
    gere um novo arquivo com o conteúdo "criptografado" usando uma lógica de deslocamento simples (Cifra de César).

*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void lerArq(FILE *arq);
void criptografa(char *p, int ch);

int main(){

    FILE *arq;
    FILE *arqSecure;
    
    int chave = 0;
    char ch;
    arq = fopen("mensagem.txt", "r");
    arqSecure = fopen("saida.enc", "w");

    if(arq){
        printf("Informe a chave: ");
        scanf("%d", &chave);
        printf("Chave informada com suscesso.\n");
        printf("Iniciando processo de criptografia\n");
        while((ch = fgetc(arq)) != EOF){
            criptografa(&ch, chave);
            fputc(ch, arqSecure);
        };
        // Ao terminar de escrever o curso para no final do arquivo, fechar e abrir de novo rebobina ele
        fclose(arqSecure);
        arqSecure = fopen("saida.enc", "r"); //Rebobinar o arquivo

        printf("Arquivo criptografado: \n\n");
        while((ch = fgetc(arqSecure)) != EOF){
            printf("%c", ch);
        };
        printf("\n\nFinalizando o programa!\n");
        fclose(arq);
        fclose(arqSecure);
    } else{
        printf("Arquivo não existe");
        return 1;
    };


    return 0;
};



void criptografa(char *ch, int chave){
    *ch = *ch + chave;
}
