#ifndef CLASSES_H_INCLUDED
#define CLASSES_H_INCLUDED

class Veiculo{

private:
std::string nome;
int velMax;
bool ligado;
void setVelMax(int vm);

public:
    int vel;
    int tipo;
    Veiculo(int tp);
    // Exemplo de um metodo GET
    int getVelMax();
    bool getLigado();
    void setLigado(int l);
};
// Metodo getter
int Veiculo::getVelMax(){
    return velMax;
}
bool Veiculo::getLigado(){
    return ligado;
}
// Metodo Setter
void Veiculo::setVelMax(int vm){
    velMax = vm;
}
void Veiculo::setLigado(int l){
    if(ligado == 1){
        ligado = true;
    }else if(ligado == 0){
        ligado = false;
    }
}
// Metodo construtor
Veiculo::Veiculo(int tp){
    tipo=tp;
    if(tipo == 1){
        nome="carro";
        setVelMax(180);
    }else if(tipo == 2){
        nome="avião";
        setVelMax(800);
    }else if(tipo == 3){
        nome="Navio";
        setVelMax(120);
    }
}
#endif  