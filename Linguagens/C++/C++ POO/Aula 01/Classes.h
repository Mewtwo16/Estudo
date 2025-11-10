#ifndef CLASSES_H_INCLUDED
#define CLASSES_H_INCLUDED

#include "JogadorBase.h"

class Arqueiro:public JogadorBase{
    public:
        Arqueiro();
};
Arqueiro::Arqueiro():JogadorBase(3){};

class Guerreiro:public JogadorBase{
    public:
        Guerreiro();
};
Guerreiro::Guerreiro():JogadorBase(2){};

class Mago:public JogadorBase{
    public:
        Mago();
        void exibir() const override;
};
Mago::Mago():JogadorBase(1){};

void Mago::exibir() const{
    JogadorBase::exibir();
    std::cout << "+150 mana";
}


#endif