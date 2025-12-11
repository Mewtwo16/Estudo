/*
    Introdução a Linguagem C
        Tipagem forte
        Não tem orientação a objetos
        Linguagem de programação estruturada, procedimental e imperativa
*/ 

// Inclui biblotecas e arquivos para serem utilizados no projeto
#include <stdio.h>


// Função main
int main(){

    // Variaveis em C
    int idade, menu; // inteiro
    float nota1, nota2; // Float
    double media; // outra forma de float
    // Não existe o tipo string em C
    // char pode receber numeros char a = 97 vai ser igual a letra A e vai ser impresso isso
    // Sempre finalizão com \0 então em 50 posicões so podem ser utilizado 49
    char nome[50]; // Tipo characteres [defini o tamanho do array de caracteres]
    printf("Qual seu nome?\n");
    gets(nome); // Forma de receber dados do teclado
    // Tambem não existe tipo boolean na linguagem C
    // 0 = false e qualquer coisa diferente é verdadeiro
    // pode se usar #include <stdbool.h> para utilização de tipos booleanos

    /*
        Operadores aritimeticas: 
        + soma
        - subtração
        * multiplicação
        / divisão
        % Resto/modulo

        Conseguimos fazer um cast (float), que faz a operação como se fosse float
    */
    
    // Saida padrão no console
    printf("%s Qual usa idade?\n", nome);
    // Entrada padrão
    scanf("%d", &idade);
    // saida de valores recebidos
    printf("Idade: %d, Recebida com suscesso\n", idade);
    printf("Deseja ver sua faixa etaria? \n1-Sim \n2-Não \n");
    scanf("%d", &menu);

    // Estrutura de descisão: 
    // switch-case
    switch (menu){
        case 1:
            // if-else
            if(idade < 18){
                printf("Você é menor de idade");
            } else if(idade > 18 && idade < 60){
                printf("Voce é um adulto");
            } else if(idade > 60){
                printf("Voce é um idoso");
            } else{
                printf("Idade não identificada, Humano???");
            };
            break;
        case 2: 
            printf("Saindo do programa...");
            break;
        default:
            printf("Opção invalida! Encerrando...");
            break;
    }

    // Função main sempre retorna um inteiro
    return 0;
}