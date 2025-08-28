#ifndef JogadorBase_H_INCLUDED
#define JogadorBase_H_INCLUDED

class JogadorBase{

protected:
    std::string nome;
    int pontuacao;
    std::string classe;

public:
    virtual void exibir() const { // Método 'const' (boa prática se não altera membros).
        std::cout << nome << " - " << pontuacao << " pontos\n";
    }
    // Prototipando metodo construtor
    JogadorBase(int tp);
    // Getters e Setters
    int getPontuacao() const;
    void setPontuacao(int pontos);
};

// Metodo construtor
JogadorBase::JogadorBase(int tp){
    if(tp == 1){
        this->nome = "Gandalf";
        setPontuacao(80);
    }else if(tp == 2){
        this->nome = "Orlof";
        setPontuacao(120);
    }else if(tp == 3){
        this->nome = "Legolas";
        setPontuacao(100);
    }
}

// Metodo getter
int JogadorBase::getPontuacao() const{
    return pontuacao;
}
// Metodo Setter
void JogadorBase::setPontuacao(int pontos){
    if(pontos >= 0){
        pontuacao = pontos;
    }else{
        std::cout << "Erro valor invalido!\n";
    }

}

#endif