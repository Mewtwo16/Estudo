/*
    A notação Big O é uma forma de descrever a complexidade de um algoritmo
    em termos de tempo de execução ou uso de espaço em relação ao tamanho da entrada.

    O(1) = Constante - o tempo de execução não muda com o tamanho da entrada
    O(n) = Linear - o tempo de execução cresce proporcionalmente ao tamanho da entrada
    O(n^2) = Quadrática - Um dos piores casos para algoritmos simples de ordenação
    O(log n) = Logarítmica - muito eficiente para grandes conjuntos de dados
    O(n log n) = Linearítmica - um tempo de execução eficiente para muitos algoritmos de ordenação
    O(2^n) = Exponencial - crescimento muito rápido, comum em algoritmos de força bruta
    O(n!) = Fatorial - crescimento extremamente rápido, geralmente inviável para grandes entradas
*/

#include <iostream>
#include <vector>
#include <string>

int soma(int n);

int main(){

    // Exemplo de O(1) - Um acesso direto, uma atribuição ou uma operação aritmética são constantes
    std::vector<int> vec1 = {1, 2, 3, 4, 5}; // Atribuição
    std::cout << "Acesso direto: " << vec1[2] << std::endl; // Acesso direto
    int somar = vec1[0] + vec1[1]; // Operação aritmética
    std::cout << "Soma: " << somar << std::endl;

    // Exemplo de O(n) - Um loop que percorre todos os elementos de um vetor
    // Este é um loop linear, pois o tempo de execução cresce proporcionalmente ao tamanho da entrada n.
    std::cout << "Soma de 0 a 9: " << soma(10) << std::endl; 

}

// Função O(n) - Soma os números de 0 a n-1
int soma(int n) {
    int total = 0;
    for (int i = 0; i < n; ++i) {
        total += i;
    }
    return total;
}





