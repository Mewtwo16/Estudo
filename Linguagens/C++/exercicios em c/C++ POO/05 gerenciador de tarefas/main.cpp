/*
    objetivo: Criação de programa que gerencia tarefas utilizando ponteiros inteligentes e brutos
*/

#include <iostream>
#include <string>
#include <memory>
#include <utility>
#include <vector>
#include <algorithm>
#include "Sistema.h"
#include "Usuario.h"
#include "Tarefa.h"

int main(){

    Sistema gerenciadorTarefas;

    gerenciadorTarefas.criarUsuario("Andre");
    gerenciadorTarefas.criarUsuario("Saga");
    gerenciadorTarefas.criarUsuario("gemini");

    Usuario* ptr_andre = gerenciadorTarefas.encontrarUsuario("Andre");
    Usuario* ptr_saga = gerenciadorTarefas.encontrarUsuario("Saga");
    Usuario* ptr_gemini = gerenciadorTarefas.encontrarUsuario("gemini");


    gerenciadorTarefas.criarTarefa("Tarefa 1", ptr_andre);
    gerenciadorTarefas.criarTarefa("Tarefa 2", ptr_saga);
    gerenciadorTarefas.criarTarefa("Tarefa 2", ptr_gemini);

    gerenciadorTarefas.exibirTarefasDoUsuario(ptr_andre);

    Tarefa* ptr_t1 = gerenciadorTarefas.encontrarTarefa("Tarefa 1");


    gerenciadorTarefas.concluirTarefa(ptr_t1);

    gerenciadorTarefas.exibirTarefasDoUsuario(ptr_andre);

    return 0;
}