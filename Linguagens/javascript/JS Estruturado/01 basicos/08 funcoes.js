/*
    Basico de funções
*/


function imprime(nome){
    return `bom dia ${nome}`;
};

function soma(x, y){
    const resultado = x + y; 
    return resultado;
};

let var1 = imprime(`Andre`);
console.log(var1);

console.log(soma(5, 10));

// Posso criar uma função anonima

const raiz = function(n) {
    return n ** 0.5;
};

console.log(raiz(9));

// Forma moderna de criar funções
// Arrow function 
const divide = (x, y) => {
    return x / y;
}; // poderia ser const divide = (x, y) => x / y;

console.log(divide(10,2));
