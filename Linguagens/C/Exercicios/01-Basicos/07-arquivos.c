

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){

    FILE* arq;
    char ch, resultado;
    int alerta = 0;
    int linhas = 0;

    arq = fopen("turno_1.txt", "w");

    printf("\n\nEscreve o LOG:\n");
    scanf("%c", &ch);

    while(ch != '|'){
        fputc(ch, arq);
        ch = getchar();
    };
    fclose(arq);

    arq = fopen("turno_1.txt", "r");
    while((ch = fgetc(arq)) != EOF ){
        printf("%c", ch);
        if(ch == '?'){
            alerta++;
        } else if(ch == '\n'){
            linhas++;
        };

    };

    printf("\nForam contabilizadas %d linhas", linhas);
    printf("\nForam contabilizados %d alertas\n", alerta);
    

    return 0;
};

