/*
    FS - File System
*/

const fs = require('fs').promises; // com .promises utiliza a função com promessas
const { read } = require('fs');
const path = require('path');

// leitura de diretorio com promises
fs.readdir(path.resolve(__dirname)) // Le o diretorio usando path.resolve
.then(files => console.log(files)) // Retorna um array do path
.catch(e => console.log(e));

// Leitura de diretorios
async function readdir(rootDir) {
    rootDir = rootDir || path.resolve(__dirname);
    const files = await fs.readdir(rootDir);
    walk(files, rootDir);
}

// Função walk que trata os diretorios e exibe somente o desejado
async function walk(files, rootDir){
    for(let file of files){
        const fileFullPath = path.resolve(rootDir, file);
        const stats = await fs.stat(fileFullPath);

        if(/\.git/g.test(fileFullPath)) continue; // Utiliza expressões regulares para filtrar os arquivos
        if(/node_modules/g.test(fileFullPath)) continue;

        if(stats.isDirectory()){
            readdir(fileFullPath);
            continue;
        }
        //Utiliza expressões regulares para escolher os arquivos
        if(!/\.css/g.test(fileFullPath) && !/\.html/g.test(fileFullPath)) continue; 
        
        console.log(file, stats.isDirectory());
    }
}
readdir('/home/andre/DEV/Estudo/Faculdade');