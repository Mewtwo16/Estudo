/*
    Como dizer para o typescript o tipo da variavel:

    const variavel: tipo = valor;

    ? = torna opcional a necessidade daquele

    Non-null assertion Operator (!) - Diz para o typescript que aquele valor nunca será nulo ou indefinido
    Type Assertion (as) - Diz para o typescript que aquele valor é de um tipo especifico

*/

// Tipos basicos - as variaveis a baixo não precisariam aferir tipos pois o ts iria identificar automaticamente
let nome: string = 'André';
let idade: number = 24; // inteiros e floats (todos os tipos de numeros)
let adulto: boolean = true;
let simbolo: symbol = Symbol('Qualquer-symbolo');


// funções - Não necessariamente vai ser sempre necessario tipar a função
function soma(x: number, y: number): number{
    return x + y;
}
// outra fomar de declarar função
const soma2: (x: number, y: number) => number = (x,y) => x + y;

// any (falta de tipo ou qualquer coisa)
function showMessage(msg: any){
    return msg;
} // Utilizar any apenas em ultimo caso

// Tipo - void (Classico, refere que não retorna nada)
function semRetorno(...args: string[]): void {
    console.log(args.join(' '));
}; semRetorno('André', 'Ricardo');

// object
// O melhor uso para objetos é definir seus proprios tipos
let pessoa: {nome: string, idade: number, adulto?: boolean} = {
    nome: 'Ricardo',
    idade: 25
}

const objetoA: {
    chaveA: string;
    chaveB: string;
    chaveC?: string;
    [key: string]: unknown // Uma forma de definir os tipos do objeto(pouco eficiente)
} = {
    chaveA: 'Valor A',
    chaveB: 'Valor b'
};
objetoA.chaveA = 'Outra chave';

// Arrays - deve-se passar o tipo do conteudo do array
let arraysDeNumeros: Array<number> = [ 1, 2, 3 ];
let arrayDeNumeros: number[] = [ 1, 2, 3 ] // Está forma funciona para todos os tipos

function multplicaArgs(...args: Array<number>): number {
    return args.reduce((ac, valor) => ac * valor, 1)
}
function concatenaString(...args: string[]): string{
    return args.reduce((ac, valor) => ac + valor);
}

function toUpperCase(...args: string[]): string[]{
    return args.map((valor) => valor.toUpperCase());
}

const result = multplicaArgs(1, 2, 3);
const concatena = concatenaString('a', 'b', 'c');
const upper = toUpperCase('a', 'b', 'c');

console.log(result);
console.log(concatena);
console.log(upper);

// Tuplas (tuplas são arrays com tamanhos fixos, normalmente são imutaveis, mas não no JS/TS)
const dadosCliente: [number, string] = [1, 'André'];
dadosCliente[0] = 100;
dadosCliente[1] = 'André'
// dadosCliente[2] = 'outro valor'; // está linha da erro
console.log(dadosCliente);

// null - undefined = não valor

function createPerson(fistName: string, lastName?: string): {
    fistName: string,
    lastName?: string | undefined,
} {
    return {
        fistName,
        lastName,
    };
}
// never - não valor
// Quando nunca irá retornar nada
function criaErro(): never{
    throw new Error('Erro qualquer');
}

// Enum - é uma estrutura de dados
enum Cores { // Separados por indice
    vermelho, // 0
    azul,     // 1
    amarela = 200,  // 200 - pode-se ser alterado o valor do indice
}; console.log(Cores); // Permite chamar o valor que não existe exemplo cores[2]

// unknown - any, porem mais seguro

let x: unknown;
x = 100;
x = 'André';
x = 900;
x = '10';
const y = 800;
// Força a fazer checagem de tipo antes de utilizar a variavel
if (typeof x === 'number') console.log(x + y); // se a chegagem retornaria um erro

// union types - variaveis que podem ter mais de um valor

function addOrConcat(a: number | string, b: number | string): number | string {
    if(typeof a === 'number' && typeof b === 'number') return a + b;
    return `${a} ${b}`;
}

// tipos literais - utilizar valores como tipos

const z = 10; // Tipo literal(só pode ser 10 pois é uma constante)
let w: 10 = 10; // Feito com let(o valor let só pode ser 10)

// type alias (apelidos para tipos)
type Idade = number;
type corRGB = 'vermelho' | 'Verde' | 'Azul'
type corCMYK = 'Ciano' | 'Magenta' | 'Amarelo' | 'Preto'
type corPreferida = corRGB | corCMYK
type Humano = {
    nome: string,
    idade: Idade; // tipo dentro de tipo
    salario: number;
    corPreferida?: corPreferida;
}
const human: Humano = {
    idade: 30,
    nome: 'André',
    salario: 200_000,
};
function setCorPreferida(human: Humano, cor: corPreferida){
    return {...human, corPreferida: cor};
}

// Intersection Types (&)
type TemNome = { nome: string };
type TemSobrenome = { sobrenome: string };
type TemIdade = { idade: number };
type PessoaTipos = TemIdade & TemNome & TemSobrenome // Se usar o | ele não torna obrigatorio a necessidade de cada tipo

// Funções como tipos

type MapStringsCallback = (item: string) => string

function mapString(array: string[], callbackfn: MapStringsCallback): string[]{
    const newArray: string[] = [];
    for (const item of array) {
        newArray.push(callbackfn(item));
    }
    return newArray;
};
const abc = [ 'a', 'b', 'c'];
const abcMapped = mapString(abc, (item) => {
    return item.toUpperCase();
});
console.log(abcMapped);
