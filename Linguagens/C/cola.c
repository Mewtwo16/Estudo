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