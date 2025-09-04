/* Interface e types */


interface ConfigApp{
    nome:string;
    versao:string;
    modoEscuro:boolean;
    abas:number;
};

let config1: ConfigApp = {
    nome: "André",
    versao: "Beta",
    modoEscuro: true,
    abas: 5
}