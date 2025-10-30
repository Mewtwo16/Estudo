
export class CPF {
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
