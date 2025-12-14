"use strict";
// 06 - Type Aliases, Union e Intersection
Object.defineProperty(exports, "__esModule", { value: true });
function imprimirId(id) {
    if (typeof id === "string") {
        console.log("ID (str):", id.toUpperCase());
    }
    else {
        console.log("ID (num):", id.toFixed(0));
    }
}
const p2 = { x: 10, y: 20 };
const p3 = { x: 1, y: 2, z: 3 };
imprimirId("abc");
imprimirId(123);
console.log("P2:", p2, "P3:", p3);
