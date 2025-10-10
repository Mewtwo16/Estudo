/*
    XMLHttpRequest(GET) + Promises
*/

const request = obj => {
    const xhr = new XMLHttpRequest();
    // Verbo: HTTP - GET(busca um conteudo)
    xhr.open(obj.method, obj.url, true);
    // xhr.send(); // Em caso de formularios

    xhr.addEventListener('load', () => {
        //Verificação se foi succeso ou falha
        if (xhr.status >= 200 && xhr.status < 300) {
            obj.success(xhr.responseText) // Usando callback
        } else {
            obj.error(
                xhr.statusText
            )
        }
    });

    xhr.send();
}

document.addEventListener('click', e => {
    const el = e.target;
    const tag = el.tagName.toLowerCase();

    if (tag === 'a') {
        e.preventDefault();
        carregaPagina(el);
    }


});


function carregaPagina(el) {
    const href = el.getAttribute('href');
    request({
        method: 'GET',
        url: href,
        success(response) {
            carregaResultado(response);
        },
        error(errorText) {
            console.log(errorText)
        }
    })
}

function carregaResultado(response) {
    const resultado = document.querySelector('.resultado');
    resultado.innerHTML = response;
}