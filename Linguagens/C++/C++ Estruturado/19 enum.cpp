/*
    objetivo: Estudo de enum
*/

#include <iostream>
#include <string>

int main(){

    // O valor dos itens em um enum é sequencial
    // Ou pode ser definido valores para cada item
    enum armas{Fuzil = 100, 
        revolver = 8, 
        rifle = 12, 
        escopeta = 1 
    };

    // criando uma variavel com o enum
    armas armaSel;

    armaSel = Fuzil;

    std::cout << armaSel;


    return 0;
}



