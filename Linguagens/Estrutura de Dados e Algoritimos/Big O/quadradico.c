/*
    O(n*2) - quadradico
    é um dos piores algoritimos, extremamente lentos e o tempo de execução dobra a cada N execução

    
*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>


int main(){

    
    clock_t inicio, fim;
    double tempo_total;
    int valor = 0;
    long long resultado = 0;


    printf("Iniciando teste:\n\n");
    printf("Quantos vezes deseja somar?\n");
    scanf("%d", &valor);

    printf("Iniciando o algoritimo:\n");
    inicio = clock();
    
    // Colocar o algoritimo a ser medido tempo neste espaço
    
    // complexidade O(n) o tempo de execução aumenta de acordo com o valor informado N vezes

    fim = clock();
    printf("Fim do contador!\n");

    // Calculo de tempo
    tempo_total = ((double)(fim - inicio)) / CLOCKS_PER_SEC;

    // Imprime resultados:
    printf("Resultado: %lld\n", resultado);
    printf("Tempo total em Segundos: %f s\n", tempo_total);
    printf("Tempo total em Milissegundos: %f ms\n", tempo_total * 1000);

    return 0;

};

long long quadradico(){

}