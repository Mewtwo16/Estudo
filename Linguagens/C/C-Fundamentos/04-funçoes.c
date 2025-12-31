#include <stdio.h>

// Prototipando funções
void imprime();
int soma(int x, int y);

int main(){


    imprime();

    int resultado = soma(10, 20);
    printf("%d \n", resultado);


    return 0;

};



// Delcarando as funções
void imprime(){
    printf("Olá mundo\n");
};

int soma( int x, int y){
    if(!x){
        printf("O primeiro valor não pode estár vazio!");
    }else if(!y){
        printf("O segundo valor não pode estár vazio!");
    } else{
        return x + y;
    };
}