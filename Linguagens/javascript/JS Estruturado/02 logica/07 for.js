// for classico

const nome = ['André','Ricardo','Monteiro'];
const frutas = ["Maçã", "Pera", "Uva"];
const pessoa = {
    nome: 'André',
    sobrenome: 'Ricardo',
    idade: 24
};

for(let i = 0; i < 6; i++){
    console.log(`Contando ${i}`);
}

for(let i = 0; i < 11; i++){
    const par = i % 2 === 0 ? 'par' : 'impar';
    console.log(i, par);
}



for(let i = 0; i < frutas.length; i++){
    console.log(frutas[i]);
}

// for in - Le indices ou chaves

for( let indice in frutas){
    console.log(indice, frutas[indice]);
}

for(let chave in pessoa){
    console.log(chave, pessoa[chave]);
}

// for of - pega o valor de itens iteraveis 

for(let valor of nome){
    console.log(valor)
}

// foreach - apenas para arrays

nome.forEach((valor, indice, array) =>{
    console.log(valor, indice, array);
})

const a1 = [10,20,30,40,50,60,70,80,90];
let total = 0;
a1.forEach((valor) => {
    total += valor;
});