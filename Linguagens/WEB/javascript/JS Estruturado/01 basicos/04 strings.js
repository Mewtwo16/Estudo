/*
    Mais sobre strings
*/

let umaString = "Um texto";

// Strings são indexadas (Não é unico da linguagem)
// Indice sempre começa do 0
console.log(`Indice com [] ${umaString[4]}`);
// Funçoes para manipular string
console.log(`indice com .charAt() ${umaString.charAt(4)}`); // Faz o mesmo que []
console.log(`A função .indexOf() retorna o indice a palavra começa ${umaString.indexOf(`texto`)}`); // Procura um item no indice
console.log(`A função .match() retorna um expressão regular ${umaString.match(/[a-z]/g)}`); // Há tambem search 
console.log(`A função .replace() me permite substituir um indice ${umaString.replace(`um`, `outra`)}`); // Posso usar expressões regulares usando /expressão/
console.log(`O tamanho da string é: ${umaString.length}`); // Mostra o tamanho da string
console.log(`A string fatiada: ${umaString.slice(3, 9)}`); // Fatia uma string informando o indice de inicio e fim aceitando negativo
