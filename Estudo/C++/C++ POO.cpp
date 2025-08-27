// ====================================================================================
// ||                                                                                ||
// ||      ARQUIVO DE REFERÊNCIA - PROGRAMAÇÃO ORIENTADA A OBJETOS (POO) EM C++        ||
// ||                                                                                ||
// ====================================================================================
// Este arquivo serve como um guia de consulta rápida para os principais conceitos de POO.


// --- 1. O Básico: Classes e Objetos ---

// Uma 'class' é a planta para criar objetos. Ela agrupa dados (atributos) e funções (métodos).
// Por padrão, todos os membros de uma 'class' são 'private'.
class Jogador {
    // ... membros da classe ...
};

// Um 'struct' é similar a uma 'class', mas seus membros são 'public' por padrão.
// Usado geralmente para agrupar dados simples sem lógicas complexas.
struct Ponto {
    double x, y;
};

// Um 'objeto' é uma instância de uma classe, a "casa" construída a partir da "planta".
// Jogador p1; // p1 é um objeto da classe Jogador.


// --- 2. Encapsulamento: Os Modificadores de Acesso ---

class Cofre {
// 'public': Membros acessíveis de qualquer lugar, inclusive de fora da classe.
// É a "interface" da sua classe, os "botões" que o mundo externo pode usar.
public:
    void abrir();
    void fechar();

// 'private': Membros acessíveis APENAS por outros métodos da MESMA classe.
// Protege os dados internos, garantindo a integridade do objeto.
private:
    std::string segredo;
    bool estaAberto;

// 'protected': Similar ao 'private', mas também permite o acesso de CLASSES FILHAS (Herança).
protected:
    int nivelDeSeguranca;
};


// --- 3. Getters e Setters: Acesso Controlado ---

class ContaBancaria {
private:
    double saldo;
public:
    // Getter: Método PÚBLICO para LER um atributo PRIVADO.
    // É 'const' pois não modifica o estado do objeto, apenas lê.
    double getSaldo() const {
        return saldo;
    }

    // Setter: Método PÚBLICO para ALTERAR um atributo PRIVADO de forma controlada.
    void depositar(double valor) {
        if (valor > 0) { // Regra de validação (o "porteiro inteligente")
            saldo += valor;
        }
    }
};


// --- 4. O Ciclo de Vida: Construtores e Destrutor ---

class Recurso {
public:
    // Construtor: Método especial chamado automaticamente quando um objeto é criado.
    // Usado para inicializar o objeto. Tem o mesmo nome da classe e não tem retorno.
    Recurso(std::string nome) : nomeDoRecurso(nome) { // <-- Lista de Inicialização (mais eficiente)
        std::cout << "Recurso '" << nomeDoRecurso << "' adquirido.\n";
    }

    // Destrutor: Método especial chamado automaticamente quando um objeto é destruído.
    // Usado para "limpar a sujeira" (liberar memória, fechar arquivos, etc.).
    // Tem o mesmo nome da classe, com um til (~) na frente. Não tem parâmetros nem retorno.
    ~Recurso() {
        std::cout << "Recurso '" << nomeDoRecurso << "' liberado.\n";
    }
private:
    std::string nomeDoRecurso;
};


// --- 5. O Pilar da Reutilização: Herança ---

// Herança Simples: Uma classe filha herda de uma única classe mãe.
class Veiculo { // Classe Mãe (ou Base)
protected:
    int velocidade;
public:
    void acelerar() { velocidade += 10; }
};

// A classe Carro "É UM" Veiculo.
// ': public Veiculo' indica herança pública.
class Carro : public Veiculo { // Classe Filha (ou Derivada)
public:
    // O construtor da filha DEVE chamar o construtor da mãe.
    Carro() { /* ... */ } 
    void ligarLimpador() { /* ... */ }
};

// Herança Múltipla: Uma classe filha herda de duas ou mais classes mãe.
class Maquina { public: int voltagem; };
class Ferramenta { public: int peso; };

class Furadeira : public Maquina, public Ferramenta {
    // A Furadeira agora tem 'voltagem' e 'peso'.
};

// TÓPICO AVANÇADO: O "Problema do Diamante" e a Herança Virtual
// É usado para evitar ambiguidades quando uma classe herda a mesma classe "avó" por dois caminhos.
// class Funcionario : virtual public Pessoa {};


// --- 6. O Pilar do Comportamento: Polimorfismo ---

class Animal {
public:
    // Função VIRTUAL: Permite que classes filhas forneçam suas próprias implementações (sobrescrita).
    // É a chave para o polimorfismo dinâmico.
    virtual void fazerSom() const {
        std::cout << "Som de animal generico...\n";
    }
    // Destrutor VIRTUAL: REGRA DE OURO! Se uma classe tem funções virtuais,
    // o destrutor também DEVE ser virtual para garantir a limpeza correta.
    virtual ~Animal() {}
};

class Cachorro : public Animal {
public:
    // 'override': Palavra-chave de segurança. Garante que estamos realmente sobrescrevendo
    // um método virtual da classe mãe. O compilador dará erro se não for o caso.
    void fazerSom() const override {
        std::cout << "Au au!\n";
    }
};

class Gato : public Animal {
public:
    void fazerSom() const override {
        std::cout << "Miau!\n";
    }
};

// TÓPICO AVANÇADO: Classes Abstratas e Métodos Virtuais Puros
// Uma classe com pelo menos um método virtual puro se torna "abstrata" (não pode ser instanciada).
// Ela define um "contrato" que as classes filhas são OBRIGADAS a implementar.
class Forma {
public:
    virtual double calcularArea() const = 0; // Método virtual puro.
};


// --- 7. Gerenciamento de Memória Moderno (Ponteiros Inteligentes) ---
// #include <memory>

// std::unique_ptr: Posse ÚNICA. Leve e rápido. Não pode ser copiado, apenas movido.
// É a sua escolha padrão para gerenciamento de memória.
// std::unique_ptr<Animal> pet = std::make_unique<Cachorro>();

// std::shared_ptr: Posse COMPARTILHADA. Múltiplos ponteiros podem ser donos do mesmo objeto.
// Mantém uma contagem de referências. O objeto só é destruído quando a contagem chega a zero.
// std::shared_ptr<Animal> pet_da_familia = std::make_shared<Gato>();

// Uso com polimorfismo:
// std::vector<std::unique_ptr<Animal>> animais;
// animais.push_back(std::make_unique<Cachorro>());
// animais.push_back(std::make_unique<Gato>());
// for (const auto& animal : animais) {
//     animal->fazerSom(); // Chama a versão correta (Cachorro ou Gato)
// }
// A memória é liberada automaticamente quando o vector é destruído. ADEUS 'delete' manual.


// --- 8. Tópicos Adicionais e Boas Práticas ---

class Utilitario {
public:
    // O ponteiro 'this': Dentro de um método, 'this' é um ponteiro para o próprio objeto.
    void comparar(const Utilitario& outro) {
        if (this == &outro) {
            std::cout << "Este e o mesmo objeto.\n";
        }
    }

    // Membros 'static': Pertencem à CLASSE, não a um objeto individual.
    // Existe apenas uma cópia para todos os objetos da classe.
    static int contadorDeObjetos;
    Utilitario() { contadorDeObjetos++; }

    // TÓPICO AVANÇADO: Sobrecarga de Operadores
    // Permite que você defina o comportamento de operadores (+, -, ==, <<) para suas classes.
    // bool operator==(const Utilitario& outro) const { /* ... */ }
};
// É preciso inicializar o membro estático fora da classe.
// int Utilitario::contadorDeObjetos = 0;

// --- 9. A Regra dos Três/Cinco/Zero (Gerenciamento Manual de Recursos) ---

// Uma regra fundamental do C++ para classes que gerenciam recursos brutos (ex: memória com 'new').
// REGRA DO ZERO (O ideal moderno): Projete classes que NÃO precisem de nenhum destes métodos,
// usando contêineres da STL e ponteiros inteligentes para gerenciar recursos.
// REGRA DOS CINCO: Se você precisar escrever UM dos 5 métodos especiais abaixo, provavelmente
// precisará escrever ou considerar todos os cinco para um gerenciamento correto.
class RecursoManual {
private:
    int* ptr_dado;
public:
    // Construtor Padrão
    RecursoManual(int valor) {
        ptr_dado = new int(valor);
    }

    // 1. Destrutor (essencial para liberar o 'new')
    ~RecursoManual() {
        delete ptr_dado;
        ptr_dado = nullptr;
    }

    // 2. Construtor de Cópia (evita que duas instâncias apontem para a mesma memória)
    RecursoManual(const RecursoManual& outro) {
        ptr_dado = new int(*outro.ptr_dado);
    }

    // 3. Operador de Atribuição de Cópia (lida com 'obj1 = obj2;')
    RecursoManual& operator=(const RecursoManual& outro) {
        if (this == &outro) return *this; // Proteção contra auto-atribuição
        delete ptr_dado;
        ptr_dado = new int(*outro.ptr_dado);
        return *this;
    }

    // 4. Construtor de Movimento (C++11 - para transferir posse, mais eficiente)
    RecursoManual(RecursoManual&& outro) noexcept {
        ptr_dado = outro.ptr_dado;
        outro.ptr_dado = nullptr; // Deixa o objeto original em um estado válido, mas vazio.
    }

    // 5. Operador de Atribuição de Movimento (C++11)
    RecursoManual& operator=(RecursoManual&& outro) noexcept {
        if (this == &outro) return *this;
        delete ptr_dado;
        ptr_dado = outro.ptr_dado;
        outro.ptr_dado = nullptr;
        return *this;
    }
};


// --- 10. Templates (Programação Genérica) ---

// Templates são "plantas para criar plantas". Permitem escrever código que funciona com qualquer tipo de dado.

// Exemplo de Função Template: Cria uma função 'maior' que funciona para int, double, string, etc.
template<typename T>
T maior(T a, T b) {
    return (a > b) ? a : b;
}

// Exemplo de Classe Template: Cria uma classe 'Caixa' que pode guardar qualquer tipo de objeto.
template<class T>
class Caixa {
private:
    T conteudo;
public:
    void guardar(T item) { conteudo = item; }
    T pegar() const { return conteudo; }
};
// Uso: Caixa<int> caixaDeInteiros; Caixa<std::string> caixaDeTexto;


// --- 11. Tratamento de Exceções (try, catch, throw) ---

// O mecanismo padrão do C++ para lidar com erros em tempo de execução de forma robusta.
void podeLancarErro(int x) {
    if (x < 0) {
        // 'throw' lança uma exceção, interrompendo o fluxo normal e procurando um 'catch'.
        throw std::invalid_argument("O valor nao pode ser negativo.");
    }
    std::cout << "O valor e valido.\n";
}
/* // Exemplo de uso no main:
   try {
       // O bloco 'try' contém o código que pode gerar uma exceção.
       podeLancarErro(10);  // Funciona.
       podeLancarErro(-5); // Lança a exceção. O código abaixo não é executado.
   }
   catch (const std::invalid_argument& e) {
       // O bloco 'catch' captura a exceção de um tipo específico e a trata.
       std::cerr << "ERRO CAPTURADO: " << e.what() << '\n';
   }
*/