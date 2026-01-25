/*
    n é o numero de operações
    O(1) = constante o tempo de execução é sempre o mesmo
    O(n) = linear o tempo de execução aumenta igualmente o numero de operações 

    
*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

long long soma(int n);
long long soma2(int n);

int main(){

    
    clock_t inicio, fim;
    double tempo_total;
    int valor = 0;


    printf("Iniciando teste:\n\n");
    printf("Quantos vezes deseja somar?\n");
    scanf("%d", &valor);

    printf("Iniciando contador:\n");
    inicio = clock();
    
    // Colocar o algoritimo a ser medido tempo neste espaço
    long long resultado = soma2(valor); // Função com tempo linear 
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

}


// Ambas fazem a mesma coisa,porem uma usa loop for e outra usa equação matematica

long long soma(int n){ // Função com N passos
    long long soma = n; // O(1)
    for(int i = 0; i < n; i++){ // O(n);
        soma += i; // O(1)
    };
    // Algoritimos com apenas 1 for, tendem a ter tempo de execução igual O(n) - linear

    return soma;

}

long long soma2(int n){ // Complexidade constante O(1)
    return ((long long)n * (n + 1)) / 2; // Função com apenas 3 passo
}

