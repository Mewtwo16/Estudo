/*
    objetivo: Comando for
*/

#include <iostream>
#include <string>

int main(){

    int x{};
    int y{};
    int z{};

    // sintaxe do comando:
    //for(inicializacão ; Condição ; atualização (incremento ou decremento))
     for(x = 0; x <= 10 ; x++){
        std::cout << x << "\n";
    }

    // pode se ter mais de 1 variaveis, condição e atualização
    for(x = 0, y = 1, z = 0 ; x <= 10 && z <= 6 ; x++, y+=2, z+=2){
        std::cout << x << " - " << y << " - " << z << "\n";
    }

    // outra utilização, sem bloco de comandos, não normalmente utilizado

    for(in tmp=0; tmp < 1000 ; tmp++);



    return 0;
}