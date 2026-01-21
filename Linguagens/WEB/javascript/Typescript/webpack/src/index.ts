// Frontend entry point
import './styles.css';

console.log('TypeScript + Webpack Frontend está rodando!');

// Exemplo de manipulação do DOM
const app = document.getElementById('app');

if (app) {
    const message = document.createElement('p');
    message.textContent = 'Olá do TypeScript! 🚀';
    message.style.color = '#007acc';
    message.style.fontSize = '20px';
    message.style.fontWeight = 'bold';
    app.appendChild(message);
}

// Exemplo de tipagem TypeScript
interface User {
    name: string;
    age: number;
}

const user: User = {
    name: 'Estudante',
    age: 25
};

console.log('Usuário:', user);
