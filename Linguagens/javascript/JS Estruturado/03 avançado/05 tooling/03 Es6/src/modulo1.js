
const nome = 'André';
const sobrenome= 'Ricardo';
const idade = 30;

// Pode ter somente um default por module
export default function soma(x, y){
    return x + y;
}

export {nome, sobrenome, idade};