/*
    Fetch com json e axions
 */

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

fetch('pessoas.json')
.then(resposta => resposta.json())
.then(json => carregaElementos(json))


function carregaElementos(json){
    const table = document.createElement('table');
    for(let pessoa of json){
        const tr = document.createElement('tr')

        let td = document.createElement('td')
        td.innerHTML = pessoa.nome;
        tr.appendChild(td);

        let td2 = document.createElement('td')
        td.innerHTML = pessoa.idade;
        tr.appendChild(td2);

        let td3 = document.createElement('td')
        td.innerHTML = pessoa.salario;
        tr.appendChild(td3);

        table.appendChild(tr);
    }
    const resultado = document.querySelector('resultado');
    resultado.appendChild(table);
}
