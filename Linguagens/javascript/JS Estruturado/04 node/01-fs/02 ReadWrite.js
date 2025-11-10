const fs = require('fs').promises;
const path = require('path')

const caminhoArquivo = path.resolve(__dirname, 'teste.json');

const pessoa = [
    { nome: 'André' },
    { nome: 'Ricardo' },
    { nome: 'Taitne' },
    { nome: 'Yure' },
];
const json = JSON.stringify([pessoa])

fs.writeFile(caminhoArquivo, json, {
    flag: 'w', // Apaga tudo no arquivo e escreve novamente a flag a faz um append
    encoding: 'utf8' // Não é necessario enviar pois já é o padrão
})