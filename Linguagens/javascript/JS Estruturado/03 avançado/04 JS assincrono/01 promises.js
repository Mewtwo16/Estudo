/*
    promises = promessas
    - Ao solicitar dados para APIs, voce não sabe quando está resposta vai voltar
*/

function random(min, max) {
    min *= 1000;
    max *= min;
    return Math.floor(Math.random() * (max - min) + min);
}

function espera(msg, tempo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(msg);
        }, tempo);
    });
}

espera('frase 1', random(1, 3)).then()
    .then(resposta => {
        console.log(resposta);
         return espera('Frase 2', random(1, 3))
        .then(resposta => {
            console.log(resposta)
            return espera('Frase 3', random(1, 3)).then(resposta => console.log(resposta));
        })})
    .catch();
