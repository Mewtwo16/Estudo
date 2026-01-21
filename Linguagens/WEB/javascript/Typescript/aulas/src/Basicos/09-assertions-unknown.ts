// 09 - Assertions e Unknown

let valorDesconhecido: unknown = "talvez string";

// Checagem antes de usar
if (typeof valorDesconhecido === "string") {
  // Aqui o TS sabe que é string
  console.log(valorDesconhecido.toUpperCase());
}

// Type assertion (use com cautela)
const comoString = valorDesconhecido as string;
console.log("Como string (pode ser undefined em runtime se a suposição falhar):", comoString);

// Non-null assertion (use raramente)
type ElementoFake = { id: string };
function getEl(id: string): ElementoFake | null {
  return { id }; // exemplo fictício
}

const el = getEl("app")!; // dizendo ao TS que não é null
console.log("Elemento:", el.id);

// Marca este arquivo como módulo
export {};
