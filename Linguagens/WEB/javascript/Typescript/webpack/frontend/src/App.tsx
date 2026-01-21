import { useState } from 'react';
import '../src/assets/css/style.css';

/*
  Componente App - exemplo de React + TypeScript

  Demonstra:
  - Tipagem de props e state com TypeScript
  - Hooks (useState) com tipos inferidos
  - Event handlers tipados
  - JSX/TSX syntax
*/

interface User {
  name: string;
  age: number;
}

function App() {
  const [count, setCount] = useState<number>(0);
  const [user] = useState<User>({
    name: 'Estudante',
    age: 25,
  });

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="app">
      <header>
        <h1>TypeScript + Webpack + React 🚀</h1>
        <p>Ambiente configurado para estudos de React com TypeScript</p>
      </header>

      <main>
        <section className="user-info">
          <h2>Informações do Usuário</h2>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Idade:</strong> {user.age} anos</p>
        </section>

        <section className="counter">
          <h2>Contador</h2>
          <p className="count-display">{count}</p>
          <button onClick={handleIncrement}>Incrementar</button>
        </section>
      </main>

      <footer>
        <p>Consolidando estudos de React + TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
