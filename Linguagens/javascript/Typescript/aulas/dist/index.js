"use strict";
// This file serves as the entry point for the "aulas" folder.
// It contains TypeScript code that can be executed independently.
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = void 0;
const greet = (name) => {
    return `Hello, ${name}! Welcome to the Aulas project.`;
};
exports.greet = greet;
const main = () => {
    const message = (0, exports.greet)("Student");
    console.log(message);
};
main();
