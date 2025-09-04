/*
    Exercicio 04: Javascript Basico
*/

function escopo(){
    const form = document.querySelector(`#formulario`);
    const resultado = document.querySelector(`#box-log`);

    const pessoas = [];
        /*form.onsubmit = function (evento) {
            evento.preventDefault();
            alert(`1`);
        };*/ // Forma antiga


    function recebeEvento(evento){
        evento.preventDefault();
        const nome = form.querySelector(`#box-nome`);
        const sobrenome = form.querySelector(`#box-sobrenome`);
        const peso = form.querySelector(`#box-peso`);
        const altura = form.querySelector(`#box-altura`);

        pessoas.push({nome: nome.Value, sobrenome: sobrenome.Value, peso: peso.Value, altura: altura.Value});

        resultado.innerHTML = `<p>${nome.value} - ${sobrenome.value} - ${peso.value} - ${altura.value}<p/>`;
    }




    form.addEventListener(`submit`, recebeEvento);
}

escopo();