// 07 - Type Narrowing (refinamento de tipos)

// typeof
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log("ID em maiúsculas:", id.toUpperCase());
  } else {
    console.log("ID com 2 casas:", id.toFixed(2));
  }
}

// in (verifica propriedade)
type Quadrado = { kind: "quadrado"; lado: number };
type Retangulo = { kind: "retangulo"; largura: number; altura: number };
type Forma = Quadrado | Retangulo;

function area(f: Forma): number {
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

// Marca este arquivo como módulo
export {};
