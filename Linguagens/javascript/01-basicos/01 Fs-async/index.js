// Importando o fs do node para adiministrar arquivos
import fs from "fs/promises";

async function manipArq(params) {
    console.log("1 - Iniciando a leitura do arquivo...");

    const lerArq = async (path) => {
        if (path) {
            console.log(`3 - Entrando no bloco if`);
            try {
                console.log(`4 - Iniciando o Try`);
                const conteudo = await fs.readFile(path, "utf-8");
                console.log(`5 - Conteudo lido com suscesso`);
                return conteudo;
            } catch {
                console.error(`Erro na leitura do arquivo`);
                return 1;
            }
        } else {
            console.log(`Caminho não existe`);
        }
    };

    const escreveArq = async (path, novoTxt) => {
        if (path) {
            console.log(`9 - Entrando no if`);
            try {
                console.log(`10 - Tentando ler arquivo`);
                const temp = novoTxt + " Escrevendo no arquivo em " + new Date().toLocaleTimeString();
                await fs.writeFile(path, temp);
                console.log(`11 - O conteudo do arquivo é: ${temp}`);
            } catch {
                console.error(`Falha na leitura do arquivo`);
                return 1;
            }
        } else {
            console.log(`Caminho nâo existe`);
        }
    };

    try {
        console.log(`2 - Chamando a função lerArq`);
        const conteudoLido = await lerArq(`Teste.txt`);
        const conteudoModificado = conteudoLido.toUpperCase();
        console.log(`6 - Imprimindo conteudo lido: `);
        console.log(conteudoLido);

        console.log(`7 - Iniciando a escrita no arquivo`);
        console.log(`8 - Chamando a função escreveArq`);
        await escreveArq(`Log.txt`, conteudoModificado);
        const novoTexto = await lerArq(`Log.txt`);
        console.log(`12 - Imprimindo variavel novoTexto: `);
        console.log(`13 - Novo conteudo = ${novoTexto}`);


    } catch{
        console.error(`Falha na aplicação principal!`);
    };


}



manipArq();
