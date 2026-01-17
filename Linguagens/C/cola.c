/*
 * ======================================================================================
 * MANUAL DE REFERÊNCIA TÉCNICA - LINGUAGEM C
 * Autor: Saga (Tutor IA) | Usuário: André
 * * COMO USAR:
 * Este arquivo não é um programa executável. É uma documentação estruturada.
 * As seções estão divididas em funções vazias para organização visual.
 * ======================================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* ======================================================================================
 * 1. TIPOS DE DADOS E FORMATADORES (Para printf e scanf)
 * ====================================================================================== */
void referencia_tipos() {
    /*
    | TIPO       | BYTES (Aprox) | FORMATADOR | OBSERVAÇÃO                            |
    |------------|---------------|------------|---------------------------------------|
    | char       | 1             | %c         | Use aspas simples: 'A'                |
    | int        | 4             | %d ou %i   | Números inteiros                      |
    | float      | 4             | %f         | Decimal (%.2f limita casas)           |
    | double     | 8             | %lf        | Decimal de alta precisão              |
    | char[]     | N             | %s         | String (Array de char)                |
    | void* | 4 ou 8        | %p         | Endereço de memória (Hexadecimal)     |
    */

    // DICA DE OURO: Tabela ASCII Básica
    // '0' a '9' = 48 a 57  (Para converter char numérico p/ int: c - '0')
    // 'A' a 'Z' = 65 a 90
    // '\n'      = 10       (Quebra de linha)
    // '\0'      = 0        (Fim de string)
}

/* ======================================================================================
 * 2. PONTEIROS E MEMÓRIA (O Coração do C)
 * ====================================================================================== */
void referencia_ponteiros() {
    
    int  valor = 10;
    int *ptr; // O asterisco na declaração diz: "Vou guardar um endereço"

    // OPERADOR & (E Comercial) -> "O ENDEREÇO DE..."
    ptr = &valor; // ptr agora aponta para onde 'valor' mora na RAM.

    // OPERADOR * (Asterisco)   -> "O CONTEÚDO DE..." (Dereferência)
    *ptr = 20;    // "Vá no endereço que ptr guarda e mude o valor lá dentro para 20".
                  // Resultado: a variável 'valor' mudou para 20 indiretamente.

    /* * ALOCAÇÃO DINÂMICA (stdlib.h)
     * Usado quando você não sabe o tamanho do array antes de rodar o programa.
     */

    // FUNÇÃO: malloc (Memory Allocation)
    // Retorna: Ponteiro genérico (void*) para o bloco de memória.
    // Parâmetro: Tamanho total em bytes.
    int *vetor = (int*) malloc(5 * sizeof(int)); 

    // FUNÇÃO: calloc (Contiguous Allocation)
    // Diferença: Aloca e LIMPA a memória (preenche com zeros). Mais seguro.
    // Parâmetros: (Quantidade de elementos, Tamanho de cada um).
    int *vetorLimpo = (int*) calloc(5, sizeof(int));

    // FUNÇÃO: free (Liberar)
    // OBRIGATÓRIO: Libera a memória alocada para o sistema. Evita vazamentos.
    free(vetor);
    free(vetorLimpo);
}

/* ======================================================================================
 * 3. ENTRADA E SAÍDA DE CONSOLE (stdio.h)
 * ====================================================================================== */
void referencia_io_console() {
    
    int idade;
    char nome[50];

    // FUNÇÃO: printf (Print Formatted)
    // Parâmetro 1: String de formato com máscaras (%d, %s).
    // Parâmetro 2+: Variáveis correspondentes.
    printf("Idade: %d\n", idade);

    // FUNÇÃO: scanf (Scan Formatted)
    // Parâmetro 1: Tipo esperado.
    // Parâmetro 2: ENDEREÇO da variável (&).
    // ALERTA: Não use & para strings (elas já são ponteiros).
    scanf("%d", &idade); 

    // FUNÇÃO: getchar
    // Lê UM caractere do buffer. Útil para menus ou "press enter to continue".
    char c = getchar();

    // FUNÇÃO: fgets (File Get String)
    // A forma SEGURA de ler texto (lê espaços e previne estouro de memória).
    // Parâmetro 1: Onde salvar (variavel).
    // Parâmetro 2: Tamanho máximo (sizeof).
    // Parâmetro 3: De onde ler (stdin = teclado).
    fgets(nome, 50, stdin);
}

/* ======================================================================================
 * 4. MANIPULAÇÃO DE ARQUIVOS (stdio.h)
 * ====================================================================================== */
void referencia_arquivos() {
    
    FILE *arq;

    /* ==================================================================================
     * ABERTURA DE ARQUIVOS
     * ================================================================================== */
    
    /* FUNÇÃO: fopen (File Open)
     * Retorna: Ponteiro FILE* (NULL se falhar).
     * Parâmetro 1: Caminho do arquivo (string).
     * Parâmetro 2: Modo de abertura (string).
     * 
     * MODOS DISPONÍVEIS:
     * "r"  -> Leitura (Read)        - Erro se arquivo não existir.
     * "w"  -> Escrita (Write)       - Cria novo / Apaga conteúdo existente.
     * "a"  -> Adicionar (Append)    - Adiciona no final / Cria se não existir.
     * "r+" -> Leitura + Escrita     - Erro se não existir / Mantém conteúdo.
     * "w+" -> Escrita + Leitura     - Cria novo / Apaga existente.
     * "a+" -> Adicionar + Leitura   - Adiciona no final / Cria se não existir.
     * "rb", "wb", "ab" -> Modos binários (para structs/imagens/bytes).
     */
    arq = fopen("dados.txt", "r");
    
    // SEMPRE VERIFICAR SE ABRIU COM SUCESSO
    if (arq == NULL) { 
        printf("Erro ao abrir arquivo!\n");
        return; 
    }

    /* ==================================================================================
     * LEITURA DE ARQUIVOS - Pegando e Imprimindo Informações
     * ================================================================================== */
    
    /* --- MÉTODO 1: Ler Caractere por Caractere --- */
    
    // FUNÇÃO: fgetc (File Get Character)
    // Retorna: int (valor ASCII do char) ou EOF (-1) no final do arquivo.
    // Parâmetro 1: Ponteiro FILE*.
    // 
    // USO TÍPICO: Loop para processar cada char individualmente.
    int ch; // int, não char! (EOF = -1, fora do range de char)
    while ((ch = fgetc(arq)) != EOF) {
        printf("%c", ch); // Imprime o caractere
    }
    
    /* --- MÉTODO 2: Ler Linha por Linha --- */
    
    // FUNÇÃO: fgets (File Get String)
    // Retorna: Ponteiro para buffer (NULL no final do arquivo).
    // Parâmetro 1: Buffer destino (char array).
    // Parâmetro 2: Tamanho máximo a ler (int) - inclui o '\0'.
    // Parâmetro 3: Ponteiro FILE*.
    // 
    // IMPORTANTE: 
    // - Para até encontrar '\n' ou limite de caracteres.
    // - Mantém o '\n' no final da string (se couber).
    // - Adiciona '\0' automaticamente.
    char linha[256];
    while (fgets(linha, 256, arq) != NULL) {
        printf("%s", linha); // Linha já tem \n, não precisa adicionar
    }
    
    /* --- MÉTODO 3: Ler com Formatação --- */
    
    // FUNÇÃO: fscanf (File Scan Formatted)
    // Retorna: Número de itens lidos com sucesso (int).
    // Parâmetro 1: Ponteiro FILE*.
    // Parâmetro 2: String de formato (%d, %s, %f, etc).
    // Parâmetro 3+: Endereços das variáveis (&variavel).
    // 
    // USO TÍPICO: Ler dados estruturados (números, palavras separadas).
    int numero;
    char nome[50];
    while (fscanf(arq, "%d %s", &numero, nome) == 2) { // 2 = esperava 2 valores
        printf("Número: %d, Nome: %s\n", numero, nome);
    }
    
    /* --- MÉTODO 4: Verificar Fim de Arquivo --- */
    
    // FUNÇÃO: feof (File End Of File)
    // Retorna: int (diferente de 0 se chegou ao fim).
    // Parâmetro 1: Ponteiro FILE*.
    // 
    // IMPORTANTE: Só é verdadeiro APÓS tentar ler além do fim.
    if (feof(arq)) {
        printf("Chegou ao fim do arquivo!\n");
    }

    /* ==================================================================================
     * ESCRITA EM ARQUIVOS - Gravando Informações
     * ================================================================================== */
    
    arq = fopen("saida.txt", "w"); // Abre para escrita
    if (arq == NULL) return;
    
    /* --- MÉTODO 1: Escrever Caractere por Caractere --- */
    
    // FUNÇÃO: fputc (File Put Character)
    // Retorna: int (o char escrito) ou EOF se erro.
    // Parâmetro 1: Caractere a escrever (char ou int).
    // Parâmetro 2: Ponteiro FILE*.
    // 
    // USO TÍPICO: Escrever chars individuais ou processar byte a byte.
    fputc('A', arq);          // Escreve a letra A
    fputc('\n', arq);         // Escreve quebra de linha
    for (char c = 'A'; c <= 'Z'; c++) {
        fputc(c, arq);        // Escreve o alfabeto
    }
    
    /* --- MÉTODO 2: Escrever Strings --- */
    
    // FUNÇÃO: fputs (File Put String)
    // Retorna: int (não-negativo se sucesso, EOF se erro).
    // Parâmetro 1: String a escrever (char*).
    // Parâmetro 2: Ponteiro FILE*.
    // 
    // IMPORTANTE: NÃO adiciona '\n' automaticamente (diferente de puts).
    fputs("Olá Mundo", arq);
    fputs("\n", arq);         // Adicionar \n manualmente se necessário
    
    /* --- MÉTODO 3: Escrever com Formatação --- */
    
    // FUNÇÃO: fprintf (File Print Formatted)
    // Retorna: int (número de caracteres escritos) ou negativo se erro.
    // Parâmetro 1: Ponteiro FILE*.
    // Parâmetro 2: String de formato (%d, %s, %f, %.2f, etc).
    // Parâmetro 3+: Variáveis a formatar.
    // 
    // USO TÍPICO: Igual printf, mas direciona para arquivo.
    int idade = 25;
    float altura = 1.75;
    fprintf(arq, "Idade: %d anos\n", idade);
    fprintf(arq, "Altura: %.2f metros\n", altura);
    fprintf(arq, "Nome: %s, Idade: %d\n", "João", idade);

    /* ==================================================================================
     * CONTROLE E FECHAMENTO
     * ================================================================================== */
    
    // FUNÇÃO: fclose (File Close)
    // Retorna: int (0 se sucesso, EOF se erro).
    // Parâmetro 1: Ponteiro FILE*.
    // 
    // OBRIGATÓRIO: Salva buffer no disco e libera recursos.
    // Sempre chamar ao terminar de usar o arquivo.
    fclose(arq);
}

/* ======================================================================================
 * 5. MANIPULAÇÃO DE ARQUIVOS BINÁRIOS (Avançado)
 * Essencial para Bancos de Dados e Structs
 * ====================================================================================== */
void referencia_binarios() {
    FILE *arq = fopen("data.bin", "wb");
    int dados[5] = {1, 2, 3, 4, 5};

    // FUNÇÃO: fwrite (File Write Block)
    // Copia bytes brutos da RAM para o arquivo.
    // Param 1: Endereço do dado (&variavel).
    // Param 2: Tamanho de UM elemento (sizeof(int)).
    // Param 3: Quantidade de elementos.
    // Param 4: Arquivo.
    fwrite(dados, sizeof(int), 5, arq);

    // FUNÇÃO: fread (File Read Block)
    // Copia bytes brutos do arquivo para a RAM.
    // Mesmos parâmetros do fwrite.
    fread(dados, sizeof(int), 5, arq);
}

/* ======================================================================================
 * 6. STRINGS (string.h)
 * Lembrete: Strings não usam operadores matemáticos (=, ==, +)
 * ====================================================================================== */
void referencia_strings() {
    char origem[] = "Teste";
    char destino[50];

    // FUNÇÃO: strcpy (String Copy)
    // Substitui: destino = origem
    strcpy(destino, origem);

    // FUNÇÃO: strcat (String Concatenate)
    // Substitui: destino = destino + origem
    strcat(destino, " Final");

    // FUNÇÃO: strlen (String Length)
    // Retorna o tamanho (sem contar o \0).
    int tamanho = strlen(destino);

    // FUNÇÃO: strcmp (String Compare)
    // Retorna 0 se forem IGUAIS.
    // Retorna != 0 se diferentes.
    if(strcmp(origem, "Teste") == 0) {
        // São iguais
    }
}

/* ======================================================================================
 * 7. STRUCTS (Estruturas de Dados)
 * ====================================================================================== */
struct Pessoa {
    char nome[50];
    int idade;
};

void referencia_structs() {
    // 1. Instância Estática
    struct Pessoa p1;
    p1.idade = 20;           // Acesso com PONTO (.)
    strcpy(p1.nome, "Ana");

    // 2. Ponteiro para Struct
    struct Pessoa *ptr = &p1;
    ptr->idade = 21;         // Acesso com SETA (->)
                             // ptr->idade é atalho para (*ptr).idade
}

/* ======================================================================================
 * 8. BIBLIOTECAS PADRÃO C - GUIA RÁPIDO
 * ====================================================================================== */

/* --------------------------------------------------------------------------------------
 * A. <stdio.h> - Entrada/Saída (Console e Arquivos)
 * -------------------------------------------------------------------------------------- */
void referencia_stdio() {
    // === CONSOLE ===
    printf("Texto %d", valor);     // Imprime formatado. Retorna: num chars escritos
    scanf("%d", &var);              // Lê formatado. Strings SEM &. Retorna: itens lidos
    fgets(str, tam, stdin);         // Lê linha SEGURO (lê espaços). Retorna: str ou NULL
    puts("texto");                  // Imprime + \n automático
    getchar() / putchar(c);         // Lê/escreve 1 char
    sprintf(buf, "f:%d", v);        // printf para string
    sscanf(str, "%d", &v);          // scanf de string
    
    // === ARQUIVOS ===
    FILE *f = fopen("a.txt", "r");  // Modos: r,w,a,r+,w+,a+ (+b para binário)
    fclose(f);                       // SEMPRE fechar após uso
    fgetc(f) / fputc('A', f);       // Lê/escreve 1 char. fgetc retorna EOF no fim
    fgets(buf, tam, f);              // Lê linha de arquivo
    fputs("texto", f);               // Escreve string (SEM \n automático)
    fprintf(f, "f:%d", v);           // printf para arquivo
    fscanf(f, "%d", &v);             // scanf de arquivo
    fread(&var, sizeof(t), n, f);    // Lê n elementos binários
    fwrite(&var, sizeof(t), n, f);   // Escreve n elementos binários
    feof(f);                         // Retorna ≠0 se fim do arquivo
    rewind(f);                       // Volta ponteiro ao início
    fseek(f, offset, origem);        // Move ponteiro. Origem: SEEK_SET/CUR/END
    ftell(f);                        // Retorna posição atual (bytes)
    remove("a.txt");                 // Deleta arquivo
    rename("v.txt", "n.txt");        // Renomeia arquivo
}

/* --------------------------------------------------------------------------------------
 * B. <stdlib.h> - Memória, Conversão, Aleatoriedade, Sistema
 * -------------------------------------------------------------------------------------- */
void referencia_stdlib() {
    // === MEMÓRIA DINÂMICA ===
    malloc(bytes);                   // Aloca memória (lixo). Retorna: void* ou NULL
    calloc(qtd, tam);                // Aloca + zera. Retorna: void* ou NULL
    realloc(ptr, novo_tam);          // Redimensiona. Retorna: novo ponteiro
    free(ptr);                       // Libera memória. SEMPRE usar após malloc/calloc
    
    // === CONVERSÃO STRING→NÚMERO ===
    atoi("123");                     // String → int. Retorna 0 se inválido
    atof("3.14");                    // String → double
    atol("999999");                  // String → long
    strtol(str, &fim, base);         // Conversão robusta. fim = onde parou
    
    // === NÚMEROS ALEATÓRIOS ===
    srand(time(NULL));               // Define semente. Usar UMA VEZ no main
    rand();                          // Gera 0 a RAND_MAX
    rand() % 100;                    // Gera 0 a 99
    (rand() % 41) + 10;              // Gera 10 a 50
    
    // === SISTEMA ===
    exit(0);                         // Encerra programa. 0=sucesso, 1=erro
    abort();                         // Encerra anormalmente (core dump)
    system("clear");                 // Executa comando do terminal
    getenv("HOME");                  // Lê variável de ambiente. Retorna: string ou NULL
    
    // === ORDENAÇÃO/BUSCA ===
    qsort(arr, n, sizeof(t), cmp);   // Ordena array. Precisa função comparação
    bsearch(&key, arr, n, sizeof(t), cmp); // Busca binária. Array ORDENADO
    abs(-10);                        // Valor absoluto inteiro
}

/* --------------------------------------------------------------------------------------
 * C. <string.h> - Strings e Memória
 * -------------------------------------------------------------------------------------- */
void referencia_string() {
    // === OPERAÇÕES BÁSICAS ===
    strlen(str);                     // Tamanho (sem \0). Retorna: int
    strcpy(dest, orig);              // Copia string (substitui =)
    strncpy(dest, orig, n);          // Copia até n chars (mais seguro)
    strcat(dest, orig);              // Concatena (substitui +=)
    strncat(dest, orig, n);          // Concatena até n chars
    strcmp(s1, s2);                  // Compara. Retorna: 0=igual, <0=menor, >0=maior
    strncmp(s1, s2, n);              // Compara n primeiros chars
    
    // === BUSCA ===
    strchr(str, 'c');                // Busca 1ª ocorrência de char. Retorna: ptr ou NULL
    strrchr(str, 'c');               // Busca última ocorrência
    strstr(str, "sub");              // Busca substring. Retorna: ptr ou NULL
    strpbrk(str, "abc");             // Busca qualquer char do conjunto
    strspn(str, "0123456789");       // Conta chars iniciais do conjunto
    
    // === TOKENIZAÇÃO ===
    strtok(str, ",");                // Divide por delimitador. MODIFICA string original!
    strtok(NULL, ",");               // Continua de onde parou
    
    // === MEMÓRIA ===
    memset(ptr, val, bytes);         // Preenche memória com valor
    memcpy(dest, orig, bytes);       // Copia memória. NÃO usar com sobreposição
    memmove(dest, orig, bytes);      // Copia memória. SEGURO para sobreposição
    memcmp(p1, p2, bytes);           // Compara memória. Retorna: 0=igual
}

/* --------------------------------------------------------------------------------------
 * D. <math.h> - Matemática (compile com -lm no Linux)
 * -------------------------------------------------------------------------------------- */
void referencia_math() {
    // === POTÊNCIAS/RAÍZES/LOGS ===
    pow(base, exp);                  // Potência. Retorna: double
    sqrt(x);                         // Raiz quadrada
    cbrt(x);                         // Raiz cúbica
    exp(x);                          // e^x
    log(x);                          // ln(x) - logaritmo natural
    log10(x);                        // log base 10
    log2(x);                         // log base 2
    
    // === ARREDONDAMENTO ===
    ceil(x);                         // Arredonda para CIMA
    floor(x);                        // Arredonda para BAIXO
    round(x);                        // Arredonda para MAIS PRÓXIMO
    trunc(x);                        // Remove decimais (corta)
    fabs(x);                         // Valor absoluto double/float
    
    // === TRIGONOMETRIA (radianos) ===
    sin(rad) / cos(rad) / tan(rad);  // Seno, cosseno, tangente
    asin(x) / acos(x) / atan(x);     // Funções inversas (arco)
    atan2(y, x);                     // Arctangente de y/x (melhor que atan)
    M_PI;                            // Constante π = 3.14159...
    // Conversão: rad = graus * (M_PI/180), graus = rad * (180/M_PI)
    
    // === OUTRAS ===
    fmod(x, y);                      // Resto divisão para float
    fmax(x, y) / fmin(x, y);         // Maior/menor de dois valores
    hypot(x, y);                     // Hipotenusa: √(x²+y²)
}

/* --------------------------------------------------------------------------------------
 * E. <ctype.h> - Classificação e Conversão de Caracteres
 * Todas retornam ≠0 se verdadeiro, 0 se falso
 * -------------------------------------------------------------------------------------- */
void referencia_ctype() {
    // === VERIFICAÇÃO ===
    isdigit(c);                      // É dígito 0-9?
    isalpha(c);                      // É letra A-Z, a-z?
    isalnum(c);                      // É letra OU dígito?
    isspace(c);                      // É espaço/tab/enter?
    ispunct(c);                      // É pontuação?
    isprint(c);                      // É imprimível (incluindo espaço)?
    isgraph(c);                      // É imprimível (exceto espaço)?
    iscntrl(c);                      // É char de controle?
    isupper(c) / islower(c);         // É maiúscula/minúscula?
    
    // === CONVERSÃO ===
    toupper(c);                      // Converte para maiúscula
    tolower(c);                      // Converte para minúscula
}

/* --------------------------------------------------------------------------------------
 * F. <time.h> - Data, Hora e Cronometragem
 * -------------------------------------------------------------------------------------- */
#include <time.h>
void referencia_time() {
    // === TIMESTAMP ===
    time_t now = time(NULL);         // Segundos desde 1970. Retorna: time_t ou -1
    
    // === CONVERSÃO/FORMATAÇÃO ===
    ctime(&now);                     // Converte para string legível
    struct tm *info = localtime(&now); // Converte para struct (hora local)
    gmtime(&now);                    // Converte para struct (UTC)
    // struct tm: tm_year (+1900), tm_mon (0-11), tm_mday, tm_hour, tm_min, tm_sec
    
    strftime(buf, tam, "%d/%m/%Y %H:%M:%S", info); // Formata customizado
    // Códigos: %d=dia %m=mês %Y=ano %H=hora24 %M=min %S=seg %A=dia_semana %B=mês
    
    mktime(&tm_struct);              // struct tm → time_t
    
    // === MEDIÇÃO ===
    difftime(fim, inicio);           // Diferença em segundos. Retorna: double
    clock_t t = clock();             // Ticks de CPU desde início do programa
    ((double)t) / CLOCKS_PER_SEC;    // Converte ticks → segundos
}

/* --------------------------------------------------------------------------------------
 * G. <stdbool.h> - Tipo Booleano (C99+)
 * -------------------------------------------------------------------------------------- */
#include <stdbool.h>
void referencia_bool() {
    bool ativo = true;
    bool pausado = false;
}

/* --------------------------------------------------------------------------------------
 * H. <limits.h> e <float.h> - Limites dos Tipos
 * -------------------------------------------------------------------------------------- */
#include <limits.h>
#include <float.h>
void referencia_limites() {
    INT_MAX / INT_MIN;               // Maior/menor int
    LONG_MAX / LONG_MIN;             // Maior/menor long
    CHAR_MAX / CHAR_MIN;             // Maior/menor char
    FLT_MAX / FLT_MIN;               // Maior/menor float
    DBL_MAX / DBL_MIN;               // Maior/menor double
}

/* --------------------------------------------------------------------------------------
 * I. <assert.h> - Assertivas para Debug
 * -------------------------------------------------------------------------------------- */
#include <assert.h>
void referencia_assert() {
    assert(x > 0);                   // Aborta se condição FALSA. Remover com -DNDEBUG
}

/* --------------------------------------------------------------------------------------
 * J. <errno.h> - Códigos de Erro
 * -------------------------------------------------------------------------------------- */
#include <errno.h>
void referencia_errno() {
    // errno: variável global com código do último erro
    perror("Mensagem");              // Imprime mensagem + erro de errno
    strerror(errno);                 // Converte errno em string. Retorna: string
    // Códigos comuns: ENOENT (não existe), EACCES (sem permissão), ENOMEM (sem memória)
}

/* --------------------------------------------------------------------------------------
 * K. <signal.h> - Tratamento de Sinais (Unix/Linux)
 * -------------------------------------------------------------------------------------- */
#include <signal.h>
void referencia_signal() {
    signal(SIGINT, handler_func);    // Define handler para sinal
    // Sinais: SIGINT (Ctrl+C), SIGTERM (término), SIGSEGV (segfault), SIGFPE (div/0)
}

/* --------------------------------------------------------------------------------------
 * L. BIBLIOTECAS NÃO-PADRÃO ÚTEIS
 * -------------------------------------------------------------------------------------- */
// <unistd.h> (POSIX): sleep(), usleep(), access(), chdir(), getcwd(), fork()
// <windows.h> (Windows): Sleep(), system("pause"), funções GUI, threads
// <pthread.h> (Threads): pthread_create(), pthread_join()
// <dirent.h> (Diretórios): opendir(), readdir(), closedir()
// <sys/stat.h> (Info arquivo): stat() - tamanho, permissões, data modificação
}

/* ======================================================================================
 * 9. MACROS E DIRETIVAS DO PREPROCESSADOR
}