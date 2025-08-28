#ifndef MOVIMENTO_H_INCLUDED
#define MOVIMENTO_H_INCLUDED

class Terrestre{
    public:
        void andar();
};
void Terrestre::andar(){
    std::cout << "Andando...\n";
}

class Aquatico{
    public:
        void nadar();
};
void Aquatico::nadar(){
    std::cout << "Nadando...\n";
}

class Anfibio:public Terrestre, public Aquatico{
};




#endif