/*
    Objeto date para trabalhar com datas
*/

/*
    - Não existe 60 segundos, existe 59 ao enviar 60 ele soma 1 minuto
    - Mes começa do zero(0)
    - Dias começam em zero

    const data = new Date(0); com um 0 o Date começa a contar do marco zero
    const data = new Date(); Utiliza a data atual do sistema
    const data = new Date(2019, 3, 20, 15, 14, 27, 500); data formato aaaa, mm , dd , hrs, min, seg, millisegs
    const data = new Date(`2019-04-20 20:20:59`); dataString
    
*/

const data = new Date();
console.log(data.toString())

// Contado em millisegundos
const tresHoras = 60 * 60 * 3 * 1000;
const umDia = 60 * 60 * 24 * 1000;

console.log('dia', data.getDate()); 
console.log('mes', data.getMonth());
console.log('ano', data.getFullYear());
console.log('hora', data.getHours());
console.log('min', data.getMinutes());
console.log('seg', data.getSeconds());
console.log('ms', data.getMilliseconds());
console.log('Dia da semana', data.getDay());

console.log(Date.now());