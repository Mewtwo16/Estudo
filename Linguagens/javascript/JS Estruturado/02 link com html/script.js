/*
    Comandos de navegador
*/

// Emite um alerta no navegador
alert('Vamos somar?');

// Emite um alerta que pode retornar um boleano
// window.confirm('Deseja realmente apagar?');
// Posso armazenar o retorno em variaveis
// let confirma = confirm("Testando");

// Emite um alerta que pode retornar uma string
let nome = prompt('Digite seu nome: ');

//EXercicio: 

let n1 = prompt ('Digite um numero: ');
let n2 = prompt ('Digite outro numero: ');

n1 = parseFloat(n1)
n2 = parseFloat(n2)

let resultado = n1 + n2;

alert(`${nome} o resultado é ${resultado}`);
