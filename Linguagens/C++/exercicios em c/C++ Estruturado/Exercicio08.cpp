/*
    Objetivo: Simulação de lista de produção
*/

#include <string>
#include <iostream>
#include <stack>
#include <queue>
#include <vector>
#include <chrono>
#include <thread>
#include <algorithm>

// enum para criar os estados das peças
enum class statusPeca{pendente, nova, aprovada, rejeitada};
// objeto struct para as peças
struct pecas{
    int idPecas{};
    std::string descricao;
    statusPeca status;

    // Função para traduzir o enum class em string para exibir o estado atual da peça de forma correta.
    std::string traduzStatus() const{
        switch(status){
            case statusPeca::pendente:
                return "Pendente";
            case statusPeca::nova:
                return "Nova";
            case statusPeca::aprovada:
                return "Aprovada";
            case statusPeca::rejeitada:
                return "Rejeitado";
            default:
                return "Desconhecido";
        }
    }
    // Função para exibir as peças
    void exibir() const{
        std::cout << "\nID da peça - " << idPecas;
        std::cout << "\nDescrição - " << descricao;
    }
};

void adicionarPecas(std::queue<pecas>& lista);
void listarPecas(const std::vector<pecas>& lista);
void processaPeca(std::queue<pecas>& processa, std::stack<pecas>& inspecao);
void inspecionaPeca(std::stack<pecas>& inspecao, std::vector<pecas>& addPeca);

// Bloco main
int main(){
    // Declaração de variaveis e criação das coleções
    std::vector<pecas> pecasFinal;
    std::stack<pecas> inspecao;
    std::queue<pecas> processamento;
    int menu;


    std::cout << "\n\n==========Bem vindo!==========\n\n" << "    Gerenciador de peças!\n\n";
    std::cout << "==============================";
    std::this_thread::sleep_for(std::chrono::seconds(1));

    // Bloco DO-While principal (menu)
    do{ 
        std::cout << "\n\nMenu inicial: \n\n";
        std::cout << "[1] Adicionar nova peça\n" << "[2] Listar peças e seus status\n" << "[3] Processar proxima peça\n" << "[4] Inspecionar peças\n" << "[5] Sair\n";
        std::cout << "\nEscolha a ação desejada: \n\n";
        std::cout << "==============================\n\n";
        std::cin >> menu;
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');

        // Bloco if para tornar o menu fluido
        if(menu != 5){
            std::cout << "\nCarregando opção escolhida";
            for(int i = 0; i<3; i++){
            std::cout << ".";
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
            }
            std::cout << "\n";
        }

        // BLoco switch case do menu
        switch (menu){
            // Adicionar peças
            case 1:{
                std::cout << "========Adicionar peças========";
                adicionarPecas(processamento);
                break;
            }
            // Listar peças
            case 2:{
                std::cout << "=======================================";    
                int subMenu{};
                std::cout << "\n\nListar proxima peça em processamento ou inspeção. Verificar lista de todas as peças finalizadas!";
                std::cout << "\n [1]Processamento\n [2]Inspeção\n [3]Finalizadas\n" << "Qual deseja listar: ";
                std::cin >> subMenu;
                // \/ Utilizar em leituras com o std::cin para limpar o buffer dos enters esquecidos
                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                if(subMenu == 1){
                    if(processamento.empty()){
                        std::cout << "\nNão há itens na lista de processamento!\n";
                    }else{
                        processamento.front().exibir();
                        std::cout << "\nStatus = pendente";
                    }
                }else if(subMenu == 2){
                    if(inspecao.empty()){
                        std::cout << "\nNão há itens na lista de inspeção!\n";
                    }else{
                        inspecao.top().exibir();
                        std::cout << "\nStatus = Nova";
                    }
                }else if(subMenu == 3){
                    listarPecas(pecasFinal);
                }else{
                    std::cout << "Opção invalida!\n";
                }
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
                break;
            }
            // Processar peças
            case 3:{
                std::cout << "=======Processar peças========";
                if(processamento.empty()){
                    int menuPr{};
                    std::cout << "\nA fila de processamento está vazia!\n";
                    std::cout << "Deseja adicionar uma nova peça para processamento?\n" << "[1]Sim\n" <<"[2]Não\n" << "Escolha: ";
                    std::cin >> menuPr;
                    std::this_thread::sleep_for(std::chrono::milliseconds(500));
                    switch(menuPr){
                        case 1:
                            std::cout << "\n\nDirecinando a tela de cadastro de produto";
                            for(int i = 0; i<3; i++){
                                std::cout << ".";
                                std::this_thread::sleep_for(std::chrono::milliseconds(250));
                            }
                            adicionarPecas(processamento);
                            break;
                        case 2:
                            std::cout << "\nVoltando ao menu inicial!";
                            for(int i = 0; i<3; i++){
                                std::cout << ".";
                                std::this_thread::sleep_for(std::chrono::milliseconds(250));
                            }
                            break;
                    }
                }else{
                    std::cout << "\n\nIniciando o processamento das peças!\n\n";
                    std::this_thread::sleep_for(std::chrono::milliseconds(500));
                    processaPeca(processamento, inspecao);
                }

                break;
            }
            // Inspecionar peças
            case 4:{
                std::cout << "=======inspeciona peças=======";
                if(inspecao.empty()){
                    std::cout << "\n\nA fila de inspeção esta vazia\n\n"; 
                }else{ 
                    inspecionaPeca(inspecao, pecasFinal);
                }

                break;
            }
            case 5:{
                std::cout << "\nObrigado por utilizar nossos sistemas!\n\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
                std::cout << "\nSaindo!\n";
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
                break;
            }
            default:{
                std::cout << "\nOpção invalida!\n";
                break;
            }
        }
    }while(menu != 5);
    return 0;
}

// Função para listar peças
void listarPecas(const std::vector<pecas>& lista){
    std::cout << "\n\n===========Lista de peças===========\n\n";
    if(lista.empty()){
        std::cout << "Nenhuma peça adicionada na lista!";
    } else{
        for(const auto& item : lista){
            item.exibir();
            const std::string estado = item.traduzStatus();
            std::cout << "\nStatus = " << estado;
        }
    }
    std::cout << "\n\n====================================\n\n";
}

// Função para adicionar peças na lista de queue
void adicionarPecas(std::queue<pecas>& lista){
    pecas novaPecas;
    int confirmaOp{};
    std::cout << "\nInforme os dados da peça!\n";
    std::cout << "ID: ";
    std::cin >> novaPecas.idPecas;
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    std::cout << "\nInforme a descrição da peça: ";
    std::getline(std::cin, novaPecas.descricao);
    while(true){
        if(novaPecas.descricao.empty() || std::all_of(novaPecas.descricao.begin(), novaPecas.descricao.end(), ::isspace)){
            std::cout << "Erro, nome em branco!";
        }else{
            break;
        }
    }
    novaPecas.status = statusPeca::nova;
    std::cout << "\nAs informações adicionadas foram: \n";
    novaPecas.exibir();
    std::this_thread::sleep_for(std::chrono::milliseconds(500));
    std::cout << "\n\nDeseja prosseguir - [1]Sim [2]Não" << "\nE adicionar as informaçoes? ";
    std::cin >> confirmaOp;
    if(confirmaOp == 1){
        lista.push(novaPecas);
        std::cout << "\n\nNova peça adicionada com suscesso!\n\n";
        std::this_thread::sleep_for(std::chrono::seconds(1));
    } else{
        std::cout << "\n\nPeça não adicionada, valores descartados!\n\n";
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
}

// Função de processamento de peças
void processaPeca(std::queue<pecas>& processa, std::stack<pecas>& inspecao){
    pecas novoProcessamento = processa.front();
    int menuProcessa{};
    std::cout << "\n\n====================================\n\n";
    std::cout << "Iniciando processamento de peça!\n";
    std::cout << "Peça a ser processada: \n";
    std::cout << "\n============================\n";
    novoProcessamento.exibir();
    std::cout << "\n============================\n";
    std::this_thread::sleep_for(std::chrono::seconds(1));
    std::cout << "\n\nAo processa a peça seu status será alterado para (pendente) e seguira no aguardo da inspeção!\n";
    std::cout << "Está ação não pode ser desfeita!\n\n" << "[1]Processar\n" << "[2]Não processar\n\n" << "Escolha: ";
    std::cin >> menuProcessa;
    switch(menuProcessa){
        case 1:
            std::cout << "\n\nIniciando o processamento!\n\n";
            std::this_thread::sleep_for(std::chrono::milliseconds(250));

            std::cout << "Alterando status da peça para pendente";
            for(int i = 0; i<3; i++){ std::cout << "."; std::this_thread::sleep_for(std::chrono::milliseconds(200));}
            novoProcessamento.status =statusPeca::pendente;

            std::cout << "\nMovendo peça para lista de inspeção";
            for(int i = 0; i<3; i++){ std::cout << "."; std::this_thread::sleep_for(std::chrono::milliseconds(200));}
            inspecao.push(novoProcessamento);

            std::cout << "\nExcluindo registros antigos";
            for(int i = 0; i<3; i++){ std::cout << "."; std::this_thread::sleep_for(std::chrono::milliseconds(200));}
            processa.pop();

            std::cout << "\n\nProcesso concluido com sucesso!";

            std::cout << "\n\n============================\n\n";
            std::cout << "O ultimo item da lista de inspeção é: ";
            inspecao.top().exibir();
            std::cout << "\n\n============================\n\n";
            std::cout << "Finalizando processamento";
            std::cout << "\n\n====================================\n";
            break;
        case 2:
            std::cout << "Voltando ao menu inicial";
            for(int i = 0; i<3; i++){ std::cout << "."; std::this_thread::sleep_for(std::chrono::milliseconds(200));}
            break;
        default:
            std::cout << "Opção invalida, escolha apenas 1 ou 2";
            break;
    }
}

void inspecionaPeca(std::stack<pecas>& inspecao, std::vector<pecas>& addPeca){
    pecas novaPeca = inspecao.top();
    int menuInspec{};
    std::cout << "\n\n====================================\n\n";
    std::cout << "Iniciando inspeção de peça!\n";
    std::cout << "Peça a ser inspecionada: \n";
    std::cout << "\n============================\n";
    novaPeca.exibir();
    std::cout << "\n============================\n";
    std::this_thread::sleep_for(std::chrono::seconds(1));
    std::cout << "Está ação não pode ser desfeita!\n\n" << "[1]Aprovar\n" << "[2]Reprovar\n\n" << "Escolha: ";
    std::cin >> menuInspec;
    switch(menuInspec){
        case 1:
            std::cout << "\nPeça aprovada!\n";
            std::this_thread::sleep_for(std::chrono::milliseconds(250));

            std::cout << "Alterando status da peça para aprovado";
            for(int i = 0; i<3; i++){ std::cout << "."; std::this_thread::sleep_for(std::chrono::milliseconds(200));}
            novaPeca.status = statusPeca::aprovada;

            std::cout << "\nMovendo peça para lista de pecas";
            for(int i = 0; i<3; i++){ std::cout << "."; std::this_thread::sleep_for(std::chrono::milliseconds(200));}
            addPeca.push_back(novaPeca);

            std::cout << "\nExcluindo registros antigos";
            for(int i = 0; i<3; i++){ std::cout << "."; std::this_thread::sleep_for(std::chrono::milliseconds(200));}
            inspecao.pop();

            std::cout << "\n\nPeça inspecionada concluido com sucesso!";

            std::cout << "\n\n============================\n\n";
            std::cout << "Finalizando inspeção.";
            std::cout << "\n\n====================================\n";
            break;
        case 2:
            std::cout << "\nPeça rejeitada!\n";
            std::this_thread::sleep_for(std::chrono::milliseconds(250));

            std::cout << "Alterando status da peça para rejeitada";
            for(int i = 0; i<3; i++){ std::cout << "."; std::this_thread::sleep_for(std::chrono::milliseconds(200));}
            novaPeca.status = statusPeca::rejeitada;

            std::cout << "\nMovendo peça para lista de pecas";
            for(int i = 0; i<3; i++){ std::cout << "."; std::this_thread::sleep_for(std::chrono::milliseconds(200));}
            addPeca.push_back(novaPeca);

            std::cout << "\nExcluindo registros antigos";
            for(int i = 0; i<3; i++){ std::cout << "."; std::this_thread::sleep_for(std::chrono::milliseconds(200));}
            inspecao.pop();

            std::cout << "\n\nPeça inspecionada... Concluido com sucesso!";

            std::cout << "\n\n============================\n\n";
            std::cout << "Finalizando inspeção.";
            std::cout << "\n\n====================================\n";
            break;
        default:
            std::cout << "Opção invalida, escolha apenas 1 ou 2";
            break;
    }
}