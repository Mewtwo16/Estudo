/*
    Gerador de cpf
    705.484.450-52

    7   0   5 - 4   8   4 - 4   5   0 / 5   2
    *   *   *   
    10  9   8   7   6   5   4   3   2
    70  0   40  28  48  20  16  15  0 = 237

    11 - (237 % 11) = 5 (primeiro digito) (não pode ser maior que 9  se for = 0)

    7   0   5 - 4   8   4 - 4   5   0 / 5   2
    *   *   *   *   *   *   *   *   *   *   
    11  10  9   8   7   6   5   4   3   2
    77  0   45  32  56  24  20  20  0   10 = 284

    11 - (284 % 11) = 2

    .replace(/\D+/g, '') remove tudo que não for numero
    Array.from(variavel) converte para array
*/

(function () {
    const form = document.querySelector('.validaCPF')
    const inputCPF = document.querySelector('#cpf');
    const resultado = document.querySelector('#resultado');

    const validaDigito1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const validaDigito2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];


    function validaCPF(){
        console.log(inputCPF);
        const cpfBruto = inputCPF.value;
        const cpfTemp = cpfBruto.replace(/\D+/g, "");
        const cpf = Array.from(cpfTemp);
        console.log(cpf);

        const vd1CPF = cpf.slice(0, 9);
        const digito1 = validaDigito(vd1CPF, validaDigito1);
        console.log(digito1);

        if (digito1 !== Number(cpf[9])) {
            resultado.innerHTML = '[calculo 1]CPF Invalido';
            return;
        };

        vd1CPF.push(digito1);
        const vd2CPF = vd1CPF;
        const digito2 = validaDigito(vd2CPF, validaDigito2);
        console.log(digito2);
        if (digito2 !== Number(cpf[10])) {
            resultado.innerHTML = '[calculo 2]CPF Invalido';
            return;
        };

        return true;
    }

    function validaDigito(d, validador) {

        const digito = (d.reduce((ac, d, i) => {
            return ac += Number(d) * validador[i];
        }, 0));
        console.log(digito)
        if ((11 - (digito % 11)) > 9) {
            return 0;
        } else {
            return 11 - (digito % 11);
        }
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        if(validaCPF() !== true) return;
        resultado.innerHTML = '<p>CPF valido!</p>';
    })
})();
