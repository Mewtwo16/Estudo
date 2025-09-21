/*
    Objetivo: Entender array/vetores
    Oque é: Um array armazena variaveis ou posições do mesmo tipo
    podem ser unidirecional ou bidirecional

    haverá dois exemplo no codigo o classico c-style e o moderno utilizando std::vector
*/

#include <iostream>
#include <string>

#include <vector> // Incluímos o cabeçalho para o std::vetor

int main(){

    // C-style

    // Declaração de um vetor
    // o Índice começa em 0
    int vetor[5];
    int i{};

    /* 
    Poderia criar uma variavel com um tamanho exemplo: 
    int tam=5;
    int vetor[5];
     Desta forma saberia o tamanho do array
    */

    vetor[0]=10;
    vetor[1]=20;
    vetor[2]=30;
    vetor[3]=40;
    vetor[4]=50;
    // se eu tentar declarar vetor[5] como não faz parte do tamanho do nosso array
    // ele iria pegar lixo da memoria causando erro em varios casos fatais

    std::cout << "Vetor 0 = " << vetor[0] << "\n";

    std::cout << "--------------------\n";

    // Um forma de contar os vetores
    for(i=0; i<5; i++){
        std::cout << "Teste do contador " << vetor[i] << "\n";
    }

    std::cout << "--------------------\n";

    // Podemos utilizar a função sizeof util para quando a variavel muda de tamanho
    // a Função sizeof retorna o tamanho do tipo em bytes(um inteiro tem o tamanho de 4 bytes)
    for(i=0; i<sizeof(vetor)/4; i++){
        std::cout << "Teste do sizeof " << vetor[i] << "\n";
    }

    std::cout << "--------------------\n";

    /*---------------------------------------------------------*/

    // C++ Moderno

    std::vector<int> vetor1 = {10, 20, 30, 40, 50};

    // Acessando um elemento (a sintaxe com [] é a mesma)
    std::cout << "O primeiro elemento e: " << vetor1[0] << "\n\n";

    // 3. A forma MODERNA e PREFERIDA de percorrer uma coleção
    // Leia-se: "Para cada 'numero' DENTRO de 'vetor'..."
    std::cout << "Iterando com o range-based for:\n";
    for (int numero : vetor1) {
        std::cout << numero << "\n";
    }

    // 4. Se você ainda precisar do for clássico, ele fica mais seguro
    // usando o método .size(), que sempre retorna o tamanho correto.
    std::cout << "\nIterando com o for classico e .size():\n";
    for (int i = 0; i < vetor1.size(); i++) {
        std::cout << vetor1[i] << "\n";
    }

    // 5. Flexibilidade: Adicionando um novo elemento!
    // Impossível com o array C-style, trivial com o vector.
    vetor1.push_back(60);
    std::cout << "\nDepois de adicionar 60, o ultimo elemento e: " << vetor1[5] << "\n";
    std::cout << "E o novo tamanho e: " << vetor1.size() << "\n";

    /*
                // --- Capacidade ---
        vetor.size();           // Retorna o número de elementos que estão atualmente no vetor.
        vetor.empty();          // Retorna 'true' se o vetor estiver vazio, 'false' caso contrário.
        vetor.capacity();       // Retorna quantos elementos o vetor pode guardar antes de precisar de mais memória.
        vetor.reserve(100);     // Aloca memória para pelo menos 100 elementos de uma vez. (Otimização)
        vetor.clear();          // Remove TODOS os elementos do vetor, o tamanho se torna 0.
        vetor.resize(10);       // Altera o tamanho para 10 (adiciona ou remove elementos do final).


        // --- Acesso a Elementos ---
        vetor[5];               // Acesso rápido (inseguro) ao elemento no índice 5.
        vetor.at(5);            // Acesso seguro (verificado) ao elemento no índice 5. Lança erro se inválido.
        vetor.front();          // Retorna uma referência ao primeiro elemento.
        vetor.back();           // Retorna uma referência ao último elemento.
        vetor.data();           // Retorna um ponteiro C-style para o início dos dados do vetor.


        // --- Modificadores (alteram o vetor) ---
        vetor.push_back(valor);   // Adiciona um novo elemento no FINAL do vetor. (O mais comum)
        vetor.pop_back();         // Remove o último elemento do vetor.
        vetor.insert(it, valor);  // Insere um 'valor' ANTES da posição indicada pelo iterador 'it'.
        vetor.erase(it);          // Remove o elemento na posição do iterador 'it'.
        vetor.erase(it_inicio, it_fim); // Remove um intervalo de elementos.


        // --- Iteradores (para percorrer o vetor) ---
        vetor.begin();          // Retorna um iterador que aponta para o PRIMEIRO elemento.
        vetor.end();            // Retorna um iterador que aponta para DEPOIS do ÚLTIMO elemento.
    */


    return 0;
}

