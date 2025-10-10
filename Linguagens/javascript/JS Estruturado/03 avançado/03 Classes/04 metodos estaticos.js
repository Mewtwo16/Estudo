/*
    Métodos de instância e estáticos
*/

class ControleRemoto {
    constructor(tv) {
        this.tv = tv;
        this.volume = 0;
    }

    // Metodos de instancia
    aumentarVolume() {
        this.volume += 2;
    }
    diminuirVolume(){
        this.volume -= 2;
    }

    // Metodos Estáticos
    static trocaPilha(){
        console.log('Trocando pilhas');
    }
}

const c1 = new ControleRemoto('LG');
// Chamando método de instância
c1.aumentarVolume();
c1.aumentarVolume();
c1.aumentarVolume();
console.log(c1);

// Chamando Método estático
ControleRemoto.trocaPilha();