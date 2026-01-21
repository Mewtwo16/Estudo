// This file serves as the entry point for the "aulas" folder.
// It contains TypeScript code that can be executed independently.

export const greet = (name: string): string => {
    return `Hello, ${name}! Welcome to the Aulas project.`;
};

const main = () => {
    const message = greet("Student");
    console.log(message);
};

main();