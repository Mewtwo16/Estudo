/*
    fetch

    Exemplo: 

// fetch('pag1.html', {})
// .then(resposta => {
//     if(resposta.status !== 200) throw new Error('Erro 404');
//     return resposta.text();
// })
// .then(html => console.log(html))
// .catch(e => console.error(e));

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


async function carregaPagina(el) {
    try {
        const href = el.getAttribute('href');
        const response = await fetch(href);
        if (response.status !== 200) throw new Error('Erro 404!')
        const html = await response.text()
        carregaResultado(html)
    } catch (e) {
        console.log(e);
    }

}

function carregaResultado(response) {
    const resultado = document.querySelector('.resultado');
    resultado.innerHTML = response;
}
