/*
    Operadores aritméticos em javaScript
    + Adição
    - Subtração
    * Multiplicação
    / Divisão
    ** Potenciação (ES6)
    % Resto da divisão
    ++ Incremento (adiciona +1)
    -- Decremento (subtrai -1)
    Ordem de precedência ((), **, *, /, %, +, -)
*/

let n1 = 5;
let n2 = 10;
let n3 = 2;
console.log(n1 + n2); // Adição
console.log(n1 - n2); // Subtração
console.log(n1 * n2); // Multiplicação
console.log(n1 / n2); // Divisão
console.log(n1 ** n2); // Potenciação
console.log(n2 % n1); // Resto da divisão
console.log(n1 + n2 * n3); // Ordem de precedência (multiplicação antes da adição)
console.log(n1++); // Incremento (adiciona +1)
console.log(n1); // Mostra o valor atualizado de n1
console.log(n2--); // Decremento (subtrai -1)
console.log(n2); // Mostra o valor atualizado de n2
n1 += 5; // n1 = n1 + 5

