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

class CPF {
  #cpf;

  constructor(cpfLimpo) {
    this.#cpf = cpfLimpo;
  }

  static criar(cpf) {
    const cpfLimpo = String(cpf).replace(/\D+/g, '');

    if (this.#validaFormato(cpfLimpo) && !this.#ehSequencia(cpfLimpo)) {
      const digito1 = this.#calculaDigitoVerificador(cpfLimpo.slice(0, 9));
      const digito2 = this.#calculaDigitoVerificador(cpfLimpo.slice(0, 10));

      if (digito1 === Number(cpfLimpo[9]) && digito2 === Number(cpfLimpo[10])) {
        return new CPF(cpfLimpo);
      }
    }

    return null;
  }

  static #validaFormato(cpfLimpo) {
    return cpfLimpo.length === 11;
  }

  static #ehSequencia(cpfLimpo) {
    const primeiroDigito = cpfLimpo[0];
    return cpfLimpo.split('').every(digito => digito === primeiroDigito);
  }

  static #calculaDigitoVerificador(cpfParcial) {
    const cpfArray = Array.from(cpfParcial).map(Number);
    let regressivo = cpfArray.length + 1;

    const soma = cpfArray.reduce((ac, val) => {
      ac += (regressivo * val);
      regressivo--;
      return ac;
    }, 0);

    const resultado = 11 - (soma % 11);

    return resultado > 9 ? 0 : resultado;
  }

  get valor() {
    return this.#cpf;
  }

  formata() {
    return this.valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}

// --- Testando o Código ---
const cpfCorreto = '418.329.468-19';
const novoCPF = CPF.criar(cpfCorreto);

if (novoCPF) {
  console.log("CPF válido criado com sucesso:", novoCPF.valor);
  console.log("CPF Formatado:", novoCPF.formata());
} else {
  console.log(`O CPF ${cpfCorreto} é inválido.`);
}

const cpfIncorreto = '111.111.111-11';
const cpfInvalido = CPF.criar(cpfIncorreto);
if (!cpfInvalido) {
  console.log(`O CPF ${cpfIncorreto} é inválido.`);
}