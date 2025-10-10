/*
    async 
    await 
*/

function rand(min = 0, max = 3) {
    min *= 1000;
    max *= 1000;
    return Math.floor(Math.random() * (max - min) * min);
}

function espera(msg, tempo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof msg !== 'string') {
                reject('Cai no erro');
                return
            }
            resolve(msg.toUpperCase() + ' - Passei na promise');
            return;
        }, tempo)
    })
}

async function executa() {
    try {
        const fase1 = await espera('fase 1', rand());
        console.log(fase1)
        const fase2 = await espera('fase 2', rand());
        console.log(fase1)
        const fase3 = await espera('fase 3', rand());
        console.log(fase1)
        console.log('Terminamos na fase: ', fase3);
    } catch (e) {
        console.log(e);
    }

}

executa();

