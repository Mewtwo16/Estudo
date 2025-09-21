/*
    Objetivo: Estudo de operadores logicos
*/

#include <iostream>

using namespace std;

int main(){

    int num{};


    num = 12;


    // logica de And (Neste bloco retorna false, pois um dos valores é falso)
    if(num > 4 && num < 7){
        cout << "\n\nValor aceito\n";
    } else{
        cout << "\n\nValor recusado\n";
    }

    //Logica de or (neste bloco retorna true, pois um dos valores é verdadeiro)
     if(num > 4 || num < 7){
        cout << "\n\nValor aceito.\n";
    } else{
        cout << "\n\nValor recusado.\n";
    }

    if( (num >= 3 && num <= 6 ) || (num > 9 && num < 15) || (num > 15 && num < 20)){
        cout << "\n\nValor aceito.\n";
    } else{
        cout << "\n\nValor recusado.\n";
    }

    // 0 = falso
    // 1 = verdadeiro
    num = 1;

    // Logica de not
    // se num for verdadeiro = falso(valor recusado) se num for falso = verdadeiro(valor aceito)
    if(!num){
        cout << "\n\nValor aceito.\n";
    } else{
        cout << "\n\nValor recusado.\n";
    }
    

 return 0;
}
