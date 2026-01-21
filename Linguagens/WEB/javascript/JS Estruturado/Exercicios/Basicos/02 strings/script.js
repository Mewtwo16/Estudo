// Exercicio

/* 
    Respondendo as perguntas e escrevendo no body do HTML: 

Seu nome é:
Seu nome tem ______ letras
A segunda letra do seu nome é: ______
Qual o primeiro índice da letra LETRA no seu nome? ______
Qual o último índice da letra LETRA no seu nome? ______
As últimas 3 letras do seu nome são: ______
As palavras do seu nome são: ______
Seu nome com letras maiúsculas: ______
Seu nome com letras minúsculas: ______


*/
 //0123456789101112
// Andre Ricardo

const nome = prompt(`Qual seu nome completo?`);
document.body.innerHTML += `O seu nome é: ${nome} <br />`;
document.body.innerHTML += `O seu nome tem ${nome.length} letras <br />`;
document.body.innerHTML += `A segunda letra do ${nome[1]} <br />`;
document.body.innerHTML += `O nome em maiusculo ${nome.toUpperCase()} <br />`;
document.body.innerHTML += `O nome em minusculo ${nome.toLowerCase()} <br />`;
document.body.innerHTML += `As 3 ultimas letras são ${nome.slice(-3)} <br />`;