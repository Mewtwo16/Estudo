using System;
using System.Collections.Generic;
using System.Text;

/*
 * Try Catch para tratamento de erros
 *      - Exceções não checadas (não obrigatorio o tratamento
 */

namespace Fundamentos.TryCatch{
        public class Conta{
                private double _saldo;

                public Conta(double saldo){
                        _saldo = saldo;
                }

                public void sacar(double valor){
                        if (valor > _saldo){
                                throw new ArgumentException("Saldo insuficiente.");
                        }

                        _saldo -= valor;
                }
        }

        class Tratamentos{
                public static void Executar(){
                        var conta = new Conta(1_223.45);

                        try{
                                conta.sacar(1600);
                                Console.WriteLine("Retirada com sucesso!");
                        }
                        catch (Exception e){
                                Console.WriteLine(e.Message);
                        }
                        finally{
                                Console.WriteLine("Obrigado!");
                        }
                }
        }
}