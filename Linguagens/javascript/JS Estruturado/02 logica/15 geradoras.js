/*
    funções geradoras
        Retorna apenas 1 yield por chamada 
*/

function* geradora1(){
    yield 'valor 1';

    yield 'valor 2';

    yield 'valor 3';
};

const g1 = geradora1();
console.log(g1.next().value);
console.log(g1.next().value);
console.log(g1.next().value);

for(let valor of g1){
    console.log(valor);
}

function* geradora2(){
    let i = 0;
    while(true){
        yield i;
        i++;
    }
}

const g2 = geradora2();

for(let valor = 0; valor >= 20; valor++){
    for(let i of g2){
        console.log(i);
    }
}