// --- Estrutura Mínima de um Arquivo ---
#include <iostream>   // Diretiva de pré-processador que inclui bibliotecas. Essencial para I/O.

// Bloco 1: Definições de Tipos (structs, enums)
// Bloco 2: Protótipos de Funções

// Bloco 3: Função Principal (main)
int main(int argc, char* argv[]) { // 'main' é o ponto de entrada de todo programa C++.
    // ...
    return 0;                     // Retornar 0 indica que o programa terminou com sucesso.
}

// Bloco 4: Definições (Implementação) das Funções

// --- Variáveis, Constantes e Tipos Primitivos ---
int         contador{};       // Inteiro. Inicializado com 0.
double      preco = 99.99;    // Ponto flutuante de dupla precisão. Padrão para decimais.
float       altura = 1.75f;   // Ponto flutuante de precisão simples (use 'f' no final).
char        letra = 'A';      // Caractere único (usa aspas simples).
bool        ativo = true;     // Booleano (true ou false).
std::string nome = "Andre";   // Objeto de texto (requer <string>).

// --- Qualificadores ---
const int LADOS_DO_QUADRADO = 4;        // 'const': Promessa de que o valor não mudará após a inicialização.
constexpr double GRAVIDADE = 9.8;       // 'constexpr': Constante de tempo de compilação. Mais forte que 'const'.
auto        iterador = meu_vetor.begin(); // 'auto': O compilador deduz o tipo automaticamente. Extremamente útil para tipos longos.
auto        resultado = 5.0;            // O compilador deduz que é um 'double'.

// --- Namespaces ---
std::cout << "Ola"; // 'std::' é o "sobrenome" da Biblioteca Padrão. Evita conflitos de nome.




// --- Operadores Comuns ---
int soma = a + b;           // Aritméticos: +, -, *, /, % (resto da divisão).
x += 5;                     // Atribuição Composta: x = x + 5. (Também -=, *=, /=).
contador++;                 // Incremento: adiciona 1. `contador--` decrementa.
if (x == y) {}              // Comparação: ==, !=, <, >, <=, >=.
if (e_valido && tem_saldo) {} // Lógicos: && (E), || (OU), ! (NÃO).

// --- Estruturas Condicionais ---
if (condicao) {
    // ...
} else if (outra_condicao) {
    // ...
} else {
    // ...
}

std::string status = (idade >= 18) ? "Maior" : "Menor"; // Operador Ternário: um if-else em uma linha.

switch (opcao_int) {
    case 1:
        // ...
        break; // 'break' é crucial para não "cair" nos casos abaixo.
    case 2:
        // ...
        break;
    default: // Opcional, executado se nenhum case corresponder.
        // ...
}

// --- Laços de Repetição ---
while (condicao) { /* Repete enquanto a condição for true. Testa ANTES. */ }

do { /* Repete enquanto a condição for true. Testa DEPOIS. Executa pelo menos uma vez. */ } while (condicao);

for (int i = 0; i < 10; ++i) { /* Laço clássico, para um número conhecido de iterações. */ }

for (const auto& item : colecao) { /* Range-based for: a melhor forma de percorrer coleções. */ }






// --- Entrada e Saída (iostream) ---
std::cout << "Valor: " << var << '\n'; // Imprime na tela. '\n' é mais eficiente que endl.
std::cin >> numero;                     // Lê um dado do teclado, parando em espaços. Deixa '\n' no buffer.
std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // Limpa o buffer de entrada. Essencial ao misturar 'cin' e 'getline'.
std::getline(std::cin, frase_completa); // Lê uma linha inteira, incluindo espaços.

// --- Struct ---
struct Jogador {
    std::string nome;
    int pontuacao;

    void exibir() const { // Método 'const' (boa prática se não altera membros).
        std::cout << nome << " - " << pontuacao << " pontos\n";
    }
};
Jogador p1 = {"Ana", 100}; // Cria um objeto 'Jogador'.
p1.exibir();               // Chama um método do objeto.

// --- Enum Class ---
enum class Status { Ativo, Inativo, Banido }; // Tipo seguro para representar um conjunto de estados.
Status status_jogador = Status::Ativo;
if (status_jogador == Status::Ativo) { /* ... */ } // Comparação segura e legível.




// --- Protótipos (Declarações) ---
double calcularMedia(const std::vector<double>& notas); // Passagem por referência constante: eficiente e segura.
void resetarPontuacao(int& pontuacao);                // Passagem por referência: permite modificar a variável original.
void criarJogador(std::string nome, int hp = 100);    // Parâmetro com valor padrão.

// --- Sobrecarga (Overloading) ---
void log(const std::string& msg); // Mesma função, mas com...
void log(int erro_code);          // ...parâmetros diferentes.

// --- Recursão ---
int fatorial(int n) {
    if (n <= 1) return 1;          // Caso Base: condição de parada.
    return n * fatorial(n - 1);    // Passo Recursivo: chama a si mesma.
}





// --- std::vector (O Padrão) ---
std::vector<int> v = {10, 20}; // Cria e inicializa.
v.push_back(30);               // Adiciona no final.
v.pop_back();                  // Remove do final.
v.size();                      // Retorna o número de elementos.
v.empty();                     // Verifica se está vazio.
v[0];                          // Acesso rápido (inseguro).
v.at(0);                       // Acesso seguro (com verificação).
v.clear();                     // Limpa o vetor.
v.reserve(50);                 // Otimização: aloca espaço para 50 elementos.
std::vector<std::vector<char>> matriz; // Matriz 2D.

// --- std::stack (Pilha - LIFO) ---
std::stack<int> pilha;
pilha.push(10);                // Adiciona ao topo.
pilha.top();                   // Lê o item do topo.
pilha.pop();                   // Remove o item do topo.

// --- std::queue (Fila - FIFO) ---
std::queue<int> fila;
fila.push(10);                 // Adiciona ao final.
fila.front();                  // Lê o item da frente.
fila.pop();                    // Remove o item da frente.

// --- std::list (Inserção/Remoção Rápida no Meio) ---
std::list<int> lista;
lista.push_front(10);          // Adiciona no início.




// --- Ponteiros e Memória ---
int valor = 10;
int* ptr = &valor;                  // '&' pega o endereço. 'ptr' guarda o endereço de 'valor'.
*ptr = 20;                          // '*' acessa/modifica o valor no endereço. 'valor' agora é 20.
int* ptr_nulo = nullptr;            // Ponteiro que não aponta para nada.

// --- Ponteiros Inteligentes (A Forma Correta de Gerenciar Memória Dinâmica) ---
#include <memory>
// Posse única e automática. O 'delete' é chamado sozinho. É a sua escolha padrão.
std::unique_ptr<Jogador> p_jogador = std::make_unique<Jogador>();
p_jogador->pontuacao = 200; // Acessa membros com '->'.

// Posse compartilhada com contagem de referências.
std::shared_ptr<Jogador> p_chefe = std::make_shared<Jogador>();
auto outro_ptr_pro_chefe = p_chefe; // Agora 2 ponteiros são "donos" do mesmo objeto.

// --- Biblioteca <algorithm> ---
#include <algorithm>
std::sort(v.begin(), v.end());      // Ordena o contêiner.
auto it = std::find(v.begin(), v.end(), 20); // Busca um valor.
if (it != v.end()) { /* achou */ }
std::for_each(v.begin(), v.end(), [](int n){ /* ... */ }); // Aplica uma "lambda" a cada item.

// --- Argumentos de Linha de Comando ---
// int main(int argc, char* argv[])
int num_args = argc;                // Número de argumentos.
std::string primeiro_arg = argv[1];   // Pega o primeiro argumento (argv[0] é o nome do programa).
int valor_int = std::stoi(argv[2]); // Converte string para int (requer <string>).

// --- Namespaces (Espaços de Nomes) ---
// São como "sobrenomes" para o código, evitando conflitos de nomes em projetos grandes.
// Você já usa o namespace 'std' (std::cout).

// Criando seu próprio namespace
namespace Matematica {
    const double PI = 3.14159;
    int somar(int a, int b) { return a + b; }
}

// Usando o namespace
// double circ = 2 * Matematica::PI * raio;
// int resultado = Matematica::somar(5, 3);

// Para evitar digitar 'Matematica::' sempre, podemos usar 'using'.
// using namespace Matematica; // (Cuidado: em arquivos .h, isso é uma má prática)
// double circ = 2 * PI * raio;


// --- A Biblioteca Padrão (STL) em Detalhes ---
// A STL é construída sobre 3 pilares que trabalham juntos:

// 1. Contêineres: Classes que armazenam dados.
// std::vector      - Array dinâmico (o mais comum).
// std::string      - Contêiner para texto.
// std::map         - Dicionário (chave-valor), ordenado.
// std::unordered_map - Dicionário (chave-valor), mais rápido, sem ordenação.
// std::set         - Conjunto de elementos únicos, ordenado.
// std::array       - Array de tamanho fixo.

// 2. Algoritmos: Funções template que operam nos contêineres. Requer #include <algorithm>
// std::sort(v.begin(), v.end());    // Ordena um contêiner.
// std::find(v.begin(), v.end(), 5); // Procura por um valor.
// std::for_each(v.begin(), v.end(), [](int n){ /* ... */ }); // Aplica uma função a cada elemento.

// 3. Iteradores: Objetos que agem como "ponteiros" para os contêineres.
// São a "cola" que permite que os algoritmos funcionem com qualquer tipo de contêiner.
// std::vector<int>::iterator it = v.begin(); // 'it' aponta para o primeiro elemento de 'v'.
// *it; // Acessa o valor para o qual o iterador aponta.
// ++it; // Move o iterador para o próximo elemento.