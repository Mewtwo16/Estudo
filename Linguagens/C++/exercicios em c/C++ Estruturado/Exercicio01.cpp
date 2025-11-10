/*
    Objetivo: Conversor canivete
*/

#include <iostream>
#include <string>

int main(){

    // variavel de controle do menu
    int opcao{};
    // Bloco principal do sistema(serve para exibir o menu)
    do{
        //menu
        std::cout << "\n--- Mini Conversor Universal ---\n";
        std::cout << "1. Celsius para Fahrenheit\n";
        std::cout << "2. Real (BRL) para Dólar (USD)\n";
        std::cout << "3. Quilômetros para Milhas\n";
        std::cout << "4. Sair\n";
        std::cout << "\nSelecione uma opção: ";
        std::cin >> opcao;

        // bloco de controle do menu
        switch(opcao){
            
            case 1:{
                int opTemp{};
                std::cout << "\nVoce gostaria de converter Celsius ou Fahrenheit? \n";
                std::cout << "[1] Celcius para fahrenheit\n";
                std::cout << "[2] Fahrenheit para celcius\n";
                std::cin >> opTemp;

                // Condições do controle de temperatura
                if (opTemp == 1)
                {
                    int celcius{};   
                    std::cout << "Digite o valor em celcius: ";
                    std::cin >> celcius;
                    const float tempFinal = (celcius * 1.8) + 32;
                    std::cout << "\nConvertendo...\n";
                    std::cout << "\nA temperatura é " << tempFinal << " Fahrenheit\n";
                } else if(opTemp == 2){
                    int fahrenheit{};   
                    std::cout << "\nDigite o valor em fahrenheit: ";
                    std::cin >> fahrenheit;
                    const float tempFinal = (fahrenheit - 32) / 1.8;
                    std::cout << "\nConvertendo...\n";
                    std::cout << "\n A temperatura é " << tempFinal << " Celcius\n";
                } else{
                    std::cout << "\nOpção invalida!\n";
                }
                break;
                }
            //Condições do controle de valores
            case 2:{
                int dinDin{};
                std::cout << "\nVoce gostaria de converter real ou dolar?\n";
                std::cout << "[1] Real para dolar\n";
                std::cout << "[2] Dolar para real\n";
                std::cin >> dinDin;
                
                if(dinDin == 1){
                    float real{};
                    std::cout << "\nDigite o valor em real: ";
                    std::cin >> real;
                    const float dinFinal = real * 5.49;
                    const std::string res = (dinFinal == 1) ? " Dolar" : " Dolares";
                    std::cout << "\nConvertendo...\n";
                    std::cout << "\n O valor convertido é " << dinFinal << res << "\n";
                }else if(dinDin == 2){
                    float dolar{};
                    std::cout << "\nDigite o valor em dolar: ";
                    std::cin >> dolar;
                    const float dinFinal = dolar / 5.49;
                    const std::string res = (dinFinal == 1) ? " Real" : " Reais";
                    std::cout << "\nConvertendo...\n";
                    std::cout << "\n O valor convertido é " << dinFinal << res <<"\n";
                }else{
                    std::cout << "Opção invalida!...";
                }
                break;}
            // Condição do controle de distancias
            case 3:{
                int opDistancia{};
                std::cout << "\nVoce gostaria de converter quilometros ou milhas?\n";
                std::cout << "[1] Km para milhas\n";
                std::cout << "[2] Milhas para Km\n";
                std::cin >> opDistancia;
                
                if(opDistancia == 1){
                    float km{};
                    std::cout << "\nDigite os quilometros: ";
                    std::cin >> km;
                    const float distFinal = km * 0.62137;
                    const std::string res = (distFinal == 1) ? " milha" : " milhas";
                    std::cout << "\nConvertendo...\n";
                    std::cout << "\n A distancia em" << res << " é " << distFinal << "\n";
                }else if(opDistancia == 2){
                    float milhas{};
                    std::cout << "\nDigite as milhas: ";
                    std::cin >> milhas;
                    const float distFinal = milhas / 0.62137;
                    const std::string res = (distFinal == 1) ? " quilometro" : " quilometros";
                    std::cout << "\nConvertendo...\n";
                    std::cout << "\n A distancia em" << res << " é " << distFinal << "\n";
                }else{
                    std::cout << "Opção invalida!...";
                }
                break;}
            // Finaliza o programa
            case 4:{
                std::cout << "saindo do programa...";
                break;}

            // Default em caso de opção invalida
            default:
                std::cout << "Opção invalida";
                break;

        }
        


    } while(opcao != 4);


    return 0;
}


// Segue a correção: 


/*

#include <iostream>
#include <string>

// 1. Constantes declaradas no topo com constexpr
constexpr double FATOR_CELSIUS_MULT = 1.8;
constexpr int FATOR_CELSIUS_SOMA = 32;
constexpr double TAXA_DOLAR = 5.49;
constexpr double FATOR_KM_MILHA = 0.62137;

int main() {
    int opcao{};
    do {
        std::cout << "\n--- Mini Conversor Universal ---\n";
        // ... (menu igual ao seu) ...
        std::cout << "\nSelecione uma opcao: ";
        std::cin >> opcao;

        switch (opcao) {
            case 1: {
                // ... (seu código de temperatura estava ótimo) ...
                break;
            }
            case 2: {
                int dinDin{};
                std::cout << "\nVoce gostaria de converter real ou dolar?\n";
                // ... (submenu de moeda) ...
                std::cin >> dinDin;

                if (dinDin == 1) {
                    float real{};
                    std::cout << "\nDigite o valor em real: ";
                    std::cin >> real;
                    const float dinFinal = real / TAXA_DOLAR; // Usando a constante
                    // 2. Testando a variável de entrada, não o resultado float
                    const std::string res = (real == 1.0f) ? " Dolar" : " Dolares";
                    std::cout << "\nConvertendo...\n";
                    // 3. Usando a variável 'res' na saída
                    std::cout << "\n O valor convertido e " << dinFinal << res << "\n";
                } else if (dinDin == 2) {
                    float dolar{};
                    std::cout << "\nDigite o valor em dolar: ";
                    std::cin >> dolar;
                    const float dinFinal = dolar * TAXA_DOLAR; // Usando a constante
                    const std::string res = (dinFinal == 1.0f) ? " Real" : " Reais"; // Teste mais seguro (ainda não ideal, mas melhor)
                    std::cout << "\nConvertendo...\n";
                    std::cout << "\n O valor convertido e " << dinFinal << res << "\n";
                } else {
                    std::cout << "Opcao invalida!...\n";
                }
                break;
            }
            // ... (restante do código) ...
        }
    } while (opcao != 4);

    return 0;
}

*/