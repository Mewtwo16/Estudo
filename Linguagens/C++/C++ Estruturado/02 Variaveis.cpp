/*
    Objetivo: Estudo de variaveis
    As variaveis guardam um valor na memoria do computador
*/

#include <iostream>

using namespace std;

// Variaveis Globais, podem ser acessadas em todas as funções
int n1,n2;

int main(){


    // Variaveis locais, só podem ser acessadas dentro do main
    //Variaveis sem declaração
    int numero; // tipo inteiro recebe numeros inteiros
    char letra; // tipo texto recebe 1 caracter exemplo "B" pode ser aumentado a quantidades de caracteres utilizando um vetor(array) maximo de 20
    double decimal1; // tipo que aceita numeros decimais maior precisão ex 2.4999999
    float decimal2; // igual double porem com menos precisão ex 2.49
    bool vivo = true; // verdadeiro ou falso true=verdadeiro --- false = falso
    string nome; //Recebe textos maiores do que char propria para textos

    //declarando/iniciando as variaveis
    cout << "Digite um numero inteiro: ";
    cin >> numero;
    cout << "Digite uma letra: ";
    cin >> letra;
    cout << "Digite um numero decimal: ";
    cin >> decimal1;
    cout << "Digite outro numero decimal: ";
    cin >> decimal2;
    cout << "Digite seu nome: ";
    cin >> nome;

    cout << numero << "\n" << letra << "\n" << decimal1 << "\n" << decimal2 << "\n" << vivo << "\n" << nome << "\n";


    int num1, num2, num3;

    // utilização de variaveis com printf
    printf("O Valor da variavel num são: 1-%d 2-%d 3-%d", num1,num2,num3)
    



    return 0;
}

