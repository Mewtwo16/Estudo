/*
    Exercicio de nivel avançado
    Objetivo: Criar um Jogo de turno onde o Heroi e o vilão realizem ações de ataque e defesa
    Bonus: 1 - O heroi deve ter uma habilidade statusFuria que faz varios ataques seguidos
    2 - Atraves dos argumentos de main, poder escolher o nome do heroi
*/

#include <iostream>
#include <vector>
#include <string>
#include <random>
#include <ctime>
// Biblioteca para gerenciar threads sequencias de execução do programa
#include <thread>
// Biblioteca para controlar tempo pode ser segundos ou millisegundos
#include <chrono>

enum class EstadoBatalha { EmAndamento, VitoriaHeroi, VitoriaMonstro };
enum class AcaoJogador { Atacar, Defender, UsarPocao, Furia, Invalida };

void exibirStatus(const std::string& nome, const int& hp_heroi, const int& hp_vilao, const int& statusFuria);
AcaoJogador escolhaHeroi();
void acaoHeroi(int& hp_vilao, int& hp_heroi, int& pocao, int& statusFuria, bool& defendendo);
void ataqueFuria(int& furia, int& hp_Vilao);
void turnoVilao(int& hp_heroi, bool& defendendo);
int gerarNumeroAleatorio(int min, int max);

int main(int argc, char* argv[]){

    // Verificandos e o programa está recendo os argumentos corretos
    if(argc != 2){
        std::cout << "\nNa inicializacao do jogo escolha um nome para seu heroi!\n\n";
        return 1;
    }
    
    // Declarando as variaveis do jogo
    int potion = 2;
    int heroiHP = 100;
    int vilaoHP = 80;
    int statusFuria = 0;
    bool estadoHeroi = false;
    // Valida menus e submenus
    int menu{};
    int subMenu{};
    // Variavel de controle de fluxo da batalha
    EstadoBatalha estado_atual = EstadoBatalha::EmAndamento;

    // Armazena o nome do heroi em uma string
    std::string nomeHeroi = argv[1];
    
    // Loop principal do menu
    do{
        system("cls");

        std::cout << "\nUm heroi nasceu...\n" << "E seu nome e " << nomeHeroi;
        //execução da função para controlar tempo = std::this_thread::sleep_for(std::chrono::seconds(2));
        std::this_thread::sleep_for(std::chrono::seconds(2));
        std::cout << "\nUm monstro aparece...\n";
        std::this_thread::sleep_for(std::chrono::seconds(2));
        std::cout << "\n\nDeseja iniciar a batalha?\n" << "[1] Sim\n" << "[2] Nao\n" << "Escolha: " << "\n";
        std::cin >> menu;
        std::this_thread::sleep_for(std::chrono::milliseconds(500));

        // Validação do menu
        if(menu == 1){
            std::cout << "\n\nIniciando a batalha!\n\n";
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
            std::cout << "Os status iniciais sao: ";
        } else if(menu == 2){
            std::cout << "Saindo do jogo";
            std::this_thread::sleep_for(std::chrono::milliseconds(300));
            std::cout << ".";
            std::this_thread::sleep_for(std::chrono::milliseconds(300));
            std::cout << ".";
            std::this_thread::sleep_for(std::chrono::milliseconds(300));
            std::cout << ".";
            system("cls")
            return 0;
        } else{
            std::cout << "Opcao invalida, digite um valor valido";
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
            return 1;
        }

        // Loop onde o jogo ocorre
        while(estado_atual == EstadoBatalha::EmAndamento){
            
            exibirStatus(nomeHeroi,heroiHP,vilaoHP,statusFuria);
            std::this_thread::sleep_for(std::chrono::seconds(1));

            std::cout << "\n\nO heroi realiza uma acao";
            acaoHeroi(vilaoHP,heroiHP,potion,statusFuria,estadoHeroi);
            if (vilaoHP <= 0){
            estado_atual = EstadoBatalha::VitoriaHeroi;
            continue;
            }

            std::this_thread::sleep_for(std::chrono::milliseconds(500));

            std::cout << "Inicia o turno do vilao\n";
            turnoVilao(heroiHP,estadoHeroi);
            if(heroiHP <= 0){  
            estado_atual = EstadoBatalha::VitoriaMonstro;
            }

            // Reseta status do heroi
            estadoHeroi = false;
            std::this_thread::sleep_for(std::chrono::milliseconds(200));

        }
    if(estado_atual == EstadoBatalha::VitoriaHeroi){
                std::cout << "\n\nParabens o heroi " << nomeHeroi << " venceu a batalha!\n\n";
                std::this_thread::sleep_for(std::chrono::seconds(1));
                std::cout << nomeHeroi << " Voce tornou o mundo mais seguro, continue derrotando monstros e chegue ao Rei demonio!";
                std::this_thread::sleep_for(std::chrono::seconds(1));
            }else if(estado_atual == EstadoBatalha::VitoriaMonstro){
                std::cout << "Oh\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(200));
                std::cout << ".\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(200));
                std::cout << ".\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(200));
                std::cout << ".\n";
                std::cout << "\nO heroi sucumbiu as forças malignas!\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(1000));
            }else{
                std::cout << "\n\nProxima rodada\n\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
            }
    }while(menu != 2);
return 0;
};

// Fução exibe status
void exibirStatus(const std::string& nome, const int& hp_heroi, const int& hp_vilao, const int& statusFuria){
    std::cout << "Hp atual do heroi " << nome <<  " sao = " << hp_heroi << "\n";
    std::cout << "statusFuria atual do heroi = " << statusFuria << "\n";
    std::cout << "HP atual do Vilao = " << hp_vilao << "\n";
}

AcaoJogador escolhaHeroi(){
    int acao{};
    std::cout << "\nO heroi escolhe: \n";
    std::this_thread::sleep_for(std::chrono::milliseconds(200));
    std::cout << "[1] Atacar\n" << "[2] Defender\n" << "[3] Usar pocao\n" << "[4] Habilidade: Furia\n";
    std::cout << "Escolha: " << "\n";
    std::cin >> acao;
    switch (acao){
        case 1:
            return AcaoJogador::Atacar;
        case 2:
            return AcaoJogador::Defender;
        case 3:
            return AcaoJogador::UsarPocao;
        case 4:
            return AcaoJogador::Furia;
        default:
            return AcaoJogador::Invalida;
    }
}

// Fução ação do heroi
void acaoHeroi(int& hp_vilao, int& hp_heroi, int& pocao, int& statusFuria, bool& defendendo){
    AcaoJogador acao_escolhida = escolhaHeroi();
    switch(acao_escolhida){
        case AcaoJogador::Atacar: {
            std::cout << "\nO heroi realiza o seu ataque\n";
            const int dano = gerarNumeroAleatorio(15,25);
            std::cout << "O heroi causou " << dano << " na vida do vilao\n";
            hp_vilao -= dano;
            std::this_thread::sleep_for(std::chrono::milliseconds(200));
            std::cout << "O ataque do heroi gerou 1 de Furia\n";
            std::this_thread::sleep_for(std::chrono::milliseconds(200));
            statusFuria++;
            break;
        }
        case AcaoJogador::Defender:{
            std::cout << "O heroi entra na postura defensiva e bloqueia 50% de todo o dano\n";
            std::cout << "A defesa do heroi gerou 1 de Furia\n";
            defendendo = true;
            statusFuria++;
            std::this_thread::sleep_for(std::chrono::milliseconds(200));
            break;
        }
        case AcaoJogador::UsarPocao:{
            std::cout << "\nO Jogador escolheu utilizar a pocao\n";
            if(pocao > 0){
                std::cout << "O jogador se curou!\n";
                hp_heroi += 30;
                pocao--;
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
            } else{
                std::cout << "O jogador nao tem mais pocoes\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
            }
            break;
        }
        case AcaoJogador::Furia:{
            if(statusFuria <= 3){
                ataqueFuria(hp_vilao,statusFuria);
            } else{
                std::cout << "\n\nO Jogador nao tem furia o suficiente para realizar esta acao\n\n";
            }
            break;
        }
        default:
        std::cout << "\nEstá não é uma opção valida!\n" << "\nVoce perdeu seu turno!\n";
        break;
    }
}

void ataqueFuria(int& hp_vilao, int& furia){
    std::cout << "\nO Jogador realiza um ataque de furia!\n";
    if(furia >= 3){
        std::cout << "Ataques restantes: " << furia << "\n";
        const int dano = gerarNumeroAleatorio(15,25);
        hp_vilao -= dano;
        furia--;
        ataqueFuria(hp_vilao, furia);
    }
}

// Fução ação do vilão
void turnoVilao(int& hp_heroi, bool& defendendo){
    const int dano = gerarNumeroAleatorio(10,20);
    int danoFinal = dano;
    if(defendendo){
        danoFinal = dano / 2;
        std::cout << "\n\nO vilao realiza uma acao\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        std::cout << "O vilao se prepara seu ataque\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        std::cout << "\nO vilao causou " << danoFinal << " dano no heroi\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        hp_heroi -= danoFinal;
    } else{
        std::cout << "\n\nO vilao realiza uma acao\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        std::cout << "O vilao se prepara seu ataque\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        std::cout << "\nO vilao causou " << danoFinal << " dano no heroi\n";
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        hp_heroi -= danoFinal;
    }
}

// Fução para gerar numero aleatorio
int gerarNumeroAleatorio(int min, int max) {
    // 'mt19937' é um gerador de números aleatórios de alta qualidade.
    // 'time(0)' usa a hora atual como semente para garantir que os números sejam diferentes a cada execução.
    static std::mt19937 gerador(time(0)); 
    std::uniform_int_distribution<> distribuicao(min, max);
    return distribuicao(gerador);
};