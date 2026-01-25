/*
    O(log n) = logaritimia
        Otima utilizado em pesquisa binaria

    Vamos tetar com simples 100 numeros, porem se fossem 1.000.000 (1 milhão)
        linear O(n) Faria 1 milhão de verificações
        Binaria O(log n) Faz somente 20 Verificações
    Com 4 bilhões, faria apenas 32 Verificaões

    A fraqueza da lista binaria é a ordem, se ela estiver desordenada ela não funcionara

*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define tam 100

long long pesquisaBinaria(int lista[], int n);

int main(){

    
    clock_t inicio, fim;
    double tempo_total;
    int valor = 0;
    long long resultado = 0;
    int lista[tam];
    
    for(int i = 0; i < tam; i++){
        lista[i] = i + 1;
    };
    for(int i = 0; i < tam; i++){
        printf("%d\n", lista[i]);
    };


    printf("Iniciando teste:\n\n");
    printf("Qual numero deseja procurar?\n");
    scanf("%d", &valor);

    printf("Iniciando o algoritimo:\n");
    inicio = clock();
    
    // Colocar o algoritimo a ser medido tempo neste espaço
    resultado = pesquisaBinaria(lista, valor);
    // complexidade O(n) o tempo de execução aumenta de acordo com o valor informado N vezes

    fim = clock();
    printf("Fim do contador!\n");

    if(resultado == -1){
        printf("\n\nValor não existente na lista\n");
        return 1;
    }

    // Calculo de tempo
    tempo_total = ((double)(fim - inicio)) / CLOCKS_PER_SEC;

    // Imprime resultados:
    printf("Resultado: %lld\n", resultado);
    printf("Tempo total em Segundos: %f s\n", tempo_total);
    printf("Tempo total em Milissegundos: %f ms\n", tempo_total * 1000);

    return 0;

};

long long pesquisaBinaria(int lista[], int n){
    int baixo = 0;
    int alto = tam - 1;
    int meio;
    int chute;

    while(baixo <= alto){
        meio = (baixo + alto) / 2;
        chute = lista[meio];
        if(chute == n){
            return n;
        }else if(chute > n){
            alto = meio - 1;
        }else{
            baixo = meio + 1;
        }
    }
    return -1;
}