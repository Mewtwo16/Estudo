/*
    objetivo: Estudo sobre matrizes
    São arrays bidimensionais
*/

#include <iostream>
#include <vector>

int main(){

    
        // Forma classica
        int classico[3][4];
        int l{};
        int c{};
        // Declaração
        classico[0][0]=0;
        classico[0][1]=0;
        classico[0][2]=0;
        classico[0][3]=0;

        classico[1][0]=1;
        classico[1][1]=1;
        classico[1][2]=1;
        classico[1][3]=1;

        classico[2][0]=2;
        classico[2][1]=2;
        classico[2][2]=2;
        classico[2][3]=2;

/*
        for(l=0; l<3; l++){
            for(c=0; c<4; c++){
                // posso utilizar o cin para adicionar valores via input
                std::cout << classico[l][c] << " ";
            }
            std::cout << "\n";
        };
*/

    

    //forma moderna de matriz
    std::vector<std::vector<int>> matriz = {
        {0, 0, 0, 0},
        {1, 1, 1, 1},
        {2, 2, 2, 2}
    };

    // em ranged based for podemos utilizar a expressão da seguinte forma:
    // A sintaxe for (const auto& linhas : matriz) pode ser lida como: "Para cada linha DENTRO DA matriz
    // Auto& onde auto serve para o compilador deduzir o tipo de variavel automaticamente 
    // & é uma referencia que aponta para o valor original
    // usar o consta para declarar a variavel de referencia como constante serve para não alterar o array por acidente
    for(const auto& linhas : matriz){
        // para cada linha dentro da matriz, ele ira verificar para cada coluna dentro das linhas
        for(const auto& colunas : linhas){
            // e então ira imprimir cada coluna que há em cada linha
            std::cout << colunas << " ";
        }
        std::cout << "\n";
    }

    // Declarando uma matriz 3x4 preenchida com zeros
    int num_linhas = 3;
    int num_colunas = 4;
    std::vector<std::vector<int>> outra_matriz(num_linhas, std::vector<int>(num_colunas, 0));

    return 0;
}