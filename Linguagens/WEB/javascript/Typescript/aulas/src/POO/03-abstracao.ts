
abstract class Personagem{
    constructor(
        protected nome: string,
        protected ataque: number,
        protected vida: number
    ){}

    atacar(personagem: Personagem){
        console.log(`${this.nome} está atacando...`);
        this.bordao();
        personagem.tomaDano(this.ataque);
    }

    tomaDano(forcaAtaque: number): void{
        this.vida -= forcaAtaque;
        console.log(`${this.nome} agora tem ${this.vida} pontos de vida...`);
    }

    abstract bordao(): void;
}

class Guerreiro extends Personagem{
    bordao(): void{
        console.log('Ao ataque');
    }
}
class Monstro extends Personagem{
    bordao(): void{
        console.log('Arrr');
    }
}

const guerreiro = new Guerreiro('Garen', 100, 1000);
const monstro = new Monstro('Dragao', 87, 1000);

guerreiro.atacar(monstro);
monstro.atacar(guerreiro);



export{};