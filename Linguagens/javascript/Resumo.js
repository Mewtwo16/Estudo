/*
===================================================================
==  JavaScript: O Guia de Consulta Completo ("A Cola Definitiva") ==
===================================================================

Este arquivo serve como um guia de referência rápida para os conceitos
fundamentais de JavaScript procedural e manipulação de DOM.

Autor: Saga (Seu Tutor de IA)
Data: 03 de Setembro de 2025

*/

// ===================================================================
// PARTE 1: FUNDAMENTOS DA LINGUAGEM
// ===================================================================

/*
-------------------------------------------------------------------
1. O Básico
-------------------------------------------------------------------
*/

// --- 1.1. Comentários ---
// Comentário de uma linha

/*
  Comentário de
  múltiplas linhas.
*/


// --- 1.2. Declaração de Variáveis ---

// const (Constante - Moderna e Preferencial): Use para valores que não serão alterados.
// const PI = 3.14;

// let (Variável - Moderna): Use para valores que podem ser reatribuídos.
// let contador = 0;

// var (Variável - Clássica): Evite em código moderno. Possui regras de escopo confusas.
// var nome = 'André';


// --- 1.3. Tipos de Dados Primitivos ---

// string: Texto. Ex: 'Olá, mundo!', `"Olá, mundo!"`, `Olá, mundo!`.
// number: Números (inteiros ou ponto flutuante). Ex: 10, 3.14.
// boolean: Verdadeiro ou falso. Ex: true, false.
// undefined: Uma variável declarada mas sem valor.
// null: Representa a ausência intencional de um valor.


/*
-------------------------------------------------------------------
2. Operadores
-------------------------------------------------------------------
*/

// --- 2.1. Aritméticos ---
// + (Soma), - (Subtração), * (Multiplicação), / (Divisão)
// % (Módulo/Resto da divisão): 10 % 3  -> retorna 1
// ** (Exponenciação): 2 ** 3 -> retorna 8
// ++ (Incremento), -- (Decremento)

// --- 2.2. Comparação ---
// === (Estritamente igual - valor E tipo). (Recomendado)
// Ex: 5 === '5' -> false

// !== (Estritamente diferente - valor E tipo). (Recomendado)
// Ex: 5 !== '5' -> true

// >, <, >=, <=

// == (Igual - tenta converter os tipos). (Evitar)
// Ex: 5 == '5' -> true


// --- 2.3. Lógicos ---
// && (E Lógico): true && false -> false
// || (OU Lógico): true || false -> true
// ! (NÃO Lógico): !true -> false


/*
-------------------------------------------------------------------
3. Estruturas de Controle
-------------------------------------------------------------------
*/

// --- 3.1. Condicional if / else if / else ---
/*
const hora = 14;
if (hora < 12) {
  console.log('Bom dia!');
} else if (hora < 18) {
  console.log('Boa tarde!');
} else {
  console.log('Boa noite!');
}
*/

// --- 3.2. Operador Ternário (Atalho para if/else) ---
// const status = idade >= 18 ? 'Adulto' : 'Menor de idade';


// --- 3.3. switch (Para múltiplas condições) ---
/*
const permissao = 'admin';
switch (permissao) {
  case 'admin':
    console.log('Acesso total.');
    break; // Essencial para não "cair" nos casos abaixo
  case 'editor':
    console.log('Acesso para editar.');
    break;
  default:
    console.log('Acesso de visitante.');
}
*/


/*
-------------------------------------------------------------------
4. Laços de Repetição (Loops)
-------------------------------------------------------------------
*/

// --- 4.1. for (Clássico) ---
/*
for (let i = 0; i < 5; i++) {
  console.log(`O número é ${i}`);
}
*/

// --- 4.2. while ---
/*
let numero = 0;
while (numero < 5) {
  console.log(`O número é ${numero}`);
  numero++;
}
*/

// --- 4.3. for...of (Moderno - para Arrays e Strings) ---
/*
const frutas = ['Maçã', 'Banana', 'Laranja'];
for (const fruta of frutas) {
  console.log(fruta);
}
*/


/*
-------------------------------------------------------------------
5. Funções
-------------------------------------------------------------------
*/

// --- 5.1. Declaração de Função (Clássica) ---
/*
function somar(a, b) {
  return a + b;
}
*/

// --- 5.2. Arrow Function (Moderna e Recomendada) ---
/*
const subtrair = (a, b) => {
  return a - b;
};

// Se a função só tem uma linha e um retorno, pode ser mais curta:
const multiplicar = (a, b) => a * b;
*/


// ===================================================================
// PARTE 2: MANIPULAÇÃO DA PÁGINA (DOM)
// ===================================================================

/*
-------------------------------------------------------------------
6. Teoria do DOM (Document Object Model)
-------------------------------------------------------------------
// O DOM é a representação em memória do seu arquivo HTML. O JavaScript
// manipula essa "árvore viva" de objetos, e o navegador atualiza
// a página para refletir as mudanças.
*/


/*
-------------------------------------------------------------------
7. Selecionando Elementos
-------------------------------------------------------------------
*/

// --- Pelo ID (Rápido) ---
// const elemento = document.getElementById('meu-id-unico');

// --- Pelo seletor CSS (Versátil - Recomendado) ---
// const primeiroElemento = document.querySelector('.minha-classe'); // Pega o primeiro
// const todosOsElementos = document.querySelectorAll('nav ul li a'); // Pega todos


/*
-------------------------------------------------------------------
8. Manipulando Elementos
-------------------------------------------------------------------
*/

// --- 8.1. Conteúdo (Texto e HTML) ---
// elemento.textContent = 'Novo texto aqui.'; // Altera apenas o texto (Seguro)
// elemento.innerHTML = '<h2>Novo Título</h2>'; // Altera o HTML interno (Cuidado com segurança!)


// --- 8.2. Atributos ---
// const imagem = document.querySelector('img');
// imagem.src = 'nova-imagem.jpg'; // Acesso direto
// imagem.setAttribute('data-info', 'valor-customizado'); // Método genérico


/*
-------------------------------------------------------------------
9. Manipulando Estilos (CSS)
-------------------------------------------------------------------
*/

// --- Diretamente no Estilo (Não Recomendado) ---
// elemento.style.color = 'red';
// elemento.style.backgroundColor = 'yellow'; // Propriedades com hífen viram camelCase


// --- Manipulando Classes (Melhor Prática) ---
// A lógica de estilo fica no arquivo .css, o JS apenas gerencia as classes.
// elemento.classList.add('classe-nova');
// elemento.classList.remove('classe-antiga');
// elemento.classList.toggle('classe-ativa'); // Adiciona se não tiver, remove se tiver
// const temClasse = elemento.classList.contains('outra-classe'); // Retorna true ou false


/*
-------------------------------------------------------------------
10. Gerenciando Eventos
-------------------------------------------------------------------
*/

// --- addEventListener (Moderno e Recomendado) ---
// Permite adicionar múltiplas funções para o mesmo evento.
/*
const botao = document.getElementById('meu-botao');

function handleClick(event) {
  event.preventDefault(); // Impede o comportamento padrão (ex: enviar formulário)
  console.log('Botão clicado!', event.target); // event.target é o elemento que foi clicado
}

botao.addEventListener('click', handleClick);
*/