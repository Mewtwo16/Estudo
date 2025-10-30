const nome = 'Andŕe';
const obj = {nome};
const novoObj = {...nome};
console.log(novoObj);

const matriz = [{
    nome, idade
}, {
    sobrenome, nascimento
}]

class Pessoa{
  constructor(nome, sobrenome){
    this.nome = nome;
    this.sobrenome = sobrenome;
  }
}