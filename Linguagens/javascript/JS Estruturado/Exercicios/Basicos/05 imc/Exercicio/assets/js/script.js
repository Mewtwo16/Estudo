
// Função immediate invocation
(function (){
    

    const form = document.querySelector(".box-form");
    const imprimeResultado = document.querySelector(".box-resultado");
    // const pessoa = {};


    function recebeForm(event){

        event.preventDefault();

        const nome = form.querySelector("#input-nome");
        console.log(nome.value);
        const alturaValor = form.querySelector("#input-altura");
        const altura = parseFloat(alturaValor.value);
        console.log(altura);
        console.log(Number.isInteger(altura));
        const pesoValor = form.querySelector("#input-peso");
        const peso = parseFloat(pesoValor.value);
        console.log(peso);
        console.log(Number.isInteger(peso));

        const resultado = peso / (altura * altura);

        console.log(resultado);

        // pessoa.push({nome: nome.value, altura: altura.value, peso: peso.value});
        // console.log(`O dados do usuario ${pessoa} foram capitados`);

        if(resultado < 18.5) {
            imprimeResultado.innerHTML = `<p>${nome.value} voce está abaixo do peso</p>`;
        } else if(resultado >= 18.5 && resultado <= 24.9){
            imprimeResultado.innerHTML = `<p>${nome.value} voce está dentro do peso normal</p>`;
        } else if(resultado >= 25 && resultado <= 29.9){
            imprimeResultado.innerHTML = `<p>${nome.value} voce está com Sobrepeso</p>`;
        }else if(resultado >= 30 && resultado <= 34.9){
            imprimeResultado.innerHTML = `<p>${nome.value} voce está obesidade grau 1</p>`;
        }else if(resultado >= 35 && resultado <= 39.9){
            imprimeResultado.innerHTML = `<p>${nome.value} voce está obesidade grau 2</p>`;
        }else if(resultado >= 40){
            imprimeResultado.innerHTML = `<p>${nome.value} voce está obesidade grau 3</p>`;
        }else {
            imprimeResultado.innerHTML = `<p> Os valores digitados são invalidos</p>`;
        }
    };

    form.addEventListener(`submit`, recebeForm);


})();