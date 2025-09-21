#ifndef SISTEMA_H_INCLUDED
#define SISTEMA_H_INCLUDED

#include <iostream>
#include <string>
#include <memory>
#include <utility>
#include <vector>
#include <algorithm>
#include "Tarefa.h"
#include "Usuario.h"

// Bloco da classe sistema
class Sistema{
    private:
        // A Classe sistema será dona de todas as tarefas e usuarios e tem como dever administrar os mesmos
        std::vector<std::shared_ptr<Usuario>> todosUsuarios;
        std::vector<std::shared_ptr<Tarefa>> todasTarefas;
    public:
        // Funções da classe sistema
        void criarUsuario(const std::string& nome);
        void criarTarefa(const std::string& desc, Usuario* resp);
        void concluirTarefa(Tarefa* tarefaConcluida);
        void exibirTarefasDoUsuario(Usuario* usuario);
        Usuario* encontrarUsuario(const std::string& us);
        Tarefa* encontrarTarefa(const std::string& ta);
};

// Função para criar usuario
void Sistema::criarUsuario(const std::string& nome){
    // Cria uma variavel do tipo shared_ptr e executa o construtor da classe Usuario
    auto novoUsuario = std::make_shared<Usuario>(nome);
    // Pega a variavel novoUsuario que contem o ptr tipo usuario e adiciona no array de ponteiros compartilhados do tipo Usuario
    todosUsuarios.push_back(novoUsuario);
    std::cout << "\nCriado o usuario " << nome << " com sucesso!\n";
}

// Função para criar tarefa
void Sistema::criarTarefa(const std::string& desc, Usuario* resp){

    // Crio um novo ponteiro que inicializa como nulo
    std::shared_ptr<Usuario> resp_ptr = nullptr;

    // Loop for para procurar na lista um usuario com o nome igual
    for(const auto& user : todosUsuarios){
        // Se o usuario for igual
        if(user.get() == resp){
            resp_ptr = user; // Copia para a variavel
            break;
        }
    }

    // if que detecta se foi encontrado algo
    if(resp_ptr){
        // Crio a nova tarefa passando a variavel que pegou o nome do usuario
        auto novaTarefa = std::make_shared<Tarefa>(desc , resp_ptr);
        // Por fim adiciono a nova tarefa na lista de tarefas
        todasTarefas.push_back(novaTarefa);
    }else{
        std::cout << "\n\nERRO: Usuario invalido ou inexistente na lista de tarefas!";
    }
}

void Sistema::concluirTarefa(Tarefa* tarefaConcluida){
    if(!tarefaConcluida){
        std::cout << "\nTarefa invalida!";
        return;
    };

    // Utilização do remove_if que percorre todo o array e empurra para o começo todos os itens que não se deseja remover e adiciona um marcador onde o "lixo começa"
    auto novoFim = std::remove_if(todasTarefas.begin(), todasTarefas.end(), 
        // Função lambda(função temporaria e anonima que não necessita de declaração)
        [&](const std::shared_ptr<Tarefa>& tar_ptr){
            // Condição que retorna true se o ponteiro passado for igual dentro do array
            return tar_ptr.get() == tarefaConcluida;
        }
    );

    // Pega o marcador e deleta todo o lixo passado)
    todasTarefas.erase(novoFim, todasTarefas.end());

    std::cout << "\nTarefa removida com suscesso!";
}


void Sistema::exibirTarefasDoUsuario(Usuario* usuario){
    if(!usuario){
        std::cout << "\nErro usuario invalido.\n";
        return;
    }

    std::cout << "\n--- Tarefas do Usuario: " << usuario->nome << " ---\n";
    
    // Cria um bool que serve de chave validadora
    bool encontrouTarefas = false;// inicializa em falso

    // For para percorrer a lista de tarefas
    for (const auto& tarefa_ptr : todasTarefas) {
        // if para validar se na lista o responsavel pela tarefa é igual ao usuario
        // utiliza .get para extrair o ponteiro bruto de um vector de shared_ptr
        if (tarefa_ptr->responsavel.get() == usuario) {
            // Imprime a descrição das tarefas se forem iguais
            std::cout << " - " << tarefa_ptr->descricao << "\n";
            // Muda a chave para true
            encontrouTarefas = true;
        }
    }

    // Verifica se a chave continua em false significa que não encontrou as tarefas
    if (!encontrouTarefas) {
        std::cout << "Nenhuma tarefa encontrada para este usuario.\n";
    }
    std::cout << "-------------------------------------------\n";
}

Usuario* Sistema::encontrarUsuario(const std::string& us){
    for(const auto& us_ptr : todosUsuarios){
        if(us_ptr->nome == us){
            return us_ptr.get();
        };
    };
    return nullptr;
}

Tarefa* Sistema::encontrarTarefa(const std::string& ta){
    for(const auto& tar_ptr : todasTarefas){
        if(tar_ptr->descricao == ta){
            return tar_ptr.get();
        };
    };
    return nullptr;
}

#endif