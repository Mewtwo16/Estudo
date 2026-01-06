

#include <stdio.h>;

int main(){

    int n1, n2, n3, n4, Resultado = 0;

    // Exercicio 01: 

    printf("Informe os valores a serem calculados os quadrados: \n");
    printf("Valor 1: ");
    scanf("%d", &n1);
    printf("Valor 2: ");
    scanf("%d", &n2);
    printf("Valor 3: ");
    scanf("%d", &n3);

    Resultado = (n1 * 2) + (n2 * 2) + (n3 * 2);

    printf("\nA soma dos quadrados é: %d\n", Resultado);

    // Exercicio 02: 
    // Limpando variaveis
    n1, n2, n3, n4, Resultado = 0;
    int media;

    printf("Digite 4 notas");
    printf("Nota 1: ");
    scanf("%d", &n1);
    printf("Nota 2: ");
    scanf("%d", &n2);
    printf("Nota 3: ");
    scanf("%d", &n3);
    printf("Nota 4: ");
    scanf("%d", &n4);

    media = (n1 + n2 + n3 + n4) / 2;

    printf("A media das notas é %d", media);

    // Exercicio 03: 

    int v1, v2, v3, vTotal, vRecebe, premio;

    printf("Qual o valor do premio: ");
    scanf("%d", &premio);
    printf("Quanto cada um investiu?\n");
    printf("Primeiro: ");
    scanf("%d", &v1);
    printf("Segundo: ");
    scanf("%d", &v2);
    printf("Terceiro: ");
    scanf("%d", &v3);

    vTotal = v1 + v2 + v3;
    
    vRecebe = (v1  * premio) / vTotal;
    printf("O primeiro investidor recebe: %d\n", vRecebe);
    vRecebe = (v2  * premio) / vTotal;
    printf("O segundo investidor recebe: %d\n", vRecebe);
    vRecebe = (v3  * premio) / vTotal;
    printf("O terceiro investidor recebe: %d\n", vRecebe);


    return 0;
}