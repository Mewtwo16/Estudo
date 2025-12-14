// 06 - Type Aliases, Union e Intersection

// Alias de tipo
type ID = string | number;

// Tipos de objeto
type Ponto2D = { x: number; y: number };

// Intersection type (combina propriedades)
type Ponto3D = Ponto2D & { z: number };

function imprimirId(id: ID) {
  if (typeof id === "string") {
    console.log("ID (str):", id.toUpperCase());
  } else {
    console.log("ID (num):", id.toFixed(0));
  }
}

const p2: Ponto2D = { x: 10, y: 20 };
const p3: Ponto3D = { x: 1, y: 2, z: 3 };

imprimirId("abc");
imprimirId(123);
console.log("P2:", p2, "P3:", p3);

// Marca este arquivo como módulo
export {};
