// Importando o fs do node para adiministrar arquivos
import fs from "fs/promises";

async function manipArq(params) {
    console.log("Iniciando a leitura do arquivo...");

    const lerArq = async (path) => {
        if (path) {
            console.log(`Entrando no bloco if`);
            try {
                console.log(`Iniciando o Try`);
                const conteudo = await fs.readFile(path, "utf-8");
                console.log(`O conteudo do arquivo é: ${conteudo}`);
            } catch {
                console.error(`Erro na leitura do arquivo`);
                return 1;
            }
        } else {
            console.log(`Caminho não existe`);
        }
    };

    const escreveArq = async (path) => {
        if(path){
            console.log(`Entrando no if`);
            try{
                console.log(`Tentando ler arquivo`);
                const newText = "Escrevendo no arquivo em " + new Date().toLocaleTimeString();
                const conteudo = await fs.writeFile(path, newText);
                console.log(`O conteudo do arquivo é: ${conteudo}`);
            } catch{
                console.error(`Falha na leitura do arquivo`);
                return 1;
            }
        } else {
            console.log(`Caminho nâo existe`);
        }
    };

const texto = lerArq(`Teste.txt`);

console.log(texto);

console.log(`Iniciando a escrita no arquivo`);

const novoTexto = escreveArq(`Teste.txt`);

console.log(`Novo conteudo = ${novoTexto}`);

}



manipArq();
