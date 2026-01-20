

#include <stdio.h>
#include <stdlib.h>

typedef struct{
    int tempo;
    float velocidade;
    float rpm;
} Telemetria;

int main(){

    FILE *db;
    Telemetria t;
    int menu = 0;
    int contador = 0, maiorTempo = 0;
    float somaVelocidade = 0, maiorRPM = 0, media = 0;

    do{

        db = fopen("Telemetria.bin", "ab");

        if(db == NULL){
            printf("Erro no banco de dados\n");
            return 1;
        };

        printf("Qual o tempo(minutos): \n");
        scanf("%d", &t.tempo);
        printf("Qual a velocidade: \n");
        scanf("%f", &t.velocidade);
        printf("Qual o RPM: ");
        scanf("%f", &t.rpm);

        fwrite(&t, sizeof(Telemetria), 1, db);

        fclose(db);

        printf("Deseja gravar novo registro? [1] Sim [-1] Nao \n");
        scanf("%d", &menu);
        getchar();
    } while (menu != -1);
    
    db = fopen("Telemetria.bin", "rb");
    if(db == NULL){
        printf("Erro no banco de dados\n");
        return 1;
    };

    printf("Imprimindo caixa preta: \n\n");
    while(fread(&t, sizeof(Telemetria), 1, db) == 1){
        printf("=================\n");
        printf("Tempo: %d/minutos\n", t.tempo);
        printf("Velocidade: %.2fKM/h\n", t.velocidade);
        printf("Rotacoes: %.2f/RPM\n", t.rpm);
        printf("=================\n");

        


        somaVelocidade += t.velocidade;

        if (t.rpm > maiorRPM){
            maiorRPM = t.rpm;
            maiorTempo = t.tempo;
        };


        contador++;
    };
    fclose(db);

    media = somaVelocidade / contador;

    printf("A velocidade media foi: %.1f\n", media);
    printf("O maior rotacao foi (%.2f) atingida no tempo (%d)\n", maiorRPM, maiorTempo);

    printf("\n\nFim do programa!\n\n");



    return 0;
}