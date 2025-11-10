/*
    Conceitos basicos de javascript
    O javascript é uma linguagem de tipagem dinamica
*/

// Metodo log dentro da classe console
console.log(`Texto teste`); // Mostra um texto no console   
console.log(123); // Mostra um numero no console

/*
    Variaveis são declaradas com let
    Variaveis não podem ser criadas com palavras reservadas
    Variaveis precisam ter nomes significativos
    Variaveis não podem começar com numero
    Variaveis não podem conter espaços ou traços
    Variaveis são case-sensitive (nome, Nome e NOME são variaveis diferentes)
    camelCase para variaveis (primeira letra minuscula e a primeira letra da segunda palavra maiuscula)
*/

// Declarando as variaveis

var nome1 = `Ricardo`; // Metodo antigo não recomendado
let nome = `André`; // Metodo atual
console.log(nome); // Mostra o valor da variavel nome no console
console.log(`Exibe o nome:`, nome, `Sem usar contatenação`); // Mostra o valor da variavel nome no console sem usar concatenação
console.log(`Exibe o nome: ` + nome + `Usando contatenação`); // Mostra o valor da variavel nome no console usando concatenação
let idade; // Declarei mas não inicializei
console.log(idade); // Mostra o valor (undefined) para variavel não delcarada
idade = 24; // Inicializando a variavel
console.log(idade); // Mostra o valor da variavel idade no console
console.log(`Meu nome é ` + nome + ` e minha idade é ` + idade); // Mostra o valor da variavel nome e idade no console usando concatenação
// Constantes - variaveis que não podem ter o valor alterado
const constante = 3.14; // Uma constante deve ser inicializada na declaração




