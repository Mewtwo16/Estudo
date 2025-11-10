/*
    objetivo: Cadastro de Alunos e calculo de media
*/

#include <iostream>
#include <string>
#include <vector>
#include <thread>
#include <chrono>
#include <algorithm>

struct aluno{
    std::string nome;
    int matricula{};
    std::vector<double> notas;

    void exibir() const{
    std::cout << "\nMatricula - " << matricula;
    std::cout << "\nNome - " << nome;
    std::cout << "\nNotas - ";
    if(notas.empty()){
        std::cout << " Nenhuma nota cadastrada";
    } else{
        for(const auto& nota : notas){
            std::cout << nota << "|";
        };
        std::cout << "\n";
        }
    }
};

void adicionarAlunos(std::vector<aluno>& turma);
double calcMedia(const aluno& pessoa);
void listarAlunos(const std::vector<aluno>& turma);

int main(){
    std::vector<aluno> alunos;
    int menu{};

    std::cout << "\n\n==========Bem vindo ao gerenciador de alunos==========\n\n";
    std::this_thread::sleep_for(std::chrono::milliseconds(1000));
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    do{
        std::cout << "[1] Cadastrar um novo aluno.\n" << "[2] Listar alunos.\n" << "[3] Sair do programa.\n" << "Selecione a opção desejada: ";
        std::cin >> menu;
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        std::cout << "\n\nOpcão escolhida...\n";
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(),'\n');
        std::this_thread::sleep_for(std::chrono::milliseconds(500));
        switch (menu){
        case 1:
            std::cout << "Cadastrar um novo aluno!\n" << "Preencha o formulario:\n"; 
            adicionarAlunos(alunos);
            break;
        case 2:
            std::cout << "Listar alunos!\n";
            listarAlunos(alunos);
            break;
        case 3: 
            std::cout << "O usuario deseja sair!";
            std::this_thread::sleep_for(std::chrono::milliseconds(500));
            std::cout << "\nObrigado por utilizar o gerenciador de alunos!\n\n";
            std::cout << "Saindo";
            for(int i = 1; i<4; i++){
                std::cout << ".";
                std::this_thread::sleep_for(std::chrono::milliseconds(500));
            }
            break;
        default:
            std::cout << "\n\nOpcão invalida!";
            break;
        }



    }while(menu != 3);
    return 0;
}


void adicionarAlunos(std::vector<aluno>& turma){
    aluno novoAluno;
    double add{};
    std::cout << "Digite os dados do aluno: \nNome completo \nMatricula \nNotas\n";
    while(true){
        std::cout << "\nQual seu nome: ";
        std::getline(std::cin, novoAluno.nome);
        if(novoAluno.nome.empty() || std::all_of(novoAluno.nome.begin(), novoAluno.nome.end(), ::isspace)){
            std::cout << "\n\nErro!\n\n";
            std::cout << "O nome não deve estar em branco\n";
        } else{
            std::cout << "O aluno " << novoAluno.nome << " foi adicionado\n";
            break;
        }
    };
    std::cout << "Digite o numero da matricula: ";
    std::cin >> novoAluno.matricula;
    
    for(int i = 1; i<4; i++){
        std::cout << "\nDigite a " << i << " nota: ";
        std::cin >> add;
        novoAluno.notas.push_back(add);
    };
    turma.push_back(novoAluno);
}

double calcMedia(const aluno& pessoa){
    double soma{};
    if(pessoa.notas.empty()){
        return 0.0;
    }
    for(const auto& nota : pessoa.notas){
        soma += nota;
    }
    const double media = soma / pessoa.notas.size();
    return media;

}

void listarAlunos(const std::vector<aluno>& turma) {
    std::cout << "\n\n===== LISTA COMPLETA DA TURMA =====\n";
    if (turma.empty()) {
        std::cout << "Nenhum aluno cadastrado ainda.\n";
    } else {
        for (const auto& alunoAtual : turma) {
            alunoAtual.exibir();
            const double finalMedia = calcMedia(alunoAtual);
            std::cout << "Media - " << finalMedia << "\n";
        }
    }
    std::cout << "\n\n===================================\n\n";
}

