/*
    Laço if / else if / else
    Laço for()
*/

const dia = 24;

for(let i = 0; i <= dia; i++ ){
    if(i >= 12 && i <= 18){
        console.log(`São exatas ${i} horas. Boa tarde!`);
    } else if(i > 18 && i <= 24) {
        console.log(`São exatas ${i} horas. Boa noite!`);
    } else if(i < 12 && i > 0){
        console.log(`São exatas ${i} horas. Bom dia!`);
    } else {
        console.log(`Erro ao captar hora. Saudações!`);
    }
};

