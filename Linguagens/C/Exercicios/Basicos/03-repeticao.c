

#include <stdio.h>
#include <stdbool.h>


int main(){

    int menu = 0;

    printf("Selecione a opção desejada: \n");
    printf("1 - Determinar os 5 primeiros multiplos do numero informado\n");
    printf("2 - Incrementar um numero em X valor até atingir x valor\n");
    printf("3 - Ler uma senquencia de numeros e informar o maior e o menor\n");
    printf("Opção: ");
    scanf("%d", &menu);

    switch (menu){
    case 1:{
        int multiplo = 0;
        bool isFinish = true;
        int cout = 0;
        int isMult = 0;
        printf("Informe o numero que deseja saber os multiplos: ");
        scanf("%d", &multiplo);
        do{
            for(int i = 0; i < 6; i++){
                cout = multiplo * i;
                isMult = cout % multiplo;
                if(isMult == 0){
                    printf("o numero %d é multiplo de %d\n", cout, multiplo);
                };
            }
            isFinish = false;
        }while(isFinish);
        break;
    }
    case 2:{
        int incrementador = 0;
        int incrementado = 0;
        int max = 0;
        printf("Informe um valor a ser o incrementado: ");
        scanf("%d", &incrementado);
        printf("informe um valor a ser o incrementador: ");
        scanf("%d", &incrementador);
        printf("informe quantas vezes ele vai ser incrementado: ");
        scanf("%d",  &max);

        if(max < incrementador ){
            printf("O valor maximo não pode ser menor que o incrementador");
        } else if(max < incrementado){
            printf("O valor maximo não pode ser menor que o incrementado");
        } else if(incrementador == 0){
            printf("Incrementador não pode ser 0");
        }else{
            for(int i = 0; i <= max; i++){
                printf("O valor é: %d \n", incrementado);
                incrementado = incrementado + incrementador;
            };
        };
        break;
    }
    case 3: {
            int numeroLido = 0;
            int maior = 0;
            int menor = 0;

            printf("Digite 10 numeros:\n");

            for(int i = 0; i < 10; i++) {
                printf("Numero %d: ", i + 1);
                scanf("%d", &numeroLido);

                if (i == 0) {
                    maior = numeroLido;
                    menor = numeroLido;
                } else {
                    if (numeroLido > maior) {
                        maior = numeroLido;
                    }
                    if (numeroLido < menor) {
                        menor = numeroLido;
                    }
                }
            }
            printf("O maior valor foi: %d\n", maior);
            printf("O menor valor foi: %d\n", menor);
        break;
    }
    default:
        printf("Valor informado invalido");
        break;
    }

    return 0;
}