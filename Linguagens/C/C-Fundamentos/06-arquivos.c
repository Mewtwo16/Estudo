

#include <stdio.h>
#include <stdlib.h>

int main(){

    FILE *arq; // Tipo file(arquivo) é um ponteiro que aponta para um arquivo na memoria do computador
    char c;

    int idade, menu;
    char nome[50];

    /*
        usamos fopen para abrir o arquivo recebendo dois parametros (nome, abertura)
        w - abrir o arquivo para escrita(se não existir ele é criado, caso já exista será sobreescrito);
        r - abrir o arquivo para leitura(read-only)
        a - abrir o arquivo para escrita(porem adiciona o conteudo e não sobre escreve)
    */

    do{

        printf("\n\nOque deseja fazer: \n\n");
        printf("[1]-Criar arquivo \n[2]-Escrever no arquivo \n[3]-Ler o arquivo \n[4]-sair \n");
        printf("---:");
        scanf("%d", &menu);
        getchar();

        switch(menu)
        {
        case 1:{
            arq = fopen("arquivo.txt", "w");
            printf("Arquivo.txt criado com suscesso");
            fclose(arq);
        }
            break;
        case 2:{
            arq = fopen("arquivo.txt", "a");
            printf("\nQual seu nome: ");
            fgets(nome, sizeof(nome), stdin); // standard input
            printf("qual sua idade: ");
            scanf("%d", &idade);
            fprintf(arq, "Nome: %s", nome); 
            fprintf(arq, "Idade: %d\n", idade);
            fclose(arq);
        }
            break;
        case 3:{
            arq = fopen("arquivo.txt", "r");
            printf("Os dados no arquivo são: \n");
            printf("\n==============\n");
            /*
                EOF - END OF FILE
                FEOF - FILE END OF FILE
            */
            while((c = getc(arq)) != EOF){
                putchar(c);
            };
            printf("==============\n");
            fclose(arq);
        }
            break;
        case 4:{
            printf("Fechando arquivo\n");
        }
            break;
        
        default:
            printf("Erro de leitura\n");
            break;
        }

    }while(menu != 4);

    

    return 0;
};