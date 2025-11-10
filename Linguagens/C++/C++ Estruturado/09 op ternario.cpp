/*
    Objetivo: Operadores ternarios
    Descrição: Faz verificações mais simples do que o if-else é mais rapido, porem limitado
*/

#include <iostream>
#include <string>

int main(){

    // condição ? valor_se_verdadeiro : valor_se_falso;


    int n1{};
    std::cout << "Digite o valor da segunda nota: ";
    std::cin >> n1;
    int n2{};
    std::cout << "Digite o valor da segunda nota: ";
    std::cin >> n2;

    const int nota = n1 + n2;
    // inicializando a variavel com o operador ternario para verificar o valor dela
    const std::string res = (nota >= 60) ? "Aprovado" : "Reprovado";

    std::cout << "\nSituacao do aluno: " << res << "\n";


    return 0;
}