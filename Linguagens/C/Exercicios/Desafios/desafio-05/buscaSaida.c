
#ifdef _WIN32
    #include <windows.h>
#else
    #include <unistd.h>
    #define Sleep(x) usleep((x)*1000) // Define Sleep para funcionar como no Windows
#endif

#include <stdio.h>
#include <stdlib.h>
#include "buscaSaida.h"

extern int mapa[5][5];


int buscaSaida(int x, int y){

    // Casos bases de uma recursão
    if(x < 0 || x > 4 || y < 0 || y > 4){
        printf("Estou fora do mapa\n");
        return 0;
    }
    if(mapa[x][y] == 0){
        printf("Bati em uma parede!\n");
        return 0;
    }
    if(mapa[x][y] == 2){
        printf("Já passei por aqui!\n");
        return 0;
    }
    if(mapa[x][y] == 9){
        printf("Cheguei na saida!\n");
        return 1;
    }

    // Atualização
    mapa[x][y] = 2;
    desenhaMapa();

    // Recursão
    if(buscaSaida(x - 1, y)){
        printf("Tentando para cima");
        return 1;
    }
    if(buscaSaida(x + 1, y)){
        printf("Tentando para baixo");
        return 1;
    }
    if(buscaSaida(x, y + 1)){
        printf("Tentando para direita");
        return 1;
    }
    if(buscaSaida(x, y - 1)){
        printf("Tentando para esquerda");
        return 1;
    }


    printf("Sem saida");
    return 0;

}

void desenhaMapa(){
    system("clear");
    for(int i = 0; i < 5; i++){
        for(int j = 0; j < 5;j++){
            printf("%d ", mapa[i][j]);
        };
        printf("\n");
    };
    Sleep(200);
    
}