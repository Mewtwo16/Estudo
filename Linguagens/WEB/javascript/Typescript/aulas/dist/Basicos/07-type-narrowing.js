"use strict";
// 07 - Type Narrowing (refinamento de tipos)
Object.defineProperty(exports, "__esModule", { value: true });
// typeof
function printId(id) {
    if (typeof id === "string") {
        console.log("ID em maiúsculas:", id.toUpperCase());
    }
    else {
        console.log("ID com 2 casas:", id.toFixed(2));
    }
}
function area(f) {
    switch (f.kind) {
        case "quadrado":
            return f.lado * f.lado;
        case "retangulo":
            return f.largura * f.altura;
    }
}
printId("abc");
printId(12.3456);
console.log("Área quadrado:", area({ kind: "quadrado", lado: 3 }));
console.log("Área retângulo:", area({ kind: "retangulo", largura: 4, altura: 2 }));
