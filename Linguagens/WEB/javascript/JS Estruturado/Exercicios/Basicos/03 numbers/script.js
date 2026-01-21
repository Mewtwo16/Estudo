/* Exercicio */

let n = prompt(`Digite um numero`);
n = parseFloat(n);

const nTitulo = document.getElementById(`titulo-span`);
const nTexto = document.getElementById(`div-texto`);

nTitulo.innerHTML = n;
nTexto.innerHTML += `A raiz quadrada é ${n ** 0.5}<br/>`;
nTexto.innerHTML += `${n} é um inteiro: ${Number.isInteger(n)}<br/>`;
nTexto.innerHTML += `É NaN: ${Number.isNaN(n)}<br/>`;
nTexto.innerHTML += `Arredondado para baixo: ${Math.floor(n)}<br/>`;
nTexto.innerHTML += `Arredondado para cima: ${Math.ceil(n)}<br/>`;
nTexto.innerHTML += `Com duas casas decimais: ${n.toFixed(2)}<br/>`;
