
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "stack.h"

// 1. Crie a pilha com sizeof(double)
    // 2. Use strtok para pegar palavra por palavra
    // 3. Se for numero -> malloc double -> push
    // 4. Se for op -> pop -> pop -> calcula -> malloc double -> push
    // 5. No fim, pop no resultado, free na pilha e return


// IMPLEMENTE AQUI EMBAIXO (Ou num arquivo separado rpn.c)
double avaliar_rpn(char* expressao) {
    
    Stack *rpn = stack_create(sizeof(double));
    char *token = strtok(expressao, " ");;
    double a, b, n, resultado;

    while (token != NULL){
        printf("Entrou no while\n"); 

        if(strcmp(token, "+") == 0){
            printf("Achou operador +\n");
            a = *(double*)stack_pop(rpn);
            b = *(double*)stack_pop(rpn);
            resultado = b + a;
            stack_push(rpn, &resultado);
        }else if(strcmp(token, "-") == 0){
            printf("Achou operador -\n");
            a = *(double*)stack_pop(rpn);
            b = *(double*)stack_pop(rpn);
            resultado = b - a;
            stack_push(rpn, &resultado);
        }else if(strcmp(token, "*") == 0){
            printf("Achou operador *\n");
            a = *(double*)stack_pop(rpn);
            b = *(double*)stack_pop(rpn);
            resultado = b * a;
            stack_push(rpn, &resultado);
        }else if(strcmp(token, "/") == 0){
            printf("Achou operador /\n");
            a = *(double*)stack_pop(rpn);
            b = *(double*)stack_pop(rpn);
            resultado = b / a;
            stack_push(rpn, &resultado);
        }else{
            printf("Achou numero\n");
            n = atof(token);
            stack_push(rpn, &n);
        }

        token = strtok(NULL, " ");
        
    }

    double final = *(double*)stack_pop(rpn);
    stack_free(rpn);

    return final;
    
}