using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Fundamentos.Colecoes{
    class ColecaoArrayList{
        public static void Executar(){
            // Armazenamento generico
            var arraylist = new ArrayList{
                "Palavra", 3, true,
            };

            arraylist.Add(3.14);

            foreach (var item in arraylist){
                Console.WriteLine("{0} => {1}", item, item.GetType());
            }
            
        }
    }
}

