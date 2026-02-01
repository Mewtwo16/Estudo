#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "rpn.h"

// Protótipo da sua função
double avaliar_rpn(char* expressao);

int main() {
    // Expressão: (10 + 2) * 3 - 4
    // Em RPN: "10 2 + 3 * 4 -"
    char expressao[] = "10 2 + 3 * 4 -"; 
    
    printf("Expressao: %s\n", expressao);
    
    double resultado = avaliar_rpn(expressao);
    
    printf("Resultado esperado: 32.00\n");
    printf("Seu resultado: %.2f\n", resultado);

    if(resultado == 32.0) {
        printf("SUCESSO! 🚀\n");
    } else {
        printf("ERRO NO CALCULO.\n");
    }

    return 0;
}

